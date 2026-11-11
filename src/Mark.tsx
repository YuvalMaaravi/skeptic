import type { ArtKind } from "./data/types";

export function Mark({ kind }: { kind: ArtKind }) {
  return (
    <div className={`mark mark-${kind}`} aria-hidden="true">
      {kind === "tablet" && (
        <svg viewBox="0 0 120 80">
          <rect x="18" y="22" width="36" height="36" rx="18" fill="#ff8b6a" />
          <rect x="58" y="28" width="40" height="24" rx="12" fill="#f2c14e" />
          <path d="M28 40h16M70 40h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {kind === "bottle" && (
        <svg viewBox="0 0 120 80">
          <rect x="50" y="8" width="20" height="14" rx="3" fill="#1aa6a6" />
          <path d="M42 24h36l8 44H34l8-44Z" fill="#7d5cff" />
          <path d="M40 46h42" stroke="#fff" strokeWidth="3" opacity="0.7" />
        </svg>
      )}
      {kind === "shampoo" && (
        <svg viewBox="0 0 120 80">
          <rect x="46" y="6" width="28" height="12" rx="4" fill="#ef5b8a" />
          <rect x="38" y="18" width="44" height="52" rx="14" fill="#2f6fed" />
          <circle cx="60" cy="42" r="8" fill="#fff" opacity="0.85" />
        </svg>
      )}
      {kind === "clinic" && (
        <svg viewBox="0 0 120 80">
          <path d="M16 70V34l44-20 44 20v36" fill="#0f8f6f" />
          <rect x="50" y="42" width="20" height="28" fill="#f4d35e" />
          <path d="M60 28v16M52 36h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {kind === "leaf" && (
        <svg viewBox="0 0 120 80">
          <path d="M28 58c28-4 40-28 62-40-6 30-24 48-62 40Z" fill="#3caf62" />
          <path d="M36 54c16-8 28-20 40-32" stroke="#145c32" strokeWidth="2" fill="none" />
        </svg>
      )}
      {kind === "vial" && (
        <svg viewBox="0 0 120 80">
          <rect x="48" y="8" width="24" height="10" rx="2" fill="#ff5d73" />
          <rect x="44" y="18" width="32" height="50" rx="8" fill="#5b4bff" />
          <rect x="48" y="40" width="24" height="22" rx="4" fill="#ffd1dc" />
        </svg>
      )}
      {kind === "device" && (
        <svg viewBox="0 0 120 80">
          <rect x="34" y="16" width="52" height="48" rx="16" fill="#ff7a45" />
          <circle cx="60" cy="40" r="12" fill="#ffe08a" />
          <circle cx="60" cy="40" r="5" fill="#1f6f8a" />
        </svg>
      )}
    </div>
  );
}
