import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { GuestModeBanner } from "@/components/GuestModeBanner";
import AuthGuard from "./components/AuthGuard";
import RootLayout from "./pages/Layout";
import Marketplace from "./pages/Marketplace";
import GigDetail from "./pages/GigDetail";
import Profile from "./pages/Profile";
import PostGig from "./pages/PostGig";
import CreateJob from "./pages/CreateJob";
import GetLoan from "./pages/GetLoan";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import ViewProfile from "./pages/ViewProfile";


const queryClient = new QueryClient();


const App = () => {
  const endpoint = "https://api.devnet.solana.com";
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <DemoProvider>
                <BrowserRouter>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <GuestModeBanner />

                    <RootLayout>
                      <Routes>
                        <Route path="/" element={<Marketplace />} />
                        <Route
                          path="/create-job"
                          element={<AuthGuard><CreateJob /></AuthGuard>}
                        />
                        <Route
                          path="/get-loan"
                          element={<AuthGuard><GetLoan /></AuthGuard>}
                        />
                        <Route
                          path="/gig/:id"
                          element={<AuthGuard><GigDetail /></AuthGuard>}
                        />
                        <Route
                          path="/profile"
                          element={<AuthGuard><Profile /></AuthGuard>}
                        />
                        <Route
                          path="/viewprofile/:id"
                          element={<AuthGuard><ViewProfile /></AuthGuard>}
                        />
                        <Route
                          path="/post-gig"
                          element={<AuthGuard><PostGig /></AuthGuard>}
                        />
                        <Route path="*" element={<Marketplace />} />
                      </Routes>
                    </RootLayout>
                  </TooltipProvider>
                </BrowserRouter>
              </DemoProvider>
            </AuthProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
