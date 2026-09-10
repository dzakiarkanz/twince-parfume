export type AromaPyramid = {
  top: string;
  heart: string;
  base: string;
};

export type Product = {
  // Properti utama sesuai JSON Spring Boot backend
  id: string;
  sku: string;
  name: string;
  slug?: string;
  concentration?: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  isActive?: boolean;

  // Properti pendukung UI frontend
  scentType?: string;
  notes?: string;
  rating?: number;
  desc?: string;
  aromaPyramid?: AromaPyramid;

  // Alias untuk kompatibilitas ke belakang
  stock?: number;
  image?: string;
};
