// Authentication Service
// Handles backend authentication API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface LoginPayload {
  firebaseToken: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    walletAddress?: string;
    displayName?: string;
  };
}

export const authService = {
  /**
   * Login with Firebase token
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return api.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Refresh auth token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    return api.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH);
  },
};
