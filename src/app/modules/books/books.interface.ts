export interface IBook {
  title: string;
  author: string;
  image_url?: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "ISLAMIC";
  // isbn: string;
  description?: string;
  in_stock: number;
  availableCopies : number ;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
