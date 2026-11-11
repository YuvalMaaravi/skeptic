import type { Source } from "./types";

export const sources = {
  aadMale: {
    label: "AAD — טיפול בהתקרחות גברית",
    url: "https://www.aad.org/public/diseases/hair-loss/treatment/male-pattern-hair-loss-treatment",
  },
  aafp: {
    label: "AAFP — אבחון וטיפול בנשירת שיער, 2024",
    url: "https://www.aafp.org/afp/2024/0900/hair-loss",
  },
  jaad: {
    label: "JAAD — טיפול רפואי ופרוצדורלי בהתקרחות תורשתית",
    url: "https://www.jaad.org/article/S0190-9622(23)00768-5/fulltext",
  },
  canada: {
    label: "קונצנזוס קנדי להתקרחות תורשתית, 2025",
    url: "https://journals.sagepub.com/doi/full/10.1177/12034754251368849",
  },
  propeciaIl: {
    label: "ארגון הרוקחות בישראל — פרופסיה",
    url: "https://drug.co.il/drugs/%D7%A4%D7%A8%D7%95%D7%A4%D7%A1%D7%99%D7%94/",
  },
  minoxi5: {
    label: "ארגון הרוקחות בישראל — מינוקסי 5",
    url: "https://drug.co.il/drugs/%D7%9E%D7%99%D7%A0%D7%95%D7%A7%D7%A1%D7%99-5/",
  },
  minoxi2: {
    label: "ארגון הרוקחות בישראל — מינוקסי 2",
    url: "https://drug.co.il/drugs/%D7%9E%D7%99%D7%A0%D7%95%D7%A7%D7%A1%D7%99-2/",
  },
  minoxiSpc: {
    label: "משרד הבריאות — עלון Minoxi 5",
    url: "https://mohpublic.z6.web.core.windows.net/IsraelDrugs/Rishum01_8_212702023.pdf",
  },
  litfuloIl: {
    label: "משרד הבריאות — Litfulo",
    url: "https://mohpublic.z6.web.core.windows.net/IsraelDrugs/Rishum01_19_719641624.pdf",
  },
  fdaOlumiant: {
    label: "FDA — אישור Olumiant לאלופציה אראטה",
    url: "https://content.govdelivery.com/accounts/USFDA/bulletins/31bfc85",
  },
  fdaLitfulo: {
    label: "FDA — Litfulo",
    url: "https://www.fda.gov/drugs/development-approval-process-drugs/drug-trials-snapshots-litfulo",
  },
  prpMeta: {
    label: "מטה-אנליזה של PRP בנשירה, 2025",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12550094/",
  },
  iprf: {
    label: "ניסוי PRP מול i-PRF מול CGF, 2026",
    url: "https://www.tandfonline.com/doi/full/10.1080/09546634.2026.2659498",
  },
  exosomes: {
    label: "Frontiers — PRP, אקסוזומים והשתלות, 2026",
    url: "https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2026.1820122/full",
  },
  regen: {
    label: "סקירת טיפולים רגנרטיביים, 2025",
    url: "https://doi.org/10.3390/medsci14010005",
  },
  ishrs: {
    label: "ISHRS — דגלים אדומים בהשתלת שיער",
    url: "https://fightthefight.ishrs.org/hair-transplant-black-market-red-flags/",
  },
  otc: {
    label: "סקירת תכשירים ללא מרשם להתקרחות תורשתית",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12136554/",
  },
  biotin: {
    label: "סקירת ביוטין לנשירת שיער",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11324195/",
  },
  keto: {
    label: "סקירה שיטתית של קטוקונזול מקומי",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/dth.13202",
  },
  alt: {
    label: "סקירת טיפולים משלימים לנשירה",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6388561/",
  },
  dhurat: {
    label: "Dhurat — מיקרונידלינג עם מינוקסידיל, 2013",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3746236/",
  },
  microRepeat: {
    label: "ניסוי חוזר: מיקרונידלינג עם מינוקסידיל",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6371730/",
  },
  nhs: {
    label: "NHS — Hair loss",
    url: "https://www.nhs.uk/conditions/hair-loss/",
  },
} satisfies Record<string, Source>;
