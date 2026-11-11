export type ThreadTone = "coral" | "teal" | "amber" | "indigo" | "rose" | "leaf" | "gold" | "violet";

export type Thread = {
  id: string;
  title: string;
  itemId: string;
  tone: ThreadTone;
  opener: string;
};

export const threads: Thread[] = [
  {
    id: "talk-fin",
    title: "פינסטריד: מה שילמתם בקופה מול המחיר באתר?",
    itemId: "finasteride",
    tone: "coral",
    opener:
      "בשור טבצ׳ניק פינסטריד טבע 1 מ״ג רשום ב־111.10 ₪ לשלושים טבליות. זה מחירון, לא ההשתתפות של הקופה. אם ניפקתם מרשם, מה ביקשו מכם בדלפק?",
  },
  {
    id: "talk-minox",
    title: "מינוקסי 5: למה אותו זוג עולה 195 ₪ במקום אחד ו־239 במקום אחר?",
    itemId: "topical-minoxidil",
    tone: "teal",
    opener:
      "פמילי פארם, סופר מדיקה וקלאב פארם מציגים פער של עשרות שקלים על זוג מינוקסי 5. בעמוד אחד יש גם הבטחה של 10% עובי. מה ראיתם על המדף, ומה היה כתוב על האריזה ולא בפרסומת?",
  },
  {
    id: "talk-prp",
    title: "PRP ו־iPRF: מה אמרו לכם בחדר לפני שהוציאו דם?",
    itemId: "prp",
    tone: "amber",
    opener:
      "שני השמות נשמעים כמו אותו טיפול במחיר שונה. בקטלוג הראיות ל־PRP בינוניות, ול־iPRF דקות יותר. אם ישבתם בייעוץ, איזה פרוטוקול הוצג, וכמה מפגשים נכנסו להצעה?",
  },
  {
    id: "talk-turkey",
    title: "חבילה בטורקיה: מה היה כלול אחרי שירדתם מהמטוס?",
    itemId: "clinic-alpha-turkey",
    tone: "indigo",
    opener:
      "Alpha מפרסמים FUE מ־1,900 אירו בלי טיסה, וגם מספר זקיקים ליום ש־ISHRS מסמנים כדגל אדום. MedHair מפרסמים מחיר אחד בלי קשר לכמות. מי שטס, מי פגש אתכם בחדר ומי החזיק את המכשיר?",
  },
  {
    id: "talk-nizoral",
    title: "ניזורל: שמפו לקשקשים, או טיפול בהתקרחות?",
    itemId: "ketoconazole",
    tone: "rose",
    opener:
      "פארמה ספא מוכרים ניזורל 50 מ״ל ב־44 ₪ וכותבים שהוא מוריד DHT. בקטלוג זו טענת שיווק. אם השתמשתם, זה היה נגד קשקשים או במקום תרופה?",
  },
  {
    id: "talk-punch",
    title: "לפני השתלה בארץ: מי מוציא את הזקיקים?",
    itemId: "fue",
    tone: "leaf",
    opener:
      "במרפאות שבקטלוג כתוב פיקוח, צוות וטכנאיות. השם על הדלת והאדם עם הפאנץ׳ הם לא תמיד אותו אדם. מה נאמר לכם בייעוץ, בכתב?",
  },
  {
    id: "talk-rosemary",
    title: "שמן רוזמרין על המדף ליד המינוקסידיל",
    itemId: "rosemary",
    tone: "gold",
    opener:
      "שמנים נמכרים כחלופה עדינה. הראיות בקטלוג לא תומכות בהחלפה של טיפול עם נתונים. מי המליץ על השמן, בית מרקחת, טיקטוק, או מישהו שעבר את זה?",
  },
  {
    id: "talk-gray",
    title: "כדור שהגיע בדואר בלי רוקח",
    itemId: "gray-market",
    tone: "violet",
    opener:
      "פינסטריד ומינוקסידיל בכדורים נמכרים באתרים בלי המסלול הישראלי. אין כאן המלצה לקנות ככה. אם נתקלתם בזה, איך נראה האתר ומה היה חסר בעמוד?",
  },
];

export function threadsForItem(itemId: string) {
  return threads.filter((thread) => thread.itemId === itemId);
}
