import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { CheckCircle2, Wallet, Mail, Play, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useDemo } from '@/contexts/DemoContext';
import { hasFirebaseConfig } from '@/config/firebase';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { user, signInWithGoogle, isGuestMode, linkWallet } = useAuth();
  const { connected, publicKey } = useWallet();
  const { enableDemoMode } = useDemo();
  const [step, setStep] = useState<'initial' | 'wallet'>('initial');
  const [skipGoogle, setSkipGoogle] = useState(false);
  const [walletLinked, setWalletLinked] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [walletConnectionFailed, setWalletConnectionFailed] = useState(false);

  // Reset to initial step when dialog opens, or skip to wallet if Firebase is invalid
  useEffect(() => {
    if (open) {
      setWalletLinked(false);
      if (!hasFirebaseConfig) {
        setStep('wallet');
        setSkipGoogle(true);
      } else {
        setStep('initial');
        setSkipGoogle(false);
      }
    }
  }, [open]);

  // Auto-link wallet to Firebase user when wallet connects
  useEffect(() => {
    const autoLinkWallet = async () => {
      if (user && connected && publicKey && !walletLinked && !user.isGuest) {
        try {
          await linkWallet(publicKey.toString());
          setWalletLinked(true);
          toast.success('Wallet Linked!', {
            description: `Your wallet is now linked to ${user.email}`
          });
        } catch (error: any) {
          console.error('Auto-link wallet failed:', error);
          // Don't show error toast, it's not critical
        }
      }
    };

    autoLinkWallet();
  }, [user, connected, publicKey, walletLinked, linkWallet]);

  const handleGoogleLogin = async () => {
    if (isGuestMode) {
      toast.error('Google sign-in is not available', {
        description: 'Running in Guest Mode - Firebase credentials not configured'
      });
      setLoginFailed(true);
      return;
    }

    try {
      setLoginFailed(false);
      await signInWithGoogle();
      toast.success('✅ Logged in with Google!');
      setStep('wallet');
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Failed to login with Google');
      setLoginFailed(true);
    }
  };

  const handleDemoMode = () => {
    enableDemoMode();
    onOpenChange(false);
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  // Close dialog when both Google and wallet are connected, OR just wallet if skipGoogle
  useEffect(() => {
    if (open) {
      // If skipGoogle mode (no Firebase), just need wallet connection
      if (skipGoogle && connected && publicKey) {
        toast.success('🎉 Wallet connected! Welcome to GeneriBa');
        setTimeout(() => {
          onOpenChange(false);
        }, 500);
      }
      // Normal mode: need both Google and wallet
      else if (!skipGoogle && user && connected && publicKey) {
        toast.success('🎉 Successfully connected! Welcome to GeneriBa');
        setTimeout(() => {
          onOpenChange(false);
        }, 500);
      }
    }
  }, [connected, publicKey, user, open, onOpenChange, skipGoogle]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
            Welcome to GeneriBa
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {skipGoogle 
              ? 'Connect your Solana wallet to get started'
              : step === 'initial' 
                ? 'Sign in with Google to get started'
                : 'Now connect your Solana wallet to access all features'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Firebase Not Configured Warning */}
          {!hasFirebaseConfig && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-amber-500">Firebase Not Configured</p>
                <p className="text-amber-400/80 text-xs mt-1">
                  Google sign-in unavailable. Connect your wallet or try demo mode.
                </p>
              </div>
            </div>
          )}

          {/* Guest Mode Banner */}
          {isGuestMode && hasFirebaseConfig && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-amber-500">Guest Mode Active</p>
                <p className="text-amber-400/80 text-xs mt-1">
                  Firebase credentials not configured. You have automatic access to all features.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Google Login */}
          {!skipGoogle && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  user ? 'bg-green-500' : 'bg-primary'
                }`}>
                  {user ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">1</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold">Sign in with Google</h3>
              </div>

              {!user ? (
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 h-12 text-base"
                  size="lg"
                  disabled={isGuestMode}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Mail className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-green-500">Connected</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          {user && !skipGoogle && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Then</span>
              </div>
            </div>
          )}

          {/* Step 2: Wallet Connection */}
          {(user || skipGoogle) && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  connected ? 'bg-green-500' : 'bg-primary'
                }`}>
                  {connected ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">{skipGoogle ? '1' : '2'}</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold">Connect Solana Wallet</h3>
              </div>

              {!connected ? (
                <div className="space-y-3">
                  <div className="wallet-adapter-button-wrapper">
                    <WalletMultiButton className="!w-full !bg-gradient-to-r !from-primary !to-purple-600 hover:!from-primary/90 hover:!to-purple-600/90 !rounded-lg !h-12 !text-base !font-semibold !transition-all !shadow-lg !shadow-primary/25" />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Supports Phantom, Solflare, Coinbase Wallet, Ledger & more
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Wallet className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-green-500">Wallet Connected</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              )}
            </div>
          )}

          {/* Demo Mode Option - Only show when login fails or Firebase/Wallet unavailable */}
          {(loginFailed || (!hasFirebaseConfig && !connected) || walletConnectionFailed) && (
            <div className="space-y-3">
              <Separator className="my-4" />
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm font-semibold text-amber-500 mb-2">
                  Having trouble logging in?
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Try demo mode to explore the platform without authentication
                </p>
                <Button
                  variant="outline"
                  onClick={handleDemoMode}
                  className="w-full border-amber-500/50 hover:bg-amber-500/10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Enter Demo Mode
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Pre-filled demo account • No wallet needed • Test all features
                </p>
              </div>
            </div>
          )}

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground mt-6 pt-4 border-t border-border">
            By connecting, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
