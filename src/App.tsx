import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletProvider";
import { DemoProvider } from "@/contexts/DemoContext";
import { DemoBanner } from "@/components/DemoBanner";
import { GuestModeBanner } from "@/components/GuestModeBanner";
import AuthGuard from "./components/AuthGuard";
import Landing from "./pages/Landing";
import LandingNew from "./pages/LandingNew";
import Marketplace from "./pages/Marketplace";
import GigDetail from "./pages/GigDetail";
import DAO from "./pages/DAO";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import PostGig from "./pages/PostGig";
import Disputes from "./pages/Disputes";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import NeedJob from "./pages/NeedJob";
import CreateJob from "./pages/CreateJob";
import GetLoan from "./pages/GetLoan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WalletProvider>
        <DemoProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <DemoBanner />
            <GuestModeBanner />
            <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingNew />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/need-job" element={<NeedJob />} />
              
              {/* Protected Routes */}
              <Route path="/create-job" element={<AuthGuard><CreateJob /></AuthGuard>} />
              <Route path="/get-loan" element={<AuthGuard><GetLoan /></AuthGuard>} />
              <Route path="/gig/:id" element={<AuthGuard><GigDetail /></AuthGuard>} />
              <Route path="/dao" element={<AuthGuard><DAO /></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/teams" element={<AuthGuard><Teams /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/post-gig" element={<AuthGuard><PostGig /></AuthGuard>} />
              <Route path="/disputes" element={<AuthGuard><Disputes /></AuthGuard>} />
              <Route path="/notifications" element={<AuthGuard><Notifications /></AuthGuard>} />
              <Route path="/help" element={<AuthGuard requireAuth={false}><Help /></AuthGuard>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DemoProvider>
    </WalletProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
