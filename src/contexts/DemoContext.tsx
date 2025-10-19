import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  walletAddress: string;
  completedJobs: number;
  rating: number;
  nfts: number;
  joinDate: string;
}

interface DemoContextType {
  isDemoMode: boolean;
  demoUser: DemoUser | null;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const DEMO_USER: DemoUser = {
  id: 'demo-user-123',
  email: 'demo@generiba.com',
  name: 'Demo User',
  walletAddress: 'Demo7xK...9zP2',
  completedJobs: 5,
  rating: 4.8,
  nfts: 3,
  joinDate: '2024-01-01'
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    // Check if demo mode is enabled in localStorage
    const demoEnabled = localStorage.getItem('demoMode') === 'true';
    if (demoEnabled) {
      setIsDemoMode(true);
      setDemoUser(DEMO_USER);
    }
  }, []);

  const enableDemoMode = () => {
    localStorage.setItem('demoMode', 'true');
    setIsDemoMode(true);
    setDemoUser(DEMO_USER);
    
    toast.success('Demo Mode Enabled', {
      description: 'You can now test all features without logging in!'
    });
  };

  const disableDemoMode = () => {
    localStorage.removeItem('demoMode');
    setIsDemoMode(false);
    setDemoUser(null);
    
    toast.info('Demo Mode Disabled', {
      description: 'You have exited demo mode'
    });
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, demoUser, enableDemoMode, disableDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
