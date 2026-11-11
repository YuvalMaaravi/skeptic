import type { ArtKind, CatalogItem, ProductExtra } from "./types";

export const extras: Record<string, ProductExtra> = {
  finasteride: {
    kind: "tablet",
    facts: [
      "העמוד של שור טבצ׳ניק הוא לפינסטריד טבע 1 מ״ג: 111.10 ₪ לשלושים טבליות, ו־277.30 ₪ למאה.",
      "זו תרופת מרשם. המחיר באתר הוא מחירון בית מרקחת, לא ההשתתפות של קופת החולים.",
      "בפארמה ספא מופיעה אריזה אחרת, מילפארם, 28 טבליות ב־59 ₪, והמלאי שם אזל בבדיקה. זה לא אותו יצרן ולא אותה אריזה.",
    ],
    pageReviews:
      "בעמודי שור טבצ׳ניק אין דירוג קונים. הטקסט שם הוא הערת רוקח כללית, לא חוות דעת על תוצאה.",
    shops: [
      {
        store: "שור טבצ׳ניק",
        title: "פינסטריד טבע 1 מ״ג, 30 טבליות",
        url: "https://shor.co.il/finasteride-1mg-teva-tab-30-%D7%A4%D7%99%D7%A0%D7%A1%D7%98%D7%A8%D7%99%D7%93-%D7%98%D7%91%D7%A2-30-%D7%98%D7%91%D7%9C%D7%99%D7%95%D7%AA/",
        price: "111.10 ₪",
        note: "מחירון האתר. נדרש מרשם.",
      },
      {
        store: "שור טבצ׳ניק",
        title: "פינסטריד טבע 1 מ״ג, 100 טבליות",
        url: "https://shor.co.il/finasteride-teva-1mg-tab100-%D7%A4%D7%99%D7%A0%D7%A1%D7%98%D7%A8%D7%99%D7%93-%D7%98%D7%91%D7%A2-100-%D7%98%D7%91%D7%9C%D7%99%D7%95%D7%AA/",
        price: "277.30 ₪",
        note: "אותו חומר, אריזה גדולה יותר.",
      },
      {
        store: "פארמה ספא",
        title: "פינסטריד מילפארם 1 מ״ג, 28 טבליות",
        url: "https://pharmasepa.co.il/product/finasteride-1mg-milpharm/",
        price: "59 ₪, אזל בבדיקה",
        note: "יצרן אחר. עמוד המכירה מוסיף הבטחות שיווקיות. עדיין תרופת מרשם.",
      },
    ],
  },
  "topical-minoxidil": {
    kind: "bottle",
    facts: [
      "מינוקסי 5 של טרימה הוא תמיסת מינוקסידיל 5% לגברים, בלי מרשם. זוג בקבוקים של 80 מ״ל.",
      "פמילי פארם מציגים 195 ₪ ובבדיקה המוצר היה במלאי. סופר מדיקה 229 ₪ וקלאב פארם 239 ₪ מופיעים בעמודי הקטגוריה שלהם.",
      "בעמוד פמילי פארם כתוב גם שהשיער נהיה עבה יותר בלפחות 10%. זו טענה של החנות, לא מספר מהעלון.",
      "מינוקסי 2 הוא הריכוז הרשום לנשים. העלון הישראלי של מינוקסי 5 לא מייעד אותו לנשים.",
    ],
    pageReviews: "בעמודים שנבדקו אין דירוג כוכבים של קונים. מה שיש הוא תיאור מוצר של בית המרקחת.",
    shops: [
      {
        store: "פמילי פארם",
        title: "מינוקסי 5 לגברים, זוג במבצע",
        url: "https://familypharm.co.il/%D7%9E%D7%99%D7%A0%D7%95%D7%A7%D7%A1%D7%99-5-%D7%9C%D7%92%D7%91%D7%A8%D7%99%D7%9D-minoxi-5-men-%D7%9C%D7%A0%D7%A9%D7%99%D7%A8%D7%AA-%D7%A9%D7%99%D7%A2%D7%A8-%D7%90%D7%A6%D7%9C-%D7%92%D7%91%D7%A8%D7%99%D7%9D/",
        price: "195 ₪",
        note: "עמוד מוצר. בבדיקה סומן כקיים במלאי.",
      },
      {
        store: "סופר מדיקה",
        title: "מינוקסי 5 לגברים, זוג, בעמוד הקטגוריה",
        url: "https://www.supermedica.co.il/web/?catid=745840&n=1&pagetype=9",
        price: "229 ₪",
        note: "המחיר מופיע ברשימת נשירת שיער, לא בכרטיס מוצר נפרד.",
      },
      {
        store: "קלאב פארם",
        title: "מינוקסי 5, 80 מ״ל כפול 2, בעמוד הקטגוריה",
        url: "https://www.clubpharm.co.il/web/?catid=751542&n=1&pagetype=9",
        price: "239 ₪",
        note: "גם כאן המחיר יושב ברשימת הקטגוריה.",
      },
      {
        store: "פמילי פארם",
        title: "מינוקסי 2 לנשים, זוג",
        url: "https://familypharm.co.il/נשירת-שיער/מינוקסי-2-לנשים-minoxi-2-women-לנשירת-שיער-אצל-נשים/",
        price: "165 ₪",
        note: "עמוד מוצר. בבדיקה סומן כקיים במלאי. הריכוז הרשום לנשים.",
      },
    ],
  },
  "caffeine-topical": {
    kind: "bottle",
    facts: [
      "אלפסין קפאין בוסטר, 200 מ״ל, מק״ט 4008666224613 באקופארם.",
      "המחיר בעמוד: 49.90 ₪. בעמוד כתוב 0 חוות דעת ואין דירוג.",
      "החנות מתארת חיזוק מראה ושיער דליל. זו שפת מוצר, לא תוצאה של ניסוי שמופיעה שם.",
    ],
    pageReviews: "בעמוד האקופארם של הבוסטר כתוב 0 חוות דעת, בלי דירוג.",
    shops: [
      {
        store: "אקופארם",
        title: "אלפסין קפאין בוסטר, 200 מ״ל",
        url: "https://www.ecopharm.co.il/web/?itemid=328684&pagetype=9",
        price: "49.90 ₪",
        note: "עמוד המוצר שנבדק. מחירים ברשתות אחרות שונים.",
      },
    ],
  },
  ketoconazole: {
    kind: "shampoo",
    facts: [
      "שמפו ניזורל 50 מ״ל של ג׳ונסון אנד ג׳ונסון מופיע בפארמה ספא ב־44 ₪, והמלאי אזל בבדיקה.",
      "באותו עמוד כתוב שהשמפו מוריד DHT ועוזר להתקרחות. זו טענת מכירה. הראיות לקטוקונזול כטיפול בהתקרחות דלילות יותר.",
      "בשור טבצ׳ניק אריזת 100 מ״ל רשומה ב־46.74 ₪ עם הערה שלא מיוצרת יותר.",
    ],
    pageReviews: "לא נמצא דירוג קונים בעמודי הניזורל שנבדקו. מה שכן מופיע הוא טקסט שיווקי של החנות.",
    shops: [
      {
        store: "פארמה ספא",
        title: "שמפו ניזורל 50 מ״ל",
        url: "https://pharmasepa.co.il/product/nizoral-shampoo/",
        price: "44 ₪, אזל בבדיקה",
        note: "עמוד המכירה כולל טענה על DHT. קוראים אותה כפרסומת.",
      },
      {
        store: "שור טבצ׳ניק",
        title: "שמפו ניזורל 100 מ״ל",
        url: "https://shor.co.il/nizoral-shampoo-100-ml-%D7%A0%D7%99%D7%96%D7%95%D7%A8%D7%9C-%D7%A9%D7%9E%D7%A4%D7%95/",
        price: "46.74 ₪",
        note: "האתר מסמן שהאריזה לא מיוצרת יותר.",
      },
    ],
  },
  castor: {
    kind: "bottle",
    facts: [
      "פיור אויל שמן קיק, בקבוק עם משאבה, 24.90 ₪ בפמילי פארם. היה במלאי.",
      "התווית מדברת על גבות, שיער ראש וריסים. אין בעמוד ניסוי מבוקר.",
    ],
    pageReviews: "לא נלקח דירוג קונים מהעמוד. המחיר והאריזה הם מה שמופיע שם.",
    shops: [
      {
        store: "פמילי פארם",
        title: "פיור אויל שמן קיק",
        url: "https://familypharm.co.il/תוספי-תזונה-וטבע/טיפוח-השיער-ושיער-דליל/pure-oil-castor-oil/",
        price: "24.90 ₪",
        note: "עמוד המוצר. היה במלאי.",
      },
    ],
  },
  "hairgain-foam": {
    kind: "bottle",
    facts: [
      "קצף הרגיין, מינוקסידיל 5%, 60 גרם. על האריזה: גברים בני 18 עד 49, התקרחות תורשתית.",
      "125 ₪ בפמילי פארם, במלאי. זו לא אריזת מינוקסי 5 של טרימה.",
    ],
    pageReviews: "לא נלקח דירוג קונים. מה שמופיע הוא תיאור החנות והאריזה.",
    shops: [
      {
        store: "פמילי פארם",
        title: "הרגיין קצף מינוקסידיל 5%",
        url: "https://familypharm.co.il/נשירת-שיער/הרגיין-קצף-hairgain-foam-קצף-מינוקסידיל-לגברים-להצמחת-שיער/",
        price: "125 ₪",
        note: "היה במלאי.",
      },
    ],
  },
  "hairgain-solution": {
    kind: "bottle",
    facts: [
      "תמיסת הרגיין 5% של פריגו, זוג בקבוקים של 60 מ״ל. על הקופסה: לשיווק על ידי רוקח.",
      "121.10 ₪, והמלאי אזל בבדיקה.",
    ],
    pageReviews: "אין כאן דירוג קונים. המחיר הוא של עמוד שבו המוצר אזל.",
    shops: [
      {
        store: "פמילי פארם",
        title: "הרגיין 5%, זוג 60 מ״ל",
        url: "https://familypharm.co.il/נשירת-שיער/הרגיין-5-hairgain/",
        price: "121.10 ₪, אזל בבדיקה",
        note: "נפח שונה ממינוקסי 5 של 80 מ״ל.",
      },
    ],
  },
  "vichy-dercos-shampoo": {
    kind: "shampoo",
    facts: ["שמפו וישי דרקוס אנרג׳י, 400 מ״ל, אמינקסיל וניאצינאמיד.", "79.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים מהעמוד.",
    shops: [
      {
        store: "פמילי פארם",
        title: "וישי דרקוס שמפו אנרג׳י, 400 מ״ל",
        url: "https://familypharm.co.il/וישי-דרקוס-שמפו-ממריץ-לחיזוק-סיב-השערה-vichy-dercos-energising-shampoo/",
        price: "79.90 ₪",
        note: "היה במלאי.",
      },
    ],
  },
  "vichy-aminexil-serum": {
    kind: "bottle",
    facts: ["סרום 90 מ״ל, אמינקסיל 1.5% עם ג׳ינג׳ר וניאצינאמיד.", "222.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים. המילה קליניקל היא על הבקבוק.",
    shops: [
      {
        store: "פמילי פארם",
        title: "דרקוס אמינקסיל קליניקל, 90 מ״ל",
        url: "https://familypharm.co.il/תוספי-תזונה-וטבע/טיפוח-השיער-ושיער-דליל/vichy-dercos-aminexil-clinical-regen-סרום-נגד-נשירת-שיער-90-מל/",
        price: "222.90 ₪",
        note: "היה במלאי.",
      },
    ],
  },
  "vichy-dandruff-shampoo": {
    kind: "shampoo",
    facts: ["שמפו דרקוס לקרקפת רגישה עם קשקשים.", "48.40 ₪, אזל בבדיקה."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "דרקוס שמפו נגד קשקשים לקרקפת רגישה",
        url: "https://familypharm.co.il/טיפוח-העור/קשקשים-וקרקפת/וישי-שמפו-נגד-קשקשים-vichy-dercos-anti-pelliculaire-sensitive-shampoo/",
        price: "48.40 ₪, אזל בבדיקה",
        note: "שמפו לקשקשים.",
      },
    ],
  },
  "phytoaxil-spray": {
    kind: "bottle",
    facts: ["ספריי פיטואקסיל לגברים.", "201.90 ₪, אזל בבדיקה."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "פיטואקסיל ספריי",
        url: "https://familypharm.co.il/נשירת-שיער/פיטואקסיל-ספריי-phytoaxil-spray-לשיער-דליל-וחלש-בגברים/",
        price: "201.90 ₪, אזל בבדיקה",
        note: "אין מינוקסידיל במוצר.",
      },
    ],
  },
  "phytoaxil-shampoo": {
    kind: "shampoo",
    facts: ["שמפו פיטואקסיל.", "60.50 ₪, אזל בבדיקה."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "פיטואקסיל שמפו",
        url: "https://familypharm.co.il/נשירת-שיער/פיטואקסיל-שמפו-phytoaxil-shampoo-לשיער-דליל-וחלש-בגברים/",
        price: "60.50 ₪, אזל בבדיקה",
        note: "שמפו שנשטף.",
      },
    ],
  },
  "kamilotract-shampoo": {
    kind: "shampoo",
    facts: ["שמפו 400 מ״ל, סרפד ורוזמרין. על הבקבוק גם Anti Aging.", "47.90 ₪, אזל בבדיקה."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "קמילוטרקט סרפד־רוזמרין, 400 מ״ל",
        url: "https://familypharm.co.il/טיפוח-העור/קשקשים-וקרקפת/kamilotract-nettle-rosemary-shampoo-400ml/",
        price: "47.90 ₪, אזל בבדיקה",
        note: "לא תחליב הרוזמרין מהניסוי.",
      },
    ],
  },
  "hadar-shampoo": {
    kind: "shampoo",
    facts: ["שמפו 270 מ״ל. על התווית רוזמרין, סרפד, שמן קיק, קמומיל ואלוורה.", "31.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "הדר שמפו טיפולי, 270 מ״ל",
        url: "https://familypharm.co.il/טיפוח-העור/קשקשים-וקרקפת/הדר-שמפו-טיפולי-לחיזוק-השיער-hadar-shampoo/",
        price: "31.90 ₪",
        note: "היה במלאי.",
      },
    ],
  },
  "sebocalm-shampoo": {
    kind: "shampoo",
    facts: ["שמפו 250 מ״ל נגד קשקשים, בלי SLS לפי האריזה.", "61.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "סבוקלם שמפו נגד קשקשים",
        url: "https://familypharm.co.il/טיפוח-העור/קשקשים-וקרקפת/סבוקלם-שמפו-נגד-קשקשים-sebocalm-shampoo/",
        price: "61.90 ₪",
        note: "היה במלאי.",
      },
    ],
  },
  "kamedis-scalp-shampoo": {
    kind: "shampoo",
    facts: [
      "שמפו קמדיס סקאלפ קונטרול, 200 מ״ל, נגד קשקשים.",
      "45.90 ₪, היה במלאי. זה לא סיבי שיער.",
    ],
    pageReviews: "לא נלקח דירוג קונים. החותמת על הבקבוק היא שיווק.",
    shops: [
      {
        store: "פמילי פארם",
        title: "קמדיס סקאלפ קונטרול, 200 מ״ל",
        url: "https://familypharm.co.il/טיפוח-העור/קשקשים-וקרקפת/קמדיס-סקאלפ-קונטרול-שמפו-קשקשים-200-מל/",
        price: "45.90 ₪",
        note: "שמפו לקרקפת, לא טופיק.",
      },
    ],
  },
  "altman-roots": {
    kind: "tablet",
    facts: ["אלטמן רוטס HR לאישה, 120 קפליות על הקופסה.", "149.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "אלטמן רוטס HR לאישה",
        url: "https://familypharm.co.il/תוספי-תזונה-וטבע/טיפוח-השיער-ושיער-דליל/אלטמן-רוטס-hr-לאישה-מארז-זוג-120-קפליות/",
        price: "149.90 ₪",
        note: "תוסף. היה במלאי.",
      },
    ],
  },
  "hair-boost": {
    kind: "tablet",
    facts: ["הייר בוסט ביו, 60 טבליות ג׳לטין עם ביוטין, דרמה פם.", "129.90 ₪, היה במלאי."],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "פמילי פארם",
        title: "הייר בוסט ביו, 60 טבליות",
        url: "https://familypharm.co.il/תוספי-תזונה-וטבע/טיפוח-השיער-ושיער-דליל/hair-boost-bio-דרמה-פם-60-טבליות/",
        price: "129.90 ₪",
        note: "תוסף. היה במלאי.",
      },
    ],
  },
  "altman-roots-men": {
    kind: "tablet",
    facts: [
      "60 כמוסות. התווית מציינת דקל ננסי ובטא־סיטוסטרול, ושתי כמוסות ביום.",
      "מדילינק: 99.90 ₪ במחיר מיוחד, 129.90 ₪ מחיר רגיל.",
    ],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "מדילינק פארם",
        title: "רוטס HR לגבר, 60 כמוסות",
        url: "https://www.medi-link.co.il/%D7%A8%D7%95%D7%98%D7%A1-hr-%D7%9C%D7%92%D7%91%D7%A8.html",
        price: "99.90 ₪",
        note: "מחיר מיוחד. המחיר הרגיל בעמוד 129.90 ₪.",
      },
      {
        store: "אלטמן",
        title: "רוטס HR לגבר, 60 כמוסות",
        url: "https://www.altman.co.il/shop/product-category/hair/",
        price: "151.20 ₪",
        note: "מול 201.60 ₪ בעמוד הקטגוריה.",
      },
    ],
  },
  "altman-roots-gold": {
    kind: "tablet",
    facts: [
      "רוטס לאישה Gold: ויטמינים ומינרלים, ועל העמוד גם חומצה היאלורונית וסרמידים.",
      "129.90 ₪ מול 189.90 ₪ באתר אלטמן.",
    ],
    pageReviews: "לא נלקח דירוג קונים.",
    shops: [
      {
        store: "אלטמן",
        title: "רוטס HR לאישה Gold",
        url: "https://www.altman.co.il/shop/product-category/hair/",
        price: "129.90 ₪",
        note: "מול 189.90 ₪. חנות המותג.",
      },
    ],
  },
  "mayven-richer": {
    kind: "tablet",
    facts: [
      "30 קפסולות. היצרן כותב שזה תוסף, לא תרופה, ושאין הבטחת תוצאה.",
      "בעמוד מופיעים 269 ₪, 319 ₪ ו־379 ₪.",
    ],
    pageReviews: "באתר יש דירוג קונים. לא הועתק לכאן.",
    shops: [
      {
        store: "מייבן",
        title: "RICHER, 30 קפסולות",
        url: "https://www.mayven.co.il/products/richer",
        price: "269 ₪",
        note: "המספר הבולט בעמוד. לידו גם 319 ₪ ו־379 ₪.",
      },
    ],
  },
};

export function artFor(item: CatalogItem): ArtKind {
  if (item.extra?.kind) return item.extra.kind;
  if (item.category === "clinic" || item.category === "pathway") return "clinic";
  if (item.category === "prescription") return "tablet";
  if (item.category === "procedure") return "vial";
  if (item.category === "device") return "device";
  if (item.category === "cosmetic" || item.id === "ketoconazole") return "shampoo";
  if (item.category === "traditional" || item.category === "supplement" || item.category === "context") {
    return "leaf";
  }
  return "bottle";
}
