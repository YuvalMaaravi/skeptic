import { useEffect, useState } from "react";
import {
  preloadAuth,
  providerHint,
  ProviderNotConfigured,
  signIn,
  type AuthUser,
  type Provider,
  type Session,
} from "./auth";

const providers: { id: Provider; label: string }[] = [
  { id: "google", label: "המשך עם Google" },
  { id: "facebook", label: "המשך עם Facebook" },
  { id: "apple", label: "המשך עם Apple" },
];

export function AuthGate({
  allowClose,
  onGuest,
  onUser,
  onClose,
}: {
  allowClose: boolean;
  onGuest: () => void;
  onUser: (user: AuthUser) => void;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState<Provider | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    preloadAuth().catch(() => {
      setMessage("חלון ההתחברות לא נטען. אפשר להמשיך כאורח ולנסות שוב.");
    });
  }, []);

  async function choose(provider: Provider) {
    setBusy(provider);
    setMessage("");
    try {
      onUser(await signIn(provider));
    } catch (error) {
      if (error instanceof ProviderNotConfigured) setMessage(providerHint(provider));
      else if (error instanceof Error) setMessage(error.message);
      else setMessage("ההתחברות לא הושלמה.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="gate">
      <section className="gate-card">
        <p className="wordmark">SKEPTIC</p>
        <h1>איך נכנסים?</h1>
        <p className="deck">
          הרשמה והתחברות הן דרך גוגל, פייסבוק או אפל. אין כאן סיסמה. אפשר גם להישאר אורח, וההערות
          בקהילה נשמרות במכשיר הזה.
        </p>
        <div className="providers">
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className={`provider provider-${provider.id}`}
              disabled={busy !== null}
              onClick={() => choose(provider.id)}
            >
              <ProviderMark id={provider.id} />
              {busy === provider.id ? "פותח חלון…" : provider.label}
            </button>
          ))}
        </div>
        {message && <p className="gate-message">{message}</p>}
        <button type="button" className="guest" onClick={onGuest}>
          המשך כאורח
        </button>
        {allowClose && (
          <button type="button" className="text-btn" onClick={onClose}>
            חזרה
          </button>
        )}
      </section>
    </div>
  );
}

export function AccountBar({
  session,
  onSignIn,
  onSignOut,
}: {
  session: Session;
  onSignIn: () => void;
  onSignOut: () => void;
}) {
  if (session.mode === "guest") {
    return (
      <div className="account">
        <span>אורח</span>
        <button type="button" onClick={onSignIn}>
          התחברות
        </button>
      </div>
    );
  }

  return (
    <div className="account user">
      {session.user.picture ? (
        <img src={session.user.picture} alt="" />
      ) : (
        <span className="avatar" aria-hidden="true">
          {session.user.name.slice(0, 1)}
        </span>
      )}
      <span>{session.user.name}</span>
      <button type="button" onClick={onSignOut}>
        יציאה
      </button>
    </div>
  );
}

function ProviderMark({ id }: { id: Provider }) {
  if (id === "google") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8A6.4 6.4 0 1 1 12 5.6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.8 3.2 14.6 2.2 12 2.2 6.8 2.2 2.6 6.4 2.6 11.6S6.8 21 12 21c5.4 0 9-3.8 9-9.1 0-.6 0-1.1-.1-1.6H12Z" />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d="M14.2 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4H17V5.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2h-2.5v2.8H11V21h3.2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.8-.7c-1.5 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.1c.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.9-2.3-3.4Zm-2.1-6.2c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.7 1.4-.6.7-1.1 1.7-.9 2.6 1 .1 2.1-.5 2.7-1.3Z" />
    </svg>
  );
}
