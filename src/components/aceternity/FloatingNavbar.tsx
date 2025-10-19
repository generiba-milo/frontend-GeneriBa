import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LoginDialog } from "@/components/LoginDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDemo } from "@/contexts/DemoContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    requireAuth?: boolean;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { user, signOut, isGuestMode } = useAuth();
  const { connected, publicKey, disconnect } = useWallet();
  const { isDemoMode, disableDemoMode } = useDemo();
  
  const isAuthenticated = !!(user || (connected && publicKey) || isDemoMode);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.requireAuth && !isAuthenticated) {
      e.preventDefault();
      setPendingNavigation(item.link);
      setShowLoginDialog(true);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setShowLoginDialog(open);
    if (!open && isAuthenticated && pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    } else if (!open) {
      setPendingNavigation(null);
    }
  };

  const handleLogout = async () => {
    try {
      // Disconnect wallet if connected
      if (connected) {
        await disconnect();
      }
      
      // Sign out from Firebase if logged in
      if (user && !user.isGuest) {
        await signOut();
      }
      
      // Disable demo mode if active
      if (isDemoMode) {
        disableDemoMode();
      }
      
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const getUserName = () => {
    if (isDemoMode) return 'Demo User';
    if (isGuestMode) return 'Guest';
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    if (publicKey) return `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`;
    return 'User';
  };

  return (
    <>
      <LoginDialog open={showLoginDialog} onOpenChange={handleDialogClose} />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-border rounded-full bg-card/90 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-4 py-2 items-center justify-center space-x-4",
            className
          )}
        >
          {/* Logo / Home */}
          <Link to="/" className="flex items-center gap-2 px-3 py-2">
            <img 
              src="/generiba_logo_left_square.png" 
              alt="GeneriBa" 
              className="w-8 h-8 rounded object-contain"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="hidden sm:block font-display font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-400 to-pink-600">
              GeneriBa
            </span>
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              onClick={(e) => {
                if (navItem.requireAuth && !isAuthenticated) {
                  e.preventDefault();
                  handleNavigation(navItem, e);
                }
              }}
              className="relative text-sm font-medium hover:text-primary transition-colors px-3 py-2"
            >
              <span className="block">{navItem.name}</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
            </Link>
          ))}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="ml-4">
                  <User className="mr-2 h-4 w-4" />
                  {getUserName()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20 ml-4"
              onClick={() => setShowLoginDialog(true)}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};