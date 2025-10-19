// Team Service
// Handles team management API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  trustLevel: number;
  completedGigs: number;
  activeGigs: number;
  specialties: string[];
  avatar?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface TeamDetail extends Team {
  membersList: TeamMember[];
  completedGigsList: any[];
  activeGigsList: any[];
}

export interface TeamMember {
  id: string;
  displayName: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export interface CreateTeamPayload {
  name: string;
  description: string;
  specialties: string[];
  isPublic: boolean;
}

export const teamService = {
  /**
   * Get list of teams
   */
  list: async (): Promise<{ teams: Team[] }> => {
    return api.get<{ teams: Team[] }>(API_ENDPOINTS.TEAMS.LIST);
  },

  /**
   * Get team by ID
   */
  getById: async (id: string): Promise<TeamDetail> => {
    return api.get<TeamDetail>(API_ENDPOINTS.TEAMS.GET(id));
  },

  /**
   * Create new team
   */
  create: async (data: CreateTeamPayload): Promise<Team> => {
    return api.post<Team>(API_ENDPOINTS.TEAMS.CREATE, data);
  },

  /**
   * Join a team
   */
  join: async (id: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.TEAMS.JOIN(id));
  },

  /**
   * Leave a team
   */
  leave: async (id: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.TEAMS.LEAVE(id));
  },
};
