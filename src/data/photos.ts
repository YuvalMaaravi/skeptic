import type { ProductPhoto } from "./types";

const family = "צילום האריזה מעמוד פמילי פארם, 10 בנובמבר 2026.";
const eco = "צילום האריזה מעמוד אקופארם.";

export const photos: Record<string, ProductPhoto[]> = {
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
};
