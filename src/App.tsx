import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { asset } from "./asset";
import { AccountBar, AuthGate } from "./AuthGate";
import { clearSession, loadSession, saveSession, type Session } from "./auth";
import { addNote, loadNotes, notesKeyFor, type Note } from "./community";
import { Mark } from "./Mark";
import { catalog, catalogById } from "./data/catalog";
import {
  byId,
  homePrompts,
  inTrack,
  intents,
  itemMatches,
  lookGroups,
  startGroups,
  trackOrder,
  tracks,
  tracksFor,
  treatCategoryOrder,
  treatItems,
  type IntentId,
  type TrackId,
} from "./data/journeys";
import { threads, threadsForItem } from "./data/forum";
import { artFor } from "./data/shops";
import {
  categoryLabel,
  channelLabel,
  conditionLabel,
  conditionOrder,
  evidenceBlurb,
  evidenceLabel,
  evidenceRank,
} from "./data/labels";
import type { CatalogItem, Condition, EvidenceLevel, ProductExtra, ProductPhoto } from "./data/types";

type Screen =
  | { kind: "home" }
  | { kind: "journey"; intent: IntentId }
  | { kind: "compare" }
  | { kind: "track"; track: TrackId; pin?: string[] }
  | { kind: "checklist" }
  | { kind: "search"; q: string }
  | { kind: "thread"; id: string };

const evidenceOrder: EvidenceLevel[] = [
  "strong",
  "moderate",
  "limited",
  "traditional",
  "cosmetic",
  "guide",
  "listing",
];

export function App() {
  const [screen, setScreen] = useState<Screen>({ kind: "home" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [authOpen, setAuthOpen] = useState(() => loadSession() === null);
  const [notes, setNotes] = useState<Note[]>(() => {
    const current = loadSession();
    return current ? loadNotes(notesKeyFor(current)) : [];
  });

  function enter(next: Session) {
    saveSession(next);
    setSession(next);
    setNotes(loadNotes(notesKeyFor(next)));
    setAuthOpen(false);
  }

  function signOut() {
    clearSession();
    setSession(null);
    setNotes([]);
    setSelectedId(null);
    setScreen({ kind: "home" });
    setAuthOpen(true);
  }

  function saveNote(threadId: string, name: string, body: string) {
    if (!session) return;
    setNotes(addNote(notesKeyFor(session), name, threadId, body));
  }

  const selected = selectedId ? catalogById.get(selectedId) ?? null : null;

  function go(next: Screen) {
    setSelectedId(null);
    setScreen(next);
    window.scrollTo(0, 0);
  }

  function openItem(id: string) {
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  function back() {
    if (selectedId) {
      setSelectedId(null);
      return;
    }
    if (screen.kind === "track") go({ kind: "compare" });
    else go({ kind: "home" });
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && selectedId) setSelectedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  if (!session || authOpen) {
    return (
      <AuthGate
        allowClose={session?.mode === "guest"}
        onGuest={() => enter({ mode: "guest" })}
        onUser={(user) => enter({ mode: "user", user })}
        onClose={() => setAuthOpen(false)}
      />
    );
  }

  const authorName = session.mode === "user" ? session.user.name : "";

  const onHome = screen.kind === "home" && !selected;

  return (
    <div className={onHome ? "shell home" : "shell"}>
      {!onHome && (
        <div className="topbar">
          <button type="button" className="wordmark small" onClick={() => go({ kind: "home" })}>
            SKEPTIC
          </button>
          <div className="topbar-actions">
            <button type="button" className="text-btn" onClick={back}>
              חזרה
            </button>
            <AccountBar session={session} onSignIn={() => setAuthOpen(true)} onSignOut={signOut} />
          </div>
        </div>
      )}
      {onHome ? (
        <Home
          draft={draft}
          onDraft={setDraft}
          onSearch={(q) => go({ kind: "search", q })}
          onIntent={(intent) =>
            intent === "compare" ? go({ kind: "compare" }) : go({ kind: "journey", intent })
          }
          onTrack={(track) => go({ kind: "track", track })}
          onPrompt={(to) => {
            if (to === "pair") go({ kind: "track", track: "treatments", pin: ["prp", "iprf"] });
            else if (to === "treatments") go({ kind: "track", track: "treatments" });
            else go({ kind: "checklist" });
          }}
          notes={notes}
          authorName={authorName}
          session={session}
          onSignIn={() => setAuthOpen(true)}
          onSignOut={signOut}
          onThread={(id) => go({ kind: "thread", id })}
          onOpen={openItem}
          onSave={saveNote}
        />
      ) : (
        <>
          {selected ? (
            <Detail
              item={selected}
              notes={notes}
              authorName={authorName}
              onOpen={openItem}
              onTrack={(track) => go({ kind: "track", track })}
              onThread={(id) => go({ kind: "thread", id })}
              onSave={saveNote}
            />
          ) : screen.kind === "journey" ? (
            <Journey
              intent={screen.intent}
              notes={notes}
              onOpen={openItem}
              onGo={go}
              onThread={(id) => go({ kind: "thread", id })}
            />
          ) : screen.kind === "compare" ? (
            <CompareHub onOpen={(track) => go({ kind: "track", track })} />
          ) : screen.kind === "track" ? (
            <TrackView track={screen.track} pin={screen.pin} onOpen={openItem} />
          ) : screen.kind === "checklist" ? (
            <Checklist onOpen={openItem} onClinics={() => go({ kind: "track", track: "clinics" })} />
          ) : screen.kind === "search" ? (
            <SearchResults q={screen.q} onOpen={openItem} onSearch={(q) => go({ kind: "search", q })} />
          ) : screen.kind === "thread" ? (
            <ThreadPage
              id={screen.id}
              notes={notes}
              authorName={authorName}
              onOpen={openItem}
              onSave={saveNote}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

const readPath: {
  n: string;
  title: string;
  body: string;
  action: string;
  go: "start" | "products" | "treatments" | "clinics";
}[] = [
  {
    n: "01",
    title: "קודם אבחנה",
    body: "לא כל שיער על הכרית הוא התקרחות גברית. דפוס, משיכה, טלואת או מחסור משנים מה שווה לקרוא אחר כך, ומי מאבחן.",
    action: "איך מתחילים",
    go: "start",
  },
  {
    n: "02",
    title: "תרופה לחוד, שמפו לחוד",
    body: "למינוקסידיל ולפינסטריד יש את הראיות החזקות בהתקרחות גברית. שמפו, שמן ותוסף יכולים להיות טיפוח קרקפת או קוסמטיקה. מחיר כאן הוא צילום מעמוד חנות.",
    action: "למוצרים",
    go: "products",
  },
  {
    n: "03",
    title: "טיפול במרפאה אינו השתלה",
    body: "PRP, מיקרונידלינג ולייזר נמדדים כל אחד בנפרד. רולר ביתי של 0.25 מ״מ הוא לא הפרוטוקול שנבדק במרפאה.",
    action: "לטיפולים",
    go: "treatments",
  },
  {
    n: "04",
    title: "אם מגיעים להשתלה",
    body: "שם הרופא, מי מחזיק את הפאנץ׳, ומחירון שפורסם. ספיר ו־DHI הם כלי או שם שיווקי. ״שתלים בלי הגבלה״ הוא דגל אדום, לא מבצע.",
    action: "למחירונים",
    go: "clinics",
  },
];

const shelfPreview = [
  "topical-minoxidil",
  "hairgain-foam",
  "hairgain-solution",
  "vichy-dercos-shampoo",
  "vichy-aminexil-serum",
  "altman-roots",
  "castor",
  "sebocalm-shampoo",
  "kamedis-scalp-shampoo",
  "phytoaxil-spray",
  "hadar-shampoo",
  "hair-boost",
];

const facePreview = [
  "clinic-ginzburg",
  "clinic-dng",
  "clinic-dr-hair",
  "clinic-rimi",
  "clinic-buchbut",
  "clinic-beyond",
  "clinic-renew",
  "clinic-trichogenics",
  "clinic-medhair",
  "clinic-hairmedico",
  "clinic-fks",
];

function Home({
  draft,
  onDraft,
  onSearch,
  onIntent,
  onTrack,
  onPrompt,
  notes,
  authorName,
  session,
  onSignIn,
  onSignOut,
  onThread,
  onOpen,
  onSave,
}: {
  draft: string;
  onDraft: (value: string) => void;
  onSearch: (q: string) => void;
  onIntent: (intent: IntentId) => void;
  onTrack: (track: TrackId) => void;
  onPrompt: (to: (typeof homePrompts)[number]["to"]) => void;
  notes: Note[];
  authorName: string;
  session: Session;
  onSignIn: () => void;
  onSignOut: () => void;
  onThread: (id: string) => void;
  onOpen: (id: string) => void;
  onSave: (threadId: string, name: string, body: string) => void;
}) {
  function openStep(target: (typeof readPath)[number]["go"]) {
    if (target === "start") onIntent("start");
    else onTrack(target);
  }

  return (
    <>
      <section
        className="hero"
        style={{ "--hero-photo": `url("${asset("/atmosphere/hair.jpg")}")` } as CSSProperties}
      >
        <div className="hero-bar">
          <AccountBar session={session} onSignIn={onSignIn} onSignOut={onSignOut} />
        </div>
        <div className="hero-copy">
          <h1 className="wordmark on-photo">SKEPTIC</h1>
          <p className="hero-lead">
            קריאה לפני שמפו, מרשם או טיסה להשתלה: מה ידוע ממחקר, מה רק כתוב על האריזה, ומה מרפאה
            מפרסמת במחירון שלה. אין כאן לפני־ואחרי, ואין דירוג תוצאות.
          </p>
          <form
            className="home-search"
            onSubmit={(event) => {
              event.preventDefault();
              const q = draft.trim();
              if (q) onSearch(q);
            }}
          >
            <label className="sr" htmlFor="home-q">
              חיפוש
            </label>
            <input
              id="home-q"
              value={draft}
              onChange={(event) => onDraft(event.target.value)}
              placeholder="חפש טיפול, מוצר, קליניקה או שאלה..."
            />
            <button type="submit" className="icon-btn" aria-label="חיפוש">
              <SearchIcon />
            </button>
          </form>
        </div>
      </section>

      <div className="home-rest">
      <section className="read-path">
        <h2>לפני שיושבים מול מרפאה</h2>
        <p className="read-lead">
          אתרי השתלות נפתחים בייעוץ חינם ובתמונת תוצאה. כאן המסלול הפוך: קודם להבין מה השאלה, ורק
          אחר כך מי מוכר לה תשובה.
        </p>
        <ol>
          {readPath.map((step) => (
            <li key={step.n}>
              <span className="step-n">{step.n}</span>
              <strong>{step.title}</strong>
              <span>{step.body}</span>
              <button type="button" onClick={() => openStep(step.go)}>
                {step.action}
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="story">
        <img src={asset("/atmosphere/care.jpg")} alt="" />
        <div>
          <p className="forum-kicker">על המדף</p>
          <h2>לא כל בקבוק הוא טיפול</h2>
          <p>
            אריזה יכולה לומר ״קליני״ או ״ממריץ״. זה נוסח שיווק. בכרטיס כתוב אם יש מחקר, למי המוצר
            רשום, ומה המחיר שראינו באותו תאריך. קישור הקנייה הולך לעמוד החנות.
          </p>
          <button type="button" className="text-btn" onClick={() => onTrack("products")}>
            למדף המוצרים
          </button>
          <p className="photo-note">תמונת אווירה של טיפוח שיער, לא אריזה מהקטלוג.</p>
        </div>
      </section>

      <section className="story flip">
        <img src={asset("/atmosphere/consult.jpg")} alt="" />
        <div>
          <p className="forum-kicker">במרפאה</p>
          <h2>שואלים מי עושה את העבודה</h2>
          <p>
            בהשתלה חשוב מי שולף את הזקיקים ומי רק מפקח. בקטלוג מופיע שם הרופא כשהעמוד של המרפאה
            מפרסם אותו, והמחיר רק אם פורסם. ״בסל הבריאות״ אינו אפס השתתפות, וחבילה בחו״ל לא כוללת
            את הטיסה אלא אם כתוב כך.
          </p>
          <button type="button" className="text-btn" onClick={() => onTrack("clinics")}>
            למחירוני המרפאות
          </button>
          <p className="photo-note">תמונת אווירה של רופא. הוא אינו רופא מהרשימה, וזו אינה תוצאה.</p>
        </div>
      </section>

      <section className="faces">
        <div className="faces-head">
          <h2>מהמרפאות</h2>
          <button type="button" className="text-btn" onClick={() => onTrack("clinics")}>
            לכל המחירונים
          </button>
        </div>
        <p className="faces-lead">
          דיוקן שפורסם באתר המרפאה עצמה. זה לא לפני־ואחרי, ולא דירוג תוצאות.
        </p>
        <div className="face-scroll">
          {facePreview.map((id) => {
            const item = catalogById.get(id);
            const photo = item?.photos?.[0];
            if (!item || !photo) return null;
            return (
              <button key={id} type="button" className="face-card" onClick={() => onOpen(id)}>
                <img className={photo.frame === "center" ? "center" : undefined} src={photo.src} alt={photo.alt} />
                <strong>{item.nameHe}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <figure className="band">
        <img src={asset("/atmosphere/capsules.jpg")} alt="" />
        <figcaption>תמונת אווירה של כדורים. זו לא אריזה מהקטלוג, ולא תרופה מסוימת.</figcaption>
      </figure>

      <section className="preview">
        <div className="preview-head">
          <h2>מהמדף</h2>
          <button type="button" className="text-btn" onClick={() => onTrack("products")}>
            לכל המוצרים
          </button>
        </div>
        <p className="preview-lead">אריזות שצולמו מעמודי החנויות. לוחצים ורואים מה כתוב על הכרטיס.</p>
        <div className="preview-scroll">
          {shelfPreview.map((id) => {
            const item = catalogById.get(id);
            const photo = item?.photos?.[0];
            if (!item || !photo) return null;
            return (
              <button key={id} type="button" className="preview-card" onClick={() => onOpen(id)}>
                <img src={photo.src} alt="" />
                <strong>{item.nameHe}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className="forum-center">
        <p className="forum-kicker">המרכז</p>
        <h2>הקהילה</h2>
        <p className="forum-lead">
          הדיונים יושבים כאן, לפני המדפים. כותבים מה ראיתם על המדף או בייעוץ. ההערה נשמרת
          בדפדפן הזה ומסומנת כלא מאומתת.
        </p>
        <NoteForm authorName={authorName} onSave={onSave} />
        <ThreadList notes={notes} onOpen={onThread} />
      </section>

      <div className="intent-grid">
        {intents.map((intent) => (
          <button
            key={intent.id}
            type="button"
            className="intent"
            data-intent={intent.id}
            onClick={() => onIntent(intent.id)}
          >
            <Icon name={intent.icon} />
            <strong>{intent.title}</strong>
            <span>{intent.subtitle}</span>
          </button>
        ))}
      </div>
      <section className="suggest">
        <h2>תוכן מומלץ עבורך</h2>
        <ul>
          {homePrompts.map((prompt) => (
            <li key={prompt.title}>
              <button type="button" onClick={() => onPrompt(prompt.to)}>
                {prompt.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <p className="fine">
        זה לא ייעוץ רפואי. קישור קנייה מוביל לעמוד בית מרקחת או מרפאה, והמחיר שם יכול לזוז.
        הערה בקהילה היא לא דירוג תוצאה. תמונות האווירה הן מ־Unsplash. דיוקן מרפאה מגיע מהאתר שלה, ואריזה מעמוד החנות. אין כאן מטופלים ואין תוצאות.
      </p>
      </div>
    </>
  );
}

function Journey({
  intent,
  notes,
  onOpen,
  onGo,
  onThread,
}: {
  intent: IntentId;
  notes: Note[];
  onOpen: (id: string) => void;
  onGo: (screen: Screen) => void;
  onThread: (id: string) => void;
}) {
  const meta = intents.find((item) => item.id === intent)!;

  return (
    <article className="journey">
      <PageHead eyebrow="לפי מה שאתה צריך" title={meta.title} deck={meta.subtitle} />
      {intent === "start" && (
        <>
          <p>לפני מוצר או מרפאה: איזה סוג נשירה זו, ומי מאבחן אותה.</p>
          {startGroups.map((group) => (
            <ItemGroup key={group.title} title={group.title} items={byId(catalog, group.ids)} onOpen={onOpen} />
          ))}
        </>
      )}
      {intent === "treat" && <TreatJourney onOpen={onOpen} />}
      {intent === "look" && (
        <>
          <p>
            השתלה מזיזה שיער קיים. SMP, סיבים ופאה משנים את המראה בלי לגעת בזקיק. אלה לא אותה
            החלטה, גם כשמחפשים את שתיהן מאותו מקום.
          </p>
          {lookGroups.map((group) => (
            <ItemGroup key={group.title} title={group.title} items={byId(catalog, group.ids)} onOpen={onOpen} />
          ))}
          <div className="jump-row">
            <button type="button" className="chip" onClick={() => onGo({ kind: "track", track: "clinics" })}>
              להשוות קליניקות
            </button>
            <button type="button" className="chip" onClick={() => onGo({ kind: "track", track: "aesthetic" })}>
              להשוות הסוואה
            </button>
          </div>
        </>
      )}
      {intent === "talk" && <TalkJourney notes={notes} onThread={onThread} />}
      {intent === "learn" && <LearnJourney onOpen={onOpen} />}
    </article>
  );
}

function TreatJourney({ onOpen }: { onOpen: (id: string) => void }) {
  const items = treatItems(catalog);
  return (
    <>
      <p>
        אפשר להתחיל ממה שיש עליו הכי הרבה נתונים, ולרדת אחר כך למה שנמכר בלי זה. השתלה כפרוצדורה
        נמצאת כאן. מרפאה מסוימת נמצאת בהשוואת הקליניקות.
      </p>
      {treatCategoryOrder.map((category) => {
        const group = items
          .filter((item) => item.category === category)
          .sort((a, b) => evidenceRank[a.evidence] - evidenceRank[b.evidence]);
        if (group.length === 0) return null;
        return <ItemGroup key={category} title={categoryLabel[category]} items={group} onOpen={onOpen} />;
      })}
    </>
  );
}

function TalkJourney({ notes, onThread }: { notes: Note[]; onThread: (id: string) => void }) {
  return (
    <>
      <p>
        אותם דיונים שיושבים במרכז הבית. הערה שנכתבת נשמרת בדפדפן, ואפשר לפתוח ממנה את כרטיס
        המוצר, את עמוד הקנייה ואת המקור.
      </p>
      <ThreadList notes={notes} onOpen={onThread} />
    </>
  );
}

function LearnJourney({ onOpen }: { onOpen: (id: string) => void }) {
  const reading = catalog.filter((item) => item.evidence !== "listing");
  return (
    <>
      <p>
        הלמידה כאן היא לפי חוזק הראיות, לא לפי מה שהחנות שמה למעלה. קליניקות עם מחירון יושבות
        בהשוואה, לא בשיעור ביולוגיה.
      </p>
      <ol className="scale">
        {evidenceOrder
          .filter((level) => level !== "listing")
          .map((level) => (
            <li key={level} data-evidence={level}>
              <strong>{evidenceLabel[level]}</strong>
              <span>{evidenceBlurb[level]}</span>
            </li>
          ))}
      </ol>
      {evidenceOrder
        .filter((level) => level !== "listing")
        .map((level) => {
          const group = reading
            .filter((item) => item.evidence === level)
            .sort((a, b) => a.nameHe.localeCompare(b.nameHe, "he"));
          if (group.length === 0) return null;
          return <ItemGroup key={level} title={evidenceLabel[level]} items={group} onOpen={onOpen} />;
        })}
    </>
  );
}

function CompareHub({ onOpen }: { onOpen: (track: TrackId) => void }) {
  return (
    <article>
      <PageHead
        eyebrow="אני רוצה להשוות"
        title="מה משווים?"
        deck="ארבעה מסלולים, קטלוג אחד. נכנסים לרשימה, מסמנים עד שלושה, ורואים אותם זה לצד זה."
      />
      <div className="track-grid">
        {trackOrder.map((id, index) => (
          <button key={id} type="button" className="track-card" onClick={() => onOpen(id)}>
            <span className="step-n">{String(index + 1).padStart(2, "0")}</span>
            <strong>{tracks[id].title}</strong>
            <span>{tracks[id].compares}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

function TrackView({
  track,
  pin,
  onOpen,
}: {
  track: TrackId;
  pin?: string[];
  onOpen: (id: string) => void;
}) {
  const meta = tracks[track];
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState<Condition | "all">("all");
  const [evidence, setEvidence] = useState<EvidenceLevel | "all">("all");
  const [pricedOnly, setPricedOnly] = useState(false);
  const [sort, setSort] = useState<"evidence" | "name" | "price">("evidence");
  const [picked, setPicked] = useState<string[]>(pin ?? []);

  const items = useMemo(() => {
    return catalog
      .filter((item) => inTrack(item, track))
      .filter((item) => itemMatches(item, query))
      .filter((item) => {
        if (condition === "all") return true;
        return item.conditions.includes(condition) || item.conditions.includes("any");
      })
      .filter((item) => evidence === "all" || item.evidence === evidence)
      .filter((item) => !pricedOnly || item.price)
      .sort((a, b) => {
        if (sort === "name") return a.nameHe.localeCompare(b.nameHe, "he");
        if (sort === "price") {
          const ap = a.price ? 0 : 1;
          const bp = b.price ? 0 : 1;
          if (ap !== bp) return ap - bp;
        }
        return evidenceRank[a.evidence] - evidenceRank[b.evidence] || a.nameHe.localeCompare(b.nameHe, "he");
      });
  }, [track, query, condition, evidence, pricedOnly, sort]);

  function toggle(id: string) {
    setPicked((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  const chosen = picked.flatMap((id) => {
    const item = catalogById.get(id);
    return item ? [item] : [];
  });

  return (
    <article className={picked.length > 0 ? "has-tray" : undefined}>
      <PageHead eyebrow={`השוואה · ${meta.title}`} title={meta.title} deck={meta.compares} />
      <p className="read-lead">{meta.note}</p>
      {pin && pin.length > 1 && (
        <p className="callout">
          PRP ו־iPRF פתוחים זה מול זה. אפשר להוסיף טיפול שלישי, עד שלושה במקביל.
        </p>
      )}

      <div className="panel">
      <div className="tool-row">
        <label className="search slim">
          <span className="sr">סינון במסלול</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="סינון בתוך המסלול"
          />
        </label>
        <label className="sort">
          מיון
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="evidence">לפי ראיות</option>
            <option value="name">לפי שם</option>
            <option value="price">קודם מי שיש לו מחיר</option>
          </select>
        </label>
      </div>
      <p className="hint">המיון אינו דירוג של תוצאה, של מרפאה או של שביעות רצון.</p>

      <FilterRow label="מצב">
        <Chip active={condition === "all"} onClick={() => setCondition("all")}>
          הכל
        </Chip>
        {conditionOrder.map((value) => (
          <Chip key={value} active={condition === value} onClick={() => setCondition(condition === value ? "all" : value)}>
            {conditionLabel[value]}
          </Chip>
        ))}
      </FilterRow>
      <FilterRow label="ראיות">
        <Chip active={evidence === "all"} onClick={() => setEvidence("all")}>
          הכל
        </Chip>
        {evidenceOrder.map((value) => (
          <Chip key={value} active={evidence === value} onClick={() => setEvidence(evidence === value ? "all" : value)}>
            {evidenceLabel[value]}
          </Chip>
        ))}
      </FilterRow>
      <div className="jump-row">
        <Chip active={pricedOnly} onClick={() => setPricedOnly((value) => !value)}>
          רק עם מחיר
        </Chip>
      </div>
      </div>

      <CompareBoard items={chosen} onOpen={onOpen} onRemove={toggle} />

      <p className="count">
        {items.length === 1 ? "פריט אחד" : `${items.length} פריטים`}
        {picked.length > 0 ? ` · ${picked.length} בהשוואה` : ""}
      </p>
      <div className="grid">
        {items.map((item) => (
          <article key={item.id} className="pick-card">
            <ItemButton item={item} onOpen={onOpen} />
            <button
              type="button"
              className={picked.includes(item.id) ? "chip on" : "chip"}
              aria-pressed={picked.includes(item.id)}
              disabled={!picked.includes(item.id) && picked.length >= 3}
              onClick={() => toggle(item.id)}
            >
              {picked.includes(item.id) ? "בהשוואה" : picked.length >= 3 ? "ההשוואה מלאה" : "הוספה להשוואה"}
            </button>
          </article>
        ))}
      </div>
      {items.length === 0 && <p className="empty">אין פריטים לסינון הזה במסלול.</p>}
      {picked.length > 0 && (
        <div className="tray">
          <strong>{picked.length} בהשוואה</strong>
          <span className="tray-names">{chosen.map((item) => item.nameHe).join(" · ")}</span>
          {picked.length > 1 ? (
            <button type="button" onClick={() => document.getElementById("board")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              להשוואה
            </button>
          ) : (
            <span className="tray-need">עוד פריט אחד</span>
          )}
          <button type="button" className="tray-clear" onClick={() => setPicked([])}>
            ניקוי
          </button>
        </div>
      )}
    </article>
  );
}

function CompareBoard({
  items,
  onOpen,
  onRemove,
}: {
  items: CatalogItem[];
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  if (items.length === 0) {
    return <p className="hint">סמנו שניים או שלושה פריטים כדי לראות אותם זה מול זה.</p>;
  }
  if (items.length === 1) {
    return <p className="hint">סומן פריט אחד. צריך עוד אחד לפחות כדי להשוות.</p>;
  }
  return (
    <div className="board" id="board" aria-label="השוואה זה לצד זה">
      {items.map((item) => (
        <section key={item.id} className="board-col" data-evidence={item.evidence}>
          <div className="board-top">
            <h2>{item.nameHe}</h2>
            <button type="button" className="text-btn" onClick={() => onRemove(item.id)}>
              הסרה
            </button>
          </div>
          <p className="en">{item.nameEn}</p>
          <dl>
            <div>
              <dt>ראיות</dt>
              <dd>{evidenceLabel[item.evidence]}</dd>
            </div>
            <div>
              <dt>מה זה</dt>
              <dd>{item.summary}</dd>
            </div>
            <div>
              <dt>מחיר שפורסם</dt>
              <dd>{item.price ? item.price.headline : "אין מחירון פומבי בקטלוג"}</dd>
            </div>
            <div>
              <dt>איפה</dt>
              <dd>{item.channels.map((channel) => channelLabel[channel]).join(" · ")}</dd>
            </div>
            <div>
              <dt>הסתייגות</dt>
              <dd>{item.skeptic}</dd>
            </div>
          </dl>
          <button type="button" className="text-btn" onClick={() => onOpen(item.id)}>
            מקורות ופירוט
          </button>
        </section>
      ))}
    </div>
  );
}

function Checklist({
  onOpen,
  onClinics,
}: {
  onOpen: (id: string) => void;
  onClinics: () => void;
}) {
  const ids = ["transplant-israel", "fue", "fut", "transplant-tourism"];
  return (
    <article>
      <PageHead
        eyebrow="לפני שמשלמים"
        title="מה חשוב לבדוק לפני השתלה?"
        deck="השאלות נלקחות מכרטיסי הקטלוג. זו לא רשימת מרפאות מומלצות, ואין כאן ציון על תוצאה."
      />
      <ol className="check-list">
        {byId(catalog, ids).map((item, index) => (
          <li key={item.id}>
            <span className="step-n">{String(index + 1).padStart(2, "0")}</span>
            <h2>{item.nameHe}</h2>
            <p>{item.cautions}</p>
            <p>{item.skeptic}</p>
            <button type="button" className="text-btn" onClick={() => onOpen(item.id)}>
              לכרטיס המלא
            </button>
          </li>
        ))}
      </ol>
      <button type="button" className="chip" onClick={onClinics}>
        למחירונים שפורסמו
      </button>
    </article>
  );
}

function SearchResults({
  q,
  onOpen,
  onSearch,
}: {
  q: string;
  onOpen: (id: string) => void;
  onSearch: (q: string) => void;
}) {
  const [draft, setDraft] = useState(q);
  useEffect(() => setDraft(q), [q]);
  const items = catalog.filter((item) => itemMatches(item, q));
  return (
    <article>
      <PageHead eyebrow="חיפוש" title={q} deck={items.length === 1 ? "פריט אחד בקטלוג" : `${items.length} פריטים בקטלוג`} />
      <form
        className="search refine"
        onSubmit={(event) => {
          event.preventDefault();
          const next = draft.trim();
          if (next) onSearch(next);
        }}
      >
        <label>
          <span className="sr">חיפוש נוסף</span>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} />
        </label>
        <button type="submit" className="send">
          חיפוש
        </button>
      </form>
      {items.length === 0 ? (
        <p className="empty">אין פריט בשם הזה בקטלוג. אפשר לנסות שם של חומר, מרפאה או טיפול.</p>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <ItemButton key={item.id} item={item} onOpen={onOpen} showTracks />
          ))}
        </div>
      )}
    </article>
  );
}

function ItemGroup({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: CatalogItem[];
  onOpen: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <section className="group">
      <div className="group-head">
        <h2>{title}</h2>
        <span>{items.length === 1 ? "פריט אחד" : `${items.length} פריטים`}</span>
      </div>
      <div className="grid">
        {items.map((item) => (
          <ItemButton key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function shotClass(item: CatalogItem, photo: ProductPhoto, base: string) {
  if (photo.frame === "contain") return `${base} contain`;
  if (item.category !== "clinic") return base;
  return photo.frame === "center" ? `${base} person center` : `${base} person`;
}

function ItemButton({
  item,
  onOpen,
  showTracks = false,
}: {
  item: CatalogItem;
  onOpen: (id: string) => void;
  showTracks?: boolean;
}) {
  const lanes = tracksFor(item);
  return (
    <button type="button" className="card" data-evidence={item.evidence} onClick={() => onOpen(item.id)}>
      <span className="card-body">
        <span className="card-kicker">
          <em data-evidence={item.evidence}>{evidenceLabel[item.evidence]}</em>
          {categoryLabel[item.category]}
        </span>
        <strong>{item.nameHe}</strong>
        <span className="en">{item.nameEn}</span>
        <span className="card-summary">{item.summary}</span>
        {item.price && <span className="price">{item.price.headline}</span>}
        {showTracks && lanes.length > 0 && (
          <span className="lanes">{lanes.map((lane) => tracks[lane].title).join(" · ")}</span>
        )}
      </span>
      {item.photos?.[0] && (
        <img className={shotClass(item, item.photos[0], "card-pack")} src={item.photos[0].src} alt="" />
      )}
    </button>
  );
}

function Detail({
  item,
  notes,
  authorName,
  onOpen,
  onTrack,
  onThread,
  onSave,
}: {
  item: CatalogItem;
  notes: Note[];
  authorName: string;
  onOpen: (id: string) => void;
  onTrack: (track: TrackId) => void;
  onThread: (id: string) => void;
  onSave: (threadId: string, name: string, body: string) => void;
}) {
  const lanes = tracksFor(item);
  const relatedThreads = threadsForItem(item.id);
  const sections: [string, string][] = [
    ["איך זה אמור לעבוד", item.mechanism],
    ["מה סביר לצפות", item.expect],
    ["זהירות", item.cautions],
    ["איפה זה קיים", item.access],
  ];

  return (
    <article className="detail page-detail" id="detail" data-evidence={item.evidence}>
      <PageHead
        eyebrow={`${categoryLabel[item.category]} · ${evidenceLabel[item.evidence]}`}
        title={item.nameHe}
        deck={item.summary}
      />
      <p className="en">{item.nameEn}</p>
      {item.aliases.length > 0 && <p className="aliases">{item.aliases.join(" · ")}</p>}
      <div className="detail-layout">
        <div className="shots">
          <PackShots item={item} />
        </div>
        <div className="detail-stack">
            {sections.map(([title, body]) => (
              <section key={title} className="fact">
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
            <section className="skeptic">
              <h2>הקריאה הספקנית</h2>
              <p>{item.skeptic}</p>
            </section>
          </div>
        <aside className="detail-side">
          {item.price ? (
            <section className="price-box">
              <h2>מחיר שנמצא</h2>
              <p className="price">{item.price.headline}</p>
              <p className="asof">{item.price.asOf}</p>
              <ul>
                {item.price.lines.map((line) => (
                  <li key={line.label}>
                    <span>{line.label}</span>
                    <strong>{line.amount}</strong>
                  </li>
                ))}
              </ul>
              <p>{item.price.note}</p>
            </section>
          ) : (
            <p className="hint">אין מחירון פומבי בקטלוג לפריט הזה.</p>
          )}
          <div className="pills">
            {item.conditions
              .filter((value) => value !== "any")
              .map((value) => (
                <span key={value}>{conditionLabel[value]}</span>
              ))}
            {item.channels.map((value) => (
              <span key={value}>{channelLabel[value]}</span>
            ))}
          </div>
          {lanes.length > 0 && (
            <div className="jump-row">
              {lanes.map((lane) => (
                <button key={lane} type="button" className="chip" onClick={() => onTrack(lane)}>
                  במסלול {tracks[lane].title}
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
      {item.extra && <ProductShelf extra={item.extra} />}
      {relatedThreads.length > 0 && (
        <section className="community-box">
          <h2>בקהילה</h2>
          {relatedThreads.map((thread) => {
            const count = notes.filter((note) => note.threadId === thread.id).length;
            return (
              <button key={thread.id} type="button" className="thread" data-tone={thread.tone} onClick={() => onThread(thread.id)}>
                <strong>{thread.title}</strong>
                <span>{thread.opener}</span>
                <em>{count === 1 ? "הערה אחת אצלך" : `${count} הערות אצלך`}</em>
              </button>
            );
          })}
          <NoteForm threadId={relatedThreads[0].id} authorName={authorName} onSave={onSave} />
          <NoteList notes={notes.filter((note) => relatedThreads.some((thread) => thread.id === note.threadId))} />
        </section>
      )}
      {item.related && item.related.length > 0 && (
        <section className="fact">
          <h2>קשור בקטלוג</h2>
          <div className="related">
            {item.related.map((id) => {
              const related = catalogById.get(id);
              if (!related) return null;
              return (
                <button key={id} type="button" onClick={() => onOpen(id)}>
                  {related.nameHe}
                </button>
              );
            })}
          </div>
        </section>
      )}
      <section className="fact">
        <h2>מקורות</h2>
        <ul className="sources">
          {item.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="filter">
      <span>{label}</span>
      <div className="chips">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={active ? "chip on" : "chip"} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

function Icon({ name }: { name: (typeof intents)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "sprout") {
    return (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 13c0-4 3-7 8-8-1 5-4 8-8 8Z" />
        <path d="M12 15c0-3-2.5-6-7-7 1 4 3.5 6.5 7 7Z" />
      </svg>
    );
  }
  if (name === "flask") {
    return (
      <svg {...common}>
        <path d="M9 3h6" />
        <path d="M10 3v5L5.5 18A3 3 0 0 0 8.1 22h7.8a3 3 0 0 0 2.6-4L14 8V3" />
        <path d="M8 14h8" />
      </svg>
    );
  }
  if (name === "scale") {
    return (
      <svg {...common}>
        <path d="M12 3v16" />
        <path d="M8 21h8" />
        <path d="M3 8h18" />
        <path d="M6 8 3.5 14h5L6 8Z" />
        <path d="M18 8 15.5 14h5L18 8Z" />
      </svg>
    );
  }
  if (name === "scissors") {
    return (
      <svg {...common}>
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="6" cy="18" r="2.2" />
        <path d="M8 7.5 20 18" />
        <path d="M8 16.5 20 6" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg {...common}>
        <path d="M6 17.5 3.5 20V6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 17H8Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 6c-1.6-1.4-4-2-8-1.4v13.2C8 17 10.4 17.6 12 19c1.6-1.4 4-2 8-1.2V4.6C16 4 13.6 4.6 12 6Z" />
      <path d="M12 6v13" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20.5 21" />
    </svg>
  );
}

function ThreadList({ notes, onOpen }: { notes: Note[]; onOpen: (id: string) => void }) {
  return (
    <div className="thread-list">
      {threads.map((thread) => {
        const count = notes.filter((note) => note.threadId === thread.id).length;
        return (
          <button key={thread.id} type="button" className="thread" data-tone={thread.tone} onClick={() => onOpen(thread.id)}>
            <strong>{thread.title}</strong>
            <span>{thread.opener}</span>
            <em>{count === 0 ? "עדיין בלי הערות אצלך" : count === 1 ? "הערה אחת אצלך" : `${count} הערות אצלך`}</em>
          </button>
        );
      })}
    </div>
  );
}

function ThreadPage({
  id,
  notes,
  authorName,
  onOpen,
  onSave,
}: {
  id: string;
  notes: Note[];
  authorName: string;
  onOpen: (id: string) => void;
  onSave: (threadId: string, name: string, body: string) => void;
}) {
  const thread = threads.find((item) => item.id === id);
  if (!thread) return <p>הדיון לא נמצא.</p>;
  const item = catalogById.get(thread.itemId);
  const mine = notes.filter((note) => note.threadId === id);
  return (
    <article className="thread-page">
      <PageHead eyebrow="קהילה" title={thread.title} />
      {item && (
        <button type="button" className="context-card" onClick={() => onOpen(item.id)}>
          {item.photos?.[0] && (
            <img className={shotClass(item, item.photos[0], "card-pack")} src={item.photos[0].src} alt="" />
          )}
          <span>
            <em>הכרטיס שעליו הדיון</em>
            <strong>{item.nameHe}</strong>
          </span>
        </button>
      )}
      <p className="callout">{thread.opener}</p>
      <section className="fact">
        <h2>הערות שנשמרו אצלך</h2>
        <NoteList notes={mine} />
      </section>
      <NoteForm threadId={id} authorName={authorName} onSave={onSave} />
      {item?.extra && <ProductShelf extra={item.extra} />}
    </article>
  );
}

function PageHead({ eyebrow, title, deck }: { eyebrow: string; title: string; deck?: string }) {
  return (
    <header className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {deck && <p className="deck">{deck}</p>}
    </header>
  );
}

function NoteForm({
  threadId,
  authorName = "",
  onSave,
}: {
  threadId?: string;
  authorName?: string;
  onSave: (threadId: string, name: string, body: string) => void;
}) {
  const [picked, setPicked] = useState(threadId ?? threads[0].id);
  const [name, setName] = useState(authorName);
  const [body, setBody] = useState("");
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        if (!body.trim()) return;
        onSave(threadId ?? picked, name, body);
        setBody("");
      }}
    >
      {!threadId && (
        <label>
          דיון
          <select value={picked} onChange={(event) => setPicked(event.target.value)}>
            {threads.map((thread) => (
              <option key={thread.id} value={thread.id}>
                {thread.title}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        שם להצגה
        <input value={name} maxLength={24} onChange={(event) => setName(event.target.value)} placeholder="אורח" />
      </label>
      <label>
        הערה
        <textarea
          value={body}
          maxLength={400}
          onChange={(event) => setBody(event.target.value)}
          placeholder="מה ראיתם על המדף, בעמוד או בייעוץ. בלי להבטיח תוצאה."
        />
      </label>
      <button type="submit" className="send">
        פרסום בדיון
      </button>
      <p>נשמר רק בדפדפן הזה. זו לא ביקורת מאומתת ולא תוצאה רפואית.</p>
    </form>
  );
}

function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return <p className="hint">אין עדיין הערות שנשמרו אצלך בדיון הזה.</p>;
  }
  return (
    <ul className="notes">
      {notes.map((note) => (
        <li key={note.id}>
          <strong>{note.name}</strong>
          <time dateTime={note.at}>{noteStamp(note.at)}</time>
          <p>{note.body}</p>
        </li>
      ))}
    </ul>
  );
}

function PackShots({ item }: { item: CatalogItem }) {
  if (!item.photos?.length) {
    return (
      <figure className="figure">
        <Mark kind={artFor(item)} />
        <figcaption>איור להמחשה, לא צילום של האריזה או של המרפאה.</figcaption>
      </figure>
    );
  }
  return (
    <div className="pack-row">
      {item.photos.map((photo) => (
        <figure className="figure" key={photo.src}>
          <img className={shotClass(item, photo, "pack")} src={photo.src} alt={photo.alt} />
          <figcaption>{photo.credit}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProductShelf({ extra }: { extra: ProductExtra }) {
  return (
    <section className="shelf">
      <h2>עמודי קנייה</h2>
      <ul className="facts">
        {extra.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <p className="callout">{extra.pageReviews}</p>
      <div className="shop-list">
        {extra.shops.map((shop) => (
          <a key={shop.url} className="shop" href={shop.url} target="_blank" rel="noreferrer">
            <strong>{shop.store}</strong>
            <span>{shop.title}</span>
            <em>{shop.price}</em>
            <small>{shop.note}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function noteStamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
