import type { Category, Channel, Condition, EvidenceLevel } from "./types";

export const CATALOG_UPDATED = "2026-11-10";

export const categoryLabel: Record<Category, string> = {
  pathway: "איך ניגשים",
  clinic: "מרפאות",
  prescription: "תרופות מרשם",
  topical: "תכשירים",
  procedure: "טיפולים",
  device: "מכשירים",
  supplement: "תוספי תזונה",
  context: "אבחנה ומהלך",
  traditional: "תרופות סבתא",
  cosmetic: "הסוואה",
};

export const categoryOrder: Category[] = [
  "pathway",
  "clinic",
  "context",
  "prescription",
  "topical",
  "procedure",
  "device",
  "supplement",
  "traditional",
  "cosmetic",
];

export const evidenceLabel: Record<EvidenceLevel, string> = {
  strong: "ראיות חזקות",
  moderate: "ראיות בינוניות",
  limited: "ראיות מוגבלות",
  traditional: "מסורתי",
  cosmetic: "קוסמטי",
  guide: "מפת דרך",
  listing: "מחירון שפורסם",
};

export const evidenceRank: Record<EvidenceLevel, number> = {
  strong: 0,
  moderate: 1,
  limited: 2,
  traditional: 3,
  cosmetic: 4,
  guide: 5,
  listing: 6,
};

export const evidenceBlurb: Record<EvidenceLevel, string> = {
  strong: "ניסויים עקביים, או פרקטיקה רפואית מקובלת עם סטנדרט ברור.",
  moderate: "יש נתונים קליניים, אבל הפרוטוקול, גודל האפקט או ההתוויה לא סגורים.",
  limited: "מעט מחקרים, תוצאות לא עקביות, או שיווק שמקדים את הראיות.",
  traditional: "שימוש עממי. אין בסיס קליני שמאפשר להסתמך על זה כטיפול.",
  cosmetic: "משנה מראה. לא מטפל בזקיק ולא עוצר את המחלה.",
  guide: "לא דירוג יעילות. זה איך השירות עובד ומה כדאי לבדוק לפני שמשלמים.",
  listing: "מספר מתוך עמוד המחיר של המרפאה או החנות. לא דירוג של תוצאה ושל מי מחזיק את המכשיר.",
};

export const conditionLabel: Record<Condition, string> = {
  aga_m: "התקרחות גברית",
  aga_f: "התקרחות נשית",
  areata: "אלופציה אראטה",
  telogen: "נשירה זמנית",
  traction: "נשירת משיכה",
  scarring: "התקרחות מצלקת",
  any: "כללי",
};

export const channelLabel: Record<Channel, string> = {
  il_otc: "ללא מרשם בישראל",
  il_rx: "מרשם בישראל",
  il_clinic: "מרפאה בישראל",
  il_compounded: "הכנה אישית בארץ",
  abroad_clinic: "מרפאה בחו״ל",
  abroad_retail: "נמכר בעולם",
  unregulated_online: "רשת לא מפוקחת",
};

export const conditionOrder: Condition[] = [
  "aga_m",
  "aga_f",
  "areata",
  "telogen",
  "traction",
  "scarring",
];
