import axios from 'axios';

import {
  API_URL,
  getApiErrorMessage,
  getAuthorizationHeader,
} from '../../api/apiClient';
import { CategoryResponse } from '../models/category.model';

export const CategoryService = {
  createCategory: async (
    name: string,
    description: string,
    token: string,
  ): Promise<CategoryResponse> => {
    try {
      const response = await axios.post<CategoryResponse>(
        `${API_URL}/categories/create`,
        { name, description },
        {
          headers: {
            Authorization: getAuthorizationHeader(token),
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(error, 'No se pudo guardar la categoría.'),
      );
    }
  },

  getCategories: async (token: string): Promise<CategoryResponse[]> => {
    try {
      const response = await axios.get<CategoryResponse[]>(
        `${API_URL}/categories`,
        {
          headers: {
            Authorization: getAuthorizationHeader(token),
          },
        },
      );

      return response.data;
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(error, 'No se pudieron obtener las categorías.'),
      );
    }
  },
};
