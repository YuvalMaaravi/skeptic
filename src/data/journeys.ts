import type { CatalogItem, Category } from "./types";

export type IntentId = "start" | "treat" | "compare" | "look" | "talk" | "learn";

export type TrackId = "products" | "treatments" | "clinics" | "aesthetic";

export const intents: {
  id: IntentId;
  title: string;
  subtitle: string;
  icon: "sprout" | "flask" | "scale" | "scissors" | "chat" | "book";
}[] = [
  {
    id: "start",
    title: "אני מתחיל לאבד שיער",
    subtitle: "הבנת המצב, בדיקות ואבחון",
    icon: "sprout",
  },
  {
    id: "treat",
    title: "אני מחפש טיפול",
    subtitle: "תרופות, תכשירים וטכנולוגיות",
    icon: "flask",
  },
  {
    id: "compare",
    title: "אני רוצה להשוות",
    subtitle: "מוצרים, טיפולים, מחירים וקליניקות",
    icon: "scale",
  },
  {
    id: "look",
    title: "אני מחפש פתרון אסתטי",
    subtitle: "השתלה, SMP, תסרוקות וסיבים",
    icon: "scissors",
  },
  {
    id: "talk",
    title: "אני רוצה לדבר עם אנשים",
    subtitle: "קהילה, ביקורות והתייעצויות",
    icon: "chat",
  },
  {
    id: "learn",
    title: "אני רוצה ללמוד",
    subtitle: "מחקרים, ביולוגיה וגנטיקה",
    icon: "book",
  },
];

export const tracks: Record<
  TrackId,
  { title: string; compares: string; note: string }
> = {
  products: {
    title: "מוצרים",
    compares: "תרופות, שמפו, תכשירים, תוספים ומכשירים",
    note: "כאן משווים את מה שקונים. ראיות, איפה משיגים את זה, ומחיר מדף אם פורסם. מחיר אחרי קופה לא מופיע.",
  },
  treatments: {
    title: "טיפולים",
    compares: "PRP, iPRF, מיקרונידלינג, לייזר והשתלות",
    note: "השוואה בין סוגי טיפול, לא בין מרפאות. לייזר ביתי מופיע גם במסלול המוצרים, כי אותו פריט נמכר וגם מתואר כטיפול.",
  },
  clinics: {
    title: "קליניקות",
    compares: "מחירים, רופאים, מיקום וטכניקות",
    note: "אין כאן ביקורות מאומתות ואין דירוג תוצאות. הסכום הוא מחירון שפורסם, או דיווח עיתונאי כשאין מחירון באתר.",
  },
  aesthetic: {
    title: "פתרונות אסתטיים",
    compares: "SMP, סיבים, תסרוקות ופאות",
    note: "אלה פתרונות מראה. השתלה יושבת במסלול הטיפולים ובמסלול הקליניקות, כי היא ניתוח ולא הסוואה.",
  },
};

export const trackOrder: TrackId[] = ["products", "treatments", "clinics", "aesthetic"];

const productCategories: Category[] = [
  "prescription",
  "topical",
  "supplement",
  "device",
  "traditional",
];

const treatmentIds = new Set([
  "fue",
  "fut",
  "prp",
  "iprf",
  "microneedling",
  "dutasteride-meso",
  "exosomes",
  "stem-cells",
  "lllt",
]);

const aestheticIds = new Set(["smp", "fibers", "hair-systems"]);

export function tracksFor(item: CatalogItem): TrackId[] {
  const found: TrackId[] = [];
  if (productCategories.includes(item.category)) found.push("products");
  if (treatmentIds.has(item.id)) found.push("treatments");
  if (
    item.category === "clinic" ||
    item.id === "transplant-israel" ||
    item.id === "transplant-tourism"
  ) {
    found.push("clinics");
  }
  if (aestheticIds.has(item.id)) found.push("aesthetic");
  return found;
}

export function inTrack(item: CatalogItem, track: TrackId) {
  return tracksFor(item).includes(track);
}

export const startGroups: { title: string; ids: string[] }[] = [
  {
    title: "מה סוג הנשירה",
    ids: ["telogen", "traction", "scarring-warning"],
  },
  {
    title: "בדיקות שעולות הרבה בשיחה",
    ids: ["iron", "vitamin-d", "weight-training"],
  },
  {
    title: "לאן פונים",
    ids: ["see-dermatologist", "pharmacy-israel", "compounding", "gray-market"],
  },
];

export const treatCategoryOrder: Category[] = [
  "prescription",
  "topical",
  "procedure",
  "device",
  "supplement",
  "traditional",
];

export function treatItems(catalog: CatalogItem[]) {
  return catalog.filter(
    (item) =>
      treatCategoryOrder.includes(item.category) &&
      item.id !== "smp" &&
      item.evidence !== "guide",
  );
}

export const lookGroups: { title: string; ids: string[] }[] = [
  {
    title: "השתלה",
    ids: [
      "fue",
      "fut",
      "transplant-israel",
      "transplant-tourism",
      "clinic-ginzburg",
      "clinic-dng",
      "clinic-dr-hair",
      "clinic-shaltiel",
      "clinic-rimi",
      "clinic-buchbut",
      "clinic-beyond",
      "clinic-renew",
      "clinic-alpha-turkey",
      "clinic-medhair",
    ],
  },
  {
    title: "הסוואה",
    ids: ["smp", "fibers", "hair-systems"],
  },
];

export const talkTopics: { id: string; ask: string }[] = [
  { id: "finasteride", ask: "פינסטריד בסל, או שמשלמים מחיר מלא?" },
  { id: "topical-minoxidil", ask: "מינוקסי 5 מתאים גם לנשים?" },
  { id: "prp", ask: "PRP יכול להחליף תרופה?" },
  { id: "iprf", ask: "iPRF הוא PRP בשם אחר?" },
  { id: "fue", ask: "מי מוציא את הזקיקים ביום ההשתלה?" },
  { id: "transplant-tourism", ask: "מה בודקים בחבילה עם מלון בחו״ל?" },
  { id: "gray-market", ask: "כדור מהאינטרנט הוא אותו טיפול?" },
  { id: "rosemary", ask: "שמן רוזמרין עומד במקום מינוקסידיל?" },
  { id: "experimental-topicals", ask: "תכשיר בלי רישום הוא ניסוי או מוצר?" },
  { id: "clinic-alpha-turkey", ask: "מחיר קבוע ומספר זקיקים בלי גבול?" },
  { id: "ketoconazole", ask: "שמפו נגד קשקשים הוא טיפול בהתקרחות?" },
  { id: "biotin", ask: "ביוטין עוזר כשאין חוסר?" },
];

export const homePrompts: { title: string; to: "pair" | "treatments" | "checklist" }[] = [
  { title: "מה ההבדל בין PRP ל־iPRF?", to: "pair" },
  { title: "השוואת טיפולים לנשירת שיער.", to: "treatments" },
  { title: "מה חשוב לבדוק לפני השתלה?", to: "checklist" },
];

export function itemMatches(item: CatalogItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const blob = [
    item.nameHe,
    item.nameEn,
    ...item.aliases,
    item.summary,
    item.skeptic,
    item.price?.headline ?? "",
    ...(item.price?.lines.flatMap((line) => [line.label, line.amount]) ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return blob.includes(q);
}

export function byId(catalog: CatalogItem[], ids: string[]) {
  const map = new Map(catalog.map((item) => [item.id, item]));
  return ids.flatMap((id) => {
    const item = map.get(id);
    return item ? [item] : [];
  });
}
