export type AromaPyramid = {
  top: string;
  heart: string;
  base: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  scentType: string;
  notes: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  desc: string;
  aromaPyramid: AromaPyramid;
};
