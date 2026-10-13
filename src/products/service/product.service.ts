import axios from 'axios';

import {
  API_URL,
  getApiErrorMessage,
  getAuthorizationHeader,
} from '../../api/apiClient';
import type {
  CreateProductRequest,
  ProductResponse,
} from '../models/product.model';

export const ProductService = {
  createProduct: async (
    productRequest: CreateProductRequest,
    token: string,
  ): Promise<ProductResponse> => {
    try {
      const response = await axios.post<ProductResponse>(
        `${API_URL}/products/create`,
        productRequest,
        {
          headers: {
            Authorization: getAuthorizationHeader(token),
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'No se pudo crear el producto.'));
    }
  },
};
