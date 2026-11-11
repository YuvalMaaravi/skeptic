export type Note = {
  id: string;
  threadId: string;
  name: string;
  body: string;
  at: string;
};

const GUEST_KEY = "skeptic-notes-v1";

export function notesKeyFor(session: { mode: "guest" } | { mode: "user"; user: { provider: string; id: string } }) {
  if (session.mode === "guest") return GUEST_KEY;
  return `${GUEST_KEY}:${session.user.provider}:${session.user.id}`;
}

export function loadNotes(key = GUEST_KEY): Note[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (note) =>
        note &&
        typeof note.id === "string" &&
        typeof note.threadId === "string" &&
        typeof note.body === "string" &&
        typeof note.at === "string",
    );
  } catch {
    return [];
  }
}

export function addNote(key: string, name: string, threadId: string, body: string): Note[] {
  const text = body.trim().slice(0, 400);
  if (!text) return loadNotes(key);
  const note: Note = {
    id: crypto.randomUUID(),
    threadId,
    name: (name.trim() || "אורח").slice(0, 24),
    body: text,
    at: new Date().toISOString(),
  };
  const next = [note, ...loadNotes(key)].slice(0, 200);
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}
