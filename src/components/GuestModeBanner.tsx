import { useState } from 'react';
import { X, ShieldAlert, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function GuestModeBanner() {
  const { isGuestMode, user } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Only show if in guest mode and not dismissed
  if (!isGuestMode || dismissed || !user?.isGuest) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <span className="font-semibold">🔓 Guest Mode Active</span>
            <span className="hidden sm:inline text-white/90">
              Firebase credentials not configured - All features available without authentication
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 hover:text-white h-8 px-3"
            onClick={() => {
              window.open('https://firebase.google.com/docs/web/setup', '_blank');
            }}
          >
            <Info className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Setup Guide</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 hover:text-white h-8 w-8 p-0"
            onClick={() => setDismissed(true)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
