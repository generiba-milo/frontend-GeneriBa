// Wallet Service
// Handles wallet connection and management

import api from './api';
import { API_ENDPOINTS } from '@/config/api.config';

export interface Wallet {
  id: string;
  address: string;
  blockchain: 'ethereum' | 'solana' | 'polygon';
  isPrimary: boolean;
  balance?: {
    eth?: number;
    sol?: number;
    usdc?: number;
  };
  createdAt: string;
}

export interface ConnectWalletPayload {
  address: string;
  blockchain: Wallet['blockchain'];
  signature: string;
}

export const walletService = {
  /**
   * Connect a new wallet
   */
  connect: async (data: ConnectWalletPayload): Promise<Wallet> => {
    return api.post<Wallet>(API_ENDPOINTS.WALLET.CONNECT, data);
  },

  /**
   * Get user's wallets
   */
  list: async (): Promise<{ wallets: Wallet[] }> => {
    return api.get<{ wallets: Wallet[] }>(API_ENDPOINTS.WALLET.LIST);
  },

  /**
   * Set primary wallet
   */
  setPrimary: async (walletId: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>(API_ENDPOINTS.WALLET.SET_PRIMARY, { walletId });
  },
};
