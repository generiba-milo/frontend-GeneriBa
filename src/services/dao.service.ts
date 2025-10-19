// DAO Service
// Handles DAO governance API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: {
    id: string;
    address: string;
    displayName?: string;
  };
  status: 'active' | 'passed' | 'rejected' | 'executed';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  endTime: string;
  createdAt: string;
}

export interface CreateProposalPayload {
  title: string;
  description: string;
  type: 'parameter-change' | 'treasury-spend' | 'governance';
  data?: any;
}

export interface VotePayload {
  vote: 'for' | 'against';
  votingPower?: number;
}

export interface TreasuryStats {
  totalValue: number;
  assets: {
    eth: number;
    usdc: number;
    sol: number;
  };
  transactions: {
    recent: any[];
  };
}

export interface DAOStats {
  totalMembers: number;
  activeProposals: number;
  treasuryValue: number;
  userVotingPower: number;
}

export const daoService = {
  /**
   * Get all proposals
   */
  getProposals: async (): Promise<{ proposals: Proposal[] }> => {
    return api.get<{ proposals: Proposal[] }>(API_ENDPOINTS.DAO.PROPOSALS);
  },

  /**
   * Get proposal by ID
   */
  getProposal: async (id: string): Promise<Proposal> => {
    return api.get<Proposal>(API_ENDPOINTS.DAO.GET_PROPOSAL(id));
  },

  /**
   * Create new proposal
   */
  createProposal: async (data: CreateProposalPayload): Promise<Proposal> => {
    return api.post<Proposal>(API_ENDPOINTS.DAO.CREATE_PROPOSAL, data);
  },

  /**
   * Vote on a proposal
   */
  vote: async (id: string, data: VotePayload): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.DAO.VOTE(id), data);
  },

  /**
   * Get treasury stats
   */
  getTreasury: async (): Promise<TreasuryStats> => {
    return api.get<TreasuryStats>(API_ENDPOINTS.DAO.TREASURY);
  },

  /**
   * Get DAO stats
   */
  getStats: async (): Promise<DAOStats> => {
    return api.get<DAOStats>(API_ENDPOINTS.DAO.STATS);
  },
};
