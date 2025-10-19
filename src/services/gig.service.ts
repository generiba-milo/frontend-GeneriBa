// Gig/Job Service
// Handles all job-related API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  payout: number;
  crypto: string;
  skills: string[];
  deadline: string;
  trustLevel: number;
  poster: {
    id: string;
    address: string;
    displayName?: string;
    trustLevel: number;
  };
  isGroup: boolean;
  status: 'open' | 'in-progress' | 'completed' | 'disputed';
  applicants?: number;
  createdAt: string;
}

export interface GigDetail extends Gig {
  requirements: string[];
  deliverables: string[];
  milestones?: Milestone[];
  reviews?: Review[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: {
    id: string;
    displayName: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface CreateGigPayload {
  title: string;
  description: string;
  category: string;
  payout: number;
  crypto: string;
  skills: string[];
  deadline: string;
  requirements?: string | string[];
  deliverables?: string[];
  isGroup?: boolean;
}

export interface ApplyToGigPayload {
  proposal: string;
  estimatedDelivery: string;
  rate?: number;
}

export interface GigListParams {
  search?: string;
  category?: string;
  skills?: string[];
  minPayout?: number;
  maxPayout?: number;
  crypto?: string;
  page?: number;
  limit?: number;
  sort?: 'latest' | 'payout' | 'deadline';
}

export interface GigListResponse {
  gigs: Gig[];
  total: number;
  page: number;
  totalPages: number;
}

export const gigService = {
  /**
   * Get list of gigs with filters
   */
  list: async (params?: GigListParams): Promise<GigListResponse> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    const query = queryParams.toString();
    return api.get<GigListResponse>(`${API_ENDPOINTS.JOBS.LIST}${query ? `?${query}` : ''}`);
  },

  /**
   * Get gig by ID
   */
  getById: async (id: string): Promise<GigDetail> => {
    return api.get<GigDetail>(API_ENDPOINTS.JOBS.GET(id));
  },

  /**
   * Create new gig
   */
  create: async (data: CreateGigPayload): Promise<Gig> => {
    return api.post<Gig>(API_ENDPOINTS.JOBS.CREATE, data);
  },

  /**
   * Update gig
   */
  update: async (id: string, data: Partial<CreateGigPayload>): Promise<Gig> => {
    return api.put<Gig>(API_ENDPOINTS.JOBS.UPDATE(id), data);
  },

  /**
   * Delete gig
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(API_ENDPOINTS.JOBS.DELETE(id));
  },

  /**
   * Apply to a gig
   */
  apply: async (id: string, data: ApplyToGigPayload): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.JOBS.APPLY(id), data);
  },

  /**
   * Get user's applications
   */
  getMyApplications: async (): Promise<{ applications: any[] }> => {
    return api.get<{ applications: any[] }>(API_ENDPOINTS.JOBS.MY_APPLICATIONS);
  },

  /**
   * Get active gigs for current user
   */
  getActive: async (): Promise<{ gigs: Gig[] }> => {
    return api.get<{ gigs: Gig[] }>(API_ENDPOINTS.JOBS.ACTIVE);
  },

  /**
   * Mark gig as complete
   */
  complete: async (id: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.JOBS.COMPLETE(id));
  },
};
