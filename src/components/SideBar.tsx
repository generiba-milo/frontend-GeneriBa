"use client";

import {
  Home,
  PlusCircle,
  CreditCard,
  LogIn,
  LogOut,
  User,
  Wallet2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDemo } from "@/contexts/DemoContext";
import { toast } from "sonner";
import { LoginDialog } from "@/components/LoginDialog";

// Sidebar navigation links
const links = [
  { name: "Need Job", link: "/", icon: Home, requireAuth: false },
  { name: "Create Job", link: "/create-job", icon: PlusCircle, requireAuth: true },
  { name: "Work", link: "/get-loan", icon: CreditCard, requireAuth: true },
];

export function Sidebar() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user, signOut, isGuestMode } = useAuth();
  const { connected, publicKey, disconnect } = useWallet();
  const { isDemoMode, disableDemoMode } = useDemo();

  const isAuthenticated = !!(user || (connected && publicKey) || isDemoMode);

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
      if (connected) await disconnect();
      if (user && !user.isGuest) await signOut();
      if (isDemoMode) disableDemoMode();

      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const getUserName = () => {
    if (isDemoMode) return "Demo User";
    if (isGuestMode) return "Guest";
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    if (publicKey)
      return `${publicKey.toString().slice(0, 4)}...${publicKey
        .toString()
        .slice(-4)}`;
    return "User";
  };

  return (
    <aside
      className={cn(
        "w-64 h-screen bg-black text-white flex flex-col justify-between transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <LoginDialog open={showLoginDialog} onOpenChange={handleDialogClose} />
        <img
          src="/logo.png"
          alt="GeneriBa Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="font-bold text-xl">GeneriBa</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.link}
              className="flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start text-white border-gray-700 hover:bg-gray-800"
              >
                <User className="mr-2 h-4 w-4" />
                {getUserName()}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              {connected && (
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="text-red-400"
                >
                  <Wallet2 className="mr-2 h-4 w-4" />
                  Disconnect Wallet
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-gray-900 text-white flex items-center gap-2 w-full justify-center p-2 rounded-md hover:bg-gray-800"
            onClick={() => setShowLoginDialog(true)}
          >
            <LogIn size={20} />
            <span>Login</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
