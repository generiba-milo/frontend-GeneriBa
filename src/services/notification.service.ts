// Notification Service
// Handles notification API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Notification {
  id: string;
  type: 'payment' | 'message' | 'dao' | 'offer' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}

export const notificationService = {
  /**
   * Get all notifications
   */
  list: async (): Promise<{ notifications: Notification[] }> => {
    return api.get<{ notifications: Notification[] }>(API_ENDPOINTS.NOTIFICATIONS.LIST);
  },

  /**
   * Mark notification as read
   */
  markRead: async (id: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  },

  /**
   * Mark all notifications as read
   */
  markAllRead: async (): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },
};
