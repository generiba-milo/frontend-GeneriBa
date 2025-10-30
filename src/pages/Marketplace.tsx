"use client";

import GigCard from "@/components/GigCard";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { handleSubmit } from "./api";
import Loading from "./loading";
import { useWallet } from "@solana/wallet-adapter-react";
import ManualWalletModal from "./manualmodel";

const Marketplace = () => {
  const { connected, publicKey } = useWallet();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  type Gig = {
    id: string;
    title: string;
    description: string;
    payout: string;
    crypto: string;
    poster: string;
    trustLevel: number;
    skills: string;
    isGroup: boolean;
    deadline: string;
  };

  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    try {
      const mData = await handleSubmit("sql", {
        query: "SELECT * FROM gigs WHERE assign IS NULL",
        params: [],
      });
      setGigs(mData.rows);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar (optional) */}
      {/* <FloatingNavbar navItems={navItems} /> */}

      <div className="flex-grow pt-2 pb-12 px-0 sm:pt-6 sm:pb-24 sm:px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Gig Marketplace
              </h1>
            </div>

            {/* Wallet button */}
            <div>
              {!connected ? (
                <>
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition"
                  >
                    Connect Wallet
                  </button>
                  <ManualWalletModal open={open} onClose={() => setOpen(false)} />
                </>
              ) : (
                <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition">
                  {publicKey?.toBase58().slice(0, 4)}...
                  {publicKey?.toBase58().slice(-4)}
                </button>
              )}
            </div>
          </div>

          {/* Gig Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full overflow-hidden">
            {gigs.map((gig, i) => (
              <div
                key={gig.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <GigCard {...gig} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {gigs.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              No gigs found.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Marketplace;
