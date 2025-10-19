// Loan Service
// Handles loan application and management API calls

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Loan {
  id: string;
  applicant: {
    id: string;
    address: string;
    displayName?: string;
    trustLevel: number;
  };
  amount: number;
  crypto: string;
  purpose: string;
  repaymentPlan: string;
  collateral?: {
    type: string;
    value: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'repaid' | 'defaulted';
  approvedAt?: string;
  dueDate?: string;
  interestRate: number;
  createdAt: string;
}

export interface ApplyLoanPayload {
  amount: number;
  crypto: string;
  purpose: string;
  repaymentPlan: string;
  collateral?: {
    type: string;
    value: number;
  };
}

export interface ReviewLoanPayload {
  decision: 'approve' | 'reject';
  notes?: string;
}

export const loanService = {
  /**
   * Apply for a loan
   */
  apply: async (data: ApplyLoanPayload): Promise<Loan> => {
    return api.post<Loan>(API_ENDPOINTS.LOANS.APPLY, data);
  },

  /**
   * Get loan status
   */
  getStatus: async (): Promise<{ loans: Loan[] }> => {
    return api.get<{ loans: Loan[] }>(API_ENDPOINTS.LOANS.STATUS);
  },

  /**
   * Get all loans (for reviewers)
   */
  list: async (): Promise<{ loans: Loan[] }> => {
    return api.get<{ loans: Loan[] }>(API_ENDPOINTS.LOANS.LIST);
  },

  /**
   * Review a loan (approve/reject)
   */
  review: async (id: string, data: ReviewLoanPayload): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.LOANS.REVIEW(id), data);
  },
};
