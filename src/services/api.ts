// Base API Client
// Handles all HTTP requests with authentication

import { API_CONFIG } from '@/config/api.config';
import { handleSubmit } from '@/pages/api';

// Types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = async (token: string): Promise<void> => {
  localStorage.setItem('auth_token', token);
  
};

// Remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Base fetch wrapper with error handling
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(
      `${API_CONFIG.baseURL}${endpoint}`,
      config
    );

    // Handle non-200 responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText || 'An error occurred'
      }));

      throw {
        message: error.message || 'Request failed',
        status: response.status,
        code: error.code
      } as ApiError;
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Network errors or parsing errors
    if (error.status) {
      throw error;
    }

    throw {
      message: error.message || 'Network error occurred',
      code: 'NETWORK_ERROR'
    } as ApiError;
  }
}

// API Methods
export const api = {
  // GET request
  get: <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  },

  // POST request
  post: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PUT request
  put: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PATCH request
  patch: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // DELETE request
  delete: <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },

  // Upload file (multipart/form-data)
  upload: <T>(endpoint: string, formData: FormData, options?: RequestInit): Promise<T> => {
    const token = getAuthToken();

    return fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText
        }));
        throw {
          message: error.message || 'Upload failed',
          status: response.status
        } as ApiError;
      }
      return response.json();
    });
  },
};

export default api;
