import { useDemo } from '@/contexts/DemoContext';
import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';
import { useState } from 'react';

export function DemoBanner() {
  const { isDemoMode, demoUser, disableDemoMode } = useDemo();
  const [isVisible, setIsVisible] = useState(true);

  if (!isDemoMode || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-purple-600 text-white py-2 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Play className="w-5 h-5" />
          <div>
            <p className="font-semibold">Demo Mode Active</p>
            <p className="text-xs opacity-90">
              Testing as {demoUser?.name} • {demoUser?.completedJobs} jobs • {demoUser?.rating}⭐ rating • {demoUser?.nfts} NFTs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={disableDemoMode}
            className="text-white hover:bg-white/20"
          >
            Exit Demo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
