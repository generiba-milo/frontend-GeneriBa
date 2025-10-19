import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginDialog }  from './LoginDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDemo } from '@/contexts/DemoContext';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [showLogin, setShowLogin] = useState(false);
  const { user, isGuestMode } = useAuth();
  const { connected, publicKey } = useWallet();
  const { isDemoMode } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated
  // Accepts: Firebase user, Solana wallet, Demo mode, OR Guest mode (no credentials)
  const isAuthenticated = !!(user || (connected && publicKey) || isDemoMode || isGuestMode);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [requireAuth, isAuthenticated, location.pathname]);

  const handleDialogClose = (open: boolean) => {
    if (!open && requireAuth && !isAuthenticated) {
      // If user closes dialog without logging in, redirect to landing
      navigate('/');
    }
    setShowLogin(open);
  };

  // If authentication is not required, render children directly
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If authenticated (including guest mode), render children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show login dialog
  return (
    <>
      <LoginDialog
        open={showLogin}
        onOpenChange={handleDialogClose}
      />
      {/* Show a placeholder or loading state while waiting for auth */}
      <div className="min-h-screen bg-black" />
    </>
  );
}
