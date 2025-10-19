// Profile Service
// Handles user profile API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  skills?: string[];
  portfolioItems?: PortfolioItem[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  trustLevel: number;
  completedGigs: number;
  totalEarned: number;
  rating: number;
  walletAddress?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  tags: string[];
}

export interface UpdateProfilePayload {
  displayName?: string;
  bio?: string;
  skills?: string[];
  socialLinks?: UserProfile['socialLinks'];
}

export const profileService = {
  /**
   * Get current user's profile
   */
  getMe: async (): Promise<UserProfile> => {
    return api.get<UserProfile>(API_ENDPOINTS.PROFILE.GET);
  },

  /**
   * Update user profile
   */
  update: async (data: UpdateProfilePayload): Promise<UserProfile> => {
    return api.put<UserProfile>(API_ENDPOINTS.PROFILE.UPDATE, data);
  },

  /**
   * Upload avatar image
   */
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.upload<{ avatarUrl: string }>(API_ENDPOINTS.PROFILE.UPLOAD_AVATAR, formData);
  },
};
