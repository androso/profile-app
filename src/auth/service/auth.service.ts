import axios from 'axios';

import { API_URL, getApiErrorMessage } from '../../api/apiClient';
import { AuthResponse, RegisterRequest } from '../models/auth.model';

export const AuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(error, 'An error occurred during login.'),
      );
    }
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, payload);

      return response.data;
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(error, 'An error occurred during registration.'),
      );
    }
  },
};
