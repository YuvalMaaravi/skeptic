import { asset } from "../asset";
import type { ProductPhoto } from "./types";

const family = "צילום האריזה מעמוד פמילי פארם, 10 בנובמבר 2026.";
const eco = "צילום האריזה מעמוד אקופארם.";

const shots: Record<string, ProductPhoto[]> = {
  "topical-minoxidil": [
    {
      src: "/products/minoxi-5.jpg",
      alt: "אריזת מינוקסי 5 לגברים, תמיסת מינוקסידיל 5%",
      credit: family,
    },
    {
      src: "/products/minoxi-2.jpg",
      alt: "אריזת מינוקסי 2 לנשים, תמיסת מינוקסידיל 2%",
      credit: family,
    },
  ],
  "caffeine-topical": [
    {
      src: "/products/alpecin-booster.webp",
      alt: "בקבוק אלפסין קפאין בוסטר",
      credit: eco,
    },
  ],
  castor: [
    {
      src: "/products/castor-oil.jpg",
      alt: "שמן קיק פיור אויל בבקבוק עם משאבה",
      credit: family,
    },
  ],
  "hairgain-foam": [
    {
      src: "/products/hairgain-foam.jpg",
      alt: "קצף הרגיין, מינוקסידיל 5% לגברים",
      credit: family,
    },
  ],
  "hairgain-solution": [
    {
      src: "/products/hairgain-5.jpg",
      alt: "אריזת הרגיין 5% של פריגו, זוג בקבוקים",
      credit: family,
    },
  ],
  "vichy-dercos-shampoo": [
    {
      src: "/products/vichy-dercos-shampoo.jpg",
      alt: "שמפו וישי דרקוס אנרג׳י עם אמינקסיל",
      credit: family,
    },
  ],
  "vichy-aminexil-serum": [
    {
      src: "/products/vichy-aminexil-serum.jpg",
      alt: "סרום וישי דרקוס אמינקסיל קליניקל",
      credit: family,
    },
  ],
  "vichy-dandruff-shampoo": [
    {
      src: "/products/vichy-dandruff-shampoo.jpg",
      alt: "שמפו וישי דרקוס נגד קשקשים לקרקפת רגישה",
      credit: family,
    },
  ],
  "phytoaxil-spray": [
    {
      src: "/products/phytoaxil-spray.jpg",
      alt: "ספריי פיטואקסיל לשיער דליל",
      credit: family,
    },
  ],
  "phytoaxil-shampoo": [
    {
      src: "/products/phytoaxil-shampoo.jpg",
      alt: "שמפו פיטואקסיל",
      credit: family,
    },
  ],
  "kamilotract-shampoo": [
    {
      src: "/products/kamilotract-shampoo.jpg",
      alt: "שמפו קמילוטרקט סרפד ורוזמרין",
      credit: family,
    },
  ],
  "sebocalm-shampoo": [
    {
      src: "/products/sebocalm-shampoo.jpg",
      alt: "שמפו סבוקלם נגד קשקשים",
      credit: family,
    },
  ],
  "kamedis-scalp-shampoo": [
    {
      src: "/products/kamedis-scalp-shampoo.jpg",
      alt: "שמפו קמדיס סקאלפ קונטרול נגד קשקשים",
      credit: family,
    },
  ],
  "hadar-shampoo": [
    {
      src: "/products/hadar-shampoo.jpg",
      alt: "שמפו הדר טיפולי לחיזוק סיבי השיער",
      credit: family,
    },
  ],
  "altman-roots": [
    {
      src: "/products/altman-roots.jpg",
      alt: "קופסת אלטמן רוטס HR לאישה, 120 קפליות",
      credit: family,
    },
  ],
  "hair-boost": [
    {
      src: "/products/hair-boost.jpg",
      alt: "צנצנת הייר בוסט ביו של דרמה פם, 60 טבליות",
      credit: family,
    },
  ],
  "clinic-ginzburg": [
    {
      src: "/clinics/ginzburg.jpg",
      alt: "דיוקן של ד״ר אלכס גינזבורג, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד גינזבורג מדיקל, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-dng": [
    {
      src: "/clinics/dng.jpg",
      alt: "דיוקן של ד״ר קרולינה נלינגר, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד DNG מדיקל, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-trichogenics": [
    {
      src: "/clinics/trichogenics.jpg",
      alt: "דיוקן של ד״ר אסי פרץ וד״ר אריק פרץ, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד Trichogenics, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-dr-hair": [
    {
      src: "/clinics/dr-hair.jpg",
      alt: "דיוקן של ד״ר ג׳רמי נידם, כפי שפורסם באתר Dr Hair Clinic",
      credit: "ד״ר ג׳רמי נידם. דיוקן מעמוד הרופא באתר Dr Hair Clinic, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
      frame: "center",
    },
    {
      src: "/clinics/dr-hair-timsit.jpg",
      alt: "דיוקן של ד״ר נתנאל טימסטיט, כפי שפורסם באתר Dr Hair Clinic",
      credit: "ד״ר נתנאל טימסטיט. דיוקן מעמוד הרופא באתר Dr Hair Clinic, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
      frame: "center",
    },
  ],
  "clinic-shaltiel": [
    {
      src: "/clinics/shaltiel.jpg",
      alt: "דיוקן של ד״ר שלום שאלתיאל, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד הבית של ד״ר שאלתיאל, 11 בנובמבר 2026. הקובץ באתר קטן. לא תוצאה ולא לפני־ואחרי.",
      frame: "contain",
    },
  ],
  "clinic-rimi": [
    {
      src: "/clinics/rimi.jpg",
      alt: "דיוקן של ד״ר רימי עאסי, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד ד״ר רימי עאסי, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
      frame: "center",
    },
  ],
  "clinic-buchbut": [
    {
      src: "/clinics/buchbut.jpg",
      alt: "דיוקן של ד״ר דנה בוכבוט, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד ד״ר דנה בוכבוט, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
      frame: "center",
    },
  ],
  "clinic-beyond": [
    {
      src: "/clinics/beyond.jpg",
      alt: "ד״ר מוחמד עבדול האדי בקליניקה של Beyond Aesthetics",
      credit: "ד״ר מוחמד עבדול האדי. דיוקן מעמוד Beyond Aesthetics, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
    {
      src: "/clinics/beyond-zarian.jpg",
      alt: "דיוקן של ד״ר זריאן, כפי שפורסם באתר Beyond Aesthetics",
      credit: "ד״ר זריאן. דיוקן מעמוד Beyond Aesthetics, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
      frame: "center",
    },
  ],
  "clinic-renew": [
    {
      src: "/clinics/renew.jpg",
      alt: "דיוקן של ד״ר ערוה אבו ליל, כפי שפורסם באתר RENEW",
      credit: "דיוקן מעמוד RENEW, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-medhair": [
    {
      src: "/clinics/medhair.jpg",
      alt: "דיוקן של ד״ר ודאט טוסון, המנהל הרפואי של MedHair",
      credit: "דיוקן מעמוד MedHair, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-hairmedico": [
    {
      src: "/clinics/hairmedico.jpg",
      alt: "דיוקן של ד״ר ארסלאן מוסבה, כפי שפורסם באתר Hairmedico",
      credit: "דיוקן מעמוד Hairmedico, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
  "clinic-ahd": [
    {
      src: "/clinics/ahd.jpg",
      alt: "דיוקן של ד״ר האקאן דוגאנאי, כפי שפורסם באתר המרפאה",
      credit: "דיוקן מעמוד AHD, 11 בנובמבר 2026. הקובץ באתר קטן. לא תוצאה ולא לפני־ואחרי.",
      frame: "contain",
    },
  ],
  "clinic-fks": [
    {
      src: "/clinics/fks.jpg",
      alt: "דיוקן של ד״ר קודוסי אונאי, המנהל הרפואי של FKS",
      credit: "ד״ר קודוסי אונאי, המנהל הרפואי. מעמוד הרופאים של FKS, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
    {
      src: "/clinics/fks-soylu.jpg",
      alt: "דיוקן של ד״ר פטמה סדה סוילו, מנתחת שיער ב־FKS",
      credit: "ד״ר פטמה סדה סוילו. מעמוד הרופאים של FKS, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
    {
      src: "/clinics/fks-cakmakci.jpg",
      alt: "דיוקן של ד״ר ברק צ׳קמקצ׳י, מנתחת שיער ב־FKS",
      credit: "ד״ר ברק צ׳קמקצ׳י. מעמוד הרופאים של FKS, 11 בנובמבר 2026. לא תוצאה ולא לפני־ואחרי.",
    },
  ],
};

export const photos: Record<string, ProductPhoto[]> = Object.fromEntries(
  Object.entries(shots).map(([id, list]) => [id, list.map((photo) => ({ ...photo, src: asset(photo.src) }))]),
);
