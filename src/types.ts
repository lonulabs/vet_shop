export interface Formula {
  header: string;
  rows: Array<[string, string]>;
}

export interface CatalogItem {
  name: string;
  image: string;
  info: string;
  dosis?: string;
  tags: string[];
  formats: Array<[number | string, string, number | null]>;
  formula: Formula;
}

export interface PromoItem {
  code: string;
  name: string;
  unit: string;
  price: number;
}

export interface CartItem {
  id: string; // Format: "itemName|formatName" or "itemName|formatName|promo"
  name: string;
  format: string;
  price: number;
  quantity: number;
  total: number;
  promo: boolean;
  code?: string;
  image?: string;
}
