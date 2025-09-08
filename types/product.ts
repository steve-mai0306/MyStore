export type Product = {
  id: number;
  productName: string;
  rate: number;
  totalRate: number;
  totalSold: number;
  description?: string;
  quantity: number;
  price: number;
  sku: string;
  status: number;
  categoryId: number;
  categoryName: string;
  imageUrls: string[];
  colors: {
    id: number;
    hexValue: string;
    themeColor: string;
  }[];
  materials: {
    id: number;
    materialType: string;
  }[];
  sizes:
    | {
        id: number;
        productSize: string;
      }[]
    | null;
  tags:
    | {
        id: number;
        tagName: string;
      }[]
    | null;
};