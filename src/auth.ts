export type Provider = "google" | "facebook" | "apple";

export type AuthUser = {
  provider: Provider;
  id: string;
  name: string;
  email?: string;
  picture?: string;
};

export type Session = { mode: "guest" } | { mode: "user"; user: AuthUser };

const SESSION_KEY = "skeptic-session-v1";

export class ProviderNotConfigured extends Error {
  constructor(readonly provider: Provider) {
    super(provider);
  }
}

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (parsed?.mode === "guest") return parsed;
    if (parsed?.mode === "user" && parsed.user?.id && parsed.user.provider && parsed.user.name) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function providerHint(provider: Provider) {
  const origin = window.location.origin;
  if (provider === "google") {
    return `כדי לחבר את גוגל צריך VITE_GOOGLE_CLIENT_ID בקובץ .env, ובקונסול של גוגל לאשר את המקור ${origin}.`;
  }
  if (provider === "facebook") {
    return `כדי לחבר את פייסבוק צריך VITE_FACEBOOK_APP_ID בקובץ .env, ובאפליקציה של פייסבוק לאשר את האתר.`;
  }
  return `כדי לחבר את אפל צריך VITE_APPLE_CLIENT_ID בקובץ .env, ובשירותי אפל לרשום את ${origin} ככתובת חזרה.`;
}

export function isProviderConfigured(provider: Provider) {
  if (provider === "google") return Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  if (provider === "facebook") return Boolean(import.meta.env.VITE_FACEBOOK_APP_ID);
  return Boolean(import.meta.env.VITE_APPLE_CLIENT_ID);
}

type GoogleToken = { access_token?: string; error?: string };
type GoogleUserInfo = { sub?: string; name?: string; email?: string; picture?: string };

type FbLogin = { authResponse?: { accessToken: string } };
type FbMe = {
  id?: string;
  name?: string;
  email?: string;
  picture?: { data?: { url?: string } };
  error?: unknown;
};

type AppleName = { firstName?: string; lastName?: string };
type AppleResult = {
  authorization?: { id_token?: string };
  user?: { email?: string; name?: AppleName };
};

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleToken) => void;
          }): { requestAccessToken: () => void };
        };
      };
    };
    FB?: {
      init(config: { appId: string; cookie: boolean; xfbml: boolean; version: string }): void;
      login(callback: (response: FbLogin) => void, options: { scope: string }): void;
      api(path: string, params: { fields: string }, callback: (me: FbMe) => void): void;
    };
    fbAsyncInit?: () => void;
    AppleID?: {
      auth: {
        init(config: { clientId: string; scope: string; redirectURI: string; usePopup: boolean }): void;
        signIn(): Promise<AppleResult>;
      };
    };
  }
}

const scripts = new Map<string, Promise<void>>();

function loadScript(src: string) {
  const pending = scripts.get(src);
  if (pending) return pending;
  const promise = new Promise<void>((resolve, reject) => {
    const found = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (found?.dataset.loaded === "1") {
      resolve();
      return;
    }
    const script = found ?? document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error("לא הצלחנו לטעון את חלון ההתחברות. בדקו את הרשת ונסו שוב."));
    if (!found) document.head.appendChild(script);
  });
  scripts.set(src, promise);
  return promise;
}

export function preloadAuth() {
  const jobs: Promise<void>[] = [];
  if (isProviderConfigured("google")) {
    jobs.push(loadScript("https://accounts.google.com/gsi/client"));
  }
  if (isProviderConfigured("facebook")) {
    jobs.push(
      new Promise<void>((resolve, reject) => {
        window.fbAsyncInit = () => resolve();
        loadScript("https://connect.facebook.net/he_IL/sdk.js").then(() => {
          if (window.FB) resolve();
        }, reject);
      }),
    );
  }
  if (isProviderConfigured("apple")) {
    jobs.push(loadScript("https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"));
  }
  return Promise.all(jobs).then(() => undefined);
}

export function signIn(provider: Provider): Promise<AuthUser> {
  if (!isProviderConfigured(provider)) return Promise.reject(new ProviderNotConfigured(provider));
  if (provider === "google") return signInGoogle();
  if (provider === "facebook") return signInFacebook();
  return signInApple();
}

function signInGoogle(): Promise<AuthUser> {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId || !window.google) {
    return Promise.reject(new Error("חלון גוגל עדיין נטען. נסו שוב בעוד רגע."));
  }
  return new Promise((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (token) => {
        if (!token.access_token) {
          reject(new Error(token.error === "popup_closed" ? "החלון נסגר לפני האישור." : "גוגל לא אישר את ההתחברות."));
          return;
        }
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${token.access_token}` },
        })
          .then((response) => {
            if (!response.ok) throw new Error("גוגל לא החזיר פרופיל.");
            return response.json() as Promise<GoogleUserInfo>;
          })
          .then((profile) => {
            if (!profile.sub) throw new Error("גוגל לא החזיר פרופיל.");
            resolve({
              provider: "google",
              id: profile.sub,
              name: profile.name || "משתמש גוגל",
              email: profile.email,
              picture: profile.picture,
            });
          })
          .catch((error: unknown) => {
            reject(error instanceof Error ? error : new Error("גוגל לא החזיר פרופיל."));
          });
      },
    });
    client.requestAccessToken();
  });
}

function signInFacebook(): Promise<AuthUser> {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
  if (!appId || !window.FB) {
    return Promise.reject(new Error("חלון פייסבוק עדיין נטען. נסו שוב בעוד רגע."));
  }
  window.FB.init({ appId, cookie: false, xfbml: false, version: "v21.0" });
  return new Promise((resolve, reject) => {
    window.FB!.login(
      (response) => {
        if (!response.authResponse) {
          reject(new Error("החלון נסגר לפני האישור."));
          return;
        }
        window.FB!.api("/me", { fields: "id,name,email,picture" }, (me) => {
          if (!me.id) {
            reject(new Error("פייסבוק לא החזיר פרופיל."));
            return;
          }
          resolve({
            provider: "facebook",
            id: me.id,
            name: me.name || "משתמש פייסבוק",
            email: me.email,
            picture: me.picture?.data?.url,
          });
        });
      },
      { scope: "public_profile,email" },
    );
  });
}

function signInApple(): Promise<AuthUser> {
  const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
  if (!clientId || !window.AppleID) {
    return Promise.reject(new Error("חלון אפל עדיין נטען. נסו שוב בעוד רגע."));
  }
  window.AppleID.auth.init({
    clientId,
    scope: "name email",
    redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin,
    usePopup: true,
  });
  return window.AppleID.auth.signIn().then((result) => {
    const payload = result.authorization?.id_token ? jwtPayload(result.authorization.id_token) : null;
    const sub = typeof payload?.sub === "string" ? payload.sub : "";
    if (!sub) throw new Error("אפל לא החזירה פרופיל.");
    const given = [result.user?.name?.firstName, result.user?.name?.lastName].filter(Boolean).join(" ");
    const email = result.user?.email || (typeof payload?.email === "string" ? payload.email : undefined);
    return {
      provider: "apple" as const,
      id: sub,
      name: given || email || "משתמש אפל",
      email,
    };
  });
}

function jwtPayload(token: string) {
  const part = token.split(".")[1];
  if (!part) return null;
  try {
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}
