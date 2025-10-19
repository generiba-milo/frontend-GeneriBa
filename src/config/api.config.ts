// API Configuration
// Base URL for backend API calls

export const API_CONFIG = {
  // Use environment variable or default to localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Request timeout in milliseconds
  timeout: 30000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Retry configuration
  retry: {
    maxRetries: 3,
    retryDelay: 1000
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  
  // Profile
  PROFILE: {
    GET: '/profile/me',
    UPDATE: '/profile/me',
    UPLOAD_AVATAR: '/profile/avatar'
  },
  
  // Wallets
  WALLET: {
    CONNECT: '/wallets/connect',
    LIST: '/wallets',
    SET_PRIMARY: '/wallets/primary'
  },
  
  // Jobs/Gigs
  JOBS: {
    LIST: '/jobs/list',
    GET: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs/create',
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
    APPLY: (id: string) => `/jobs/apply/${id}`,
    MY_APPLICATIONS: '/jobs/applications',
    ACTIVE: '/jobs/active',
    COMPLETE: (id: string) => `/jobs/${id}/complete`
  },
  
  // Teams
  TEAMS: {
    LIST: '/teams',
    GET: (id: string) => `/teams/${id}`,
    CREATE: '/teams/create',
    JOIN: (id: string) => `/teams/${id}/join`,
    LEAVE: (id: string) => `/teams/${id}/leave`
  },
  
  // DAO
  DAO: {
    PROPOSALS: '/dao/proposals',
    GET_PROPOSAL: (id: string) => `/dao/proposals/${id}`,
    CREATE_PROPOSAL: '/dao/proposals',
    VOTE: (id: string) => `/dao/proposals/${id}/vote`,
    TREASURY: '/dao/treasury',
    STATS: '/dao/stats'
  },
  
  // Loans
  LOANS: {
    APPLY: '/loans/apply',
    STATUS: '/loans/status',
    LIST: '/loans',
    REVIEW: (id: string) => `/loans/${id}/review`
  },
  
  // Disputes
  DISPUTES: {
    FILE: '/disputes/file',
    GET: (id: string) => `/disputes/${id}`,
    SUBMIT_EVIDENCE: (id: string) => `/disputes/${id}/evidence`
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all'
  },
  
  // User Stats
  USER: {
    STATS: '/user/stats',
    PAYOUTS: '/user/payouts',
    STAKING: '/user/staking',
    STAKE: '/user/stake',
    REFERRALS: '/user/referrals'
  }
};
