export type EvidenceLevel =
  | "strong"
  | "moderate"
  | "limited"
  | "traditional"
  | "cosmetic"
  | "guide"
  | "listing";

export type Category =
  | "pathway"
  | "clinic"
  | "prescription"
  | "topical"
  | "procedure"
  | "device"
  | "supplement"
  | "context"
  | "traditional"
  | "cosmetic";

export type Condition =
  | "aga_m"
  | "aga_f"
  | "areata"
  | "telogen"
  | "traction"
  | "scarring"
  | "any";

export type Channel =
  | "il_otc"
  | "il_rx"
  | "il_clinic"
  | "il_compounded"
  | "abroad_clinic"
  | "abroad_retail"
  | "unregulated_online";

export type Source = {
  label: string;
  url: string;
};

export type PriceQuote = {
  headline: string;
  asOf: string;
  lines: { label: string; amount: string }[];
  note: string;
};

export type ShopLink = {
  store: string;
  title: string;
  url: string;
  price: string;
  note: string;
};

export type ArtKind = "tablet" | "bottle" | "shampoo" | "clinic" | "leaf" | "vial" | "device";

export type ProductPhoto = {
  src: string;
  alt: string;
  credit: string;
};

export type ProductExtra = {
  kind: ArtKind;
  facts: string[];
  shops: ShopLink[];
  pageReviews: string;
};

export type CatalogItem = {
  id: string;
  nameHe: string;
  nameEn: string;
  aliases: string[];
  category: Category;
  conditions: Condition[];
  channels: Channel[];
  evidence: EvidenceLevel;
  summary: string;
  mechanism: string;
  expect: string;
  cautions: string;
  access: string;
  skeptic: string;
  sources: Source[];
  related?: string[];
  price?: PriceQuote;
  extra?: ProductExtra;
  photos?: ProductPhoto[];
};
