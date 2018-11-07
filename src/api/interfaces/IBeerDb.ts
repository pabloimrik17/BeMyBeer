export interface IBeerDb {
  idBeer?: number;
  name: string;
  graduation: number;
  color?: string;
  score?: number;
  price?: number;
  idCategory: number;
  datePurchased: string;
  dateDrinked?: string;
}
