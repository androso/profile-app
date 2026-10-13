export interface CreateProductRequest {
  name: string;
  categoryId: number;
  description: string;
  regularPrice: number;
  offerPrice?: number;
  initialStock: number;
  minStockAlert: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  regularPrice: number;
  offerPrice?: number;
  initialStock: number;
  minStockAlert: number;
  createdAt: string;
  updatedAt: string;
}
