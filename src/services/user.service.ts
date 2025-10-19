// User Service
// Handles user stats, payouts, staking, and referrals

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface UserStats {
  totalEarned: number;
  activeGigs: number;
  completedGigs: number;
  trustLevel: number;
  rating: number;
  joinedAt: string;
}

export interface Payout {
  id: string;
  amount: number;
  crypto: string;
  gigId: string;
  gigTitle: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  txHash?: string;
  createdAt: string;
  completedAt?: string;
}

export interface StakingInfo {
  totalStaked: number;
  rewardsEarned: number;
  apy: number;
  lockPeriod?: string;
  canUnstake: boolean;
}

export interface StakePayload {
  amount: number;
  action: 'stake' | 'unstake';
}

export interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  activeReferrals: number;
  rewardsEarned: number;
  referrals: Referral[];
}

export interface Referral {
  id: string;
  referredUser: {
    displayName?: string;
    joinedAt: string;
  };
  status: 'active' | 'inactive';
  rewardEarned: number;
}

export const userService = {
  /**
   * Get user dashboard stats
   */
  getStats: async (): Promise<UserStats> => {
    return api.get<UserStats>(API_ENDPOINTS.USER.STATS);
  },

  /**
   * Get user payouts
   */
  getPayouts: async (): Promise<{ payouts: Payout[] }> => {
    return api.get<{ payouts: Payout[] }>(API_ENDPOINTS.USER.PAYOUTS);
  },

  /**
   * Get staking information
   */
  getStaking: async (): Promise<StakingInfo> => {
    return api.get<StakingInfo>(API_ENDPOINTS.USER.STAKING);
  },

  /**
   * Stake or unstake tokens
   */
  stake: async (data: StakePayload): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.USER.STAKE, data);
  },

  /**
   * Get referral stats
   */
  getReferrals: async (): Promise<ReferralStats> => {
    return api.get<ReferralStats>(API_ENDPOINTS.USER.REFERRALS);
  },
};
