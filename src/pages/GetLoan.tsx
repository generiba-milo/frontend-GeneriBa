import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import ManualWalletModal from './manualmodel';
import { handleSubmit } from './api';
import { Button } from "@/components/ui/button";
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";
import { toast } from 'sonner';


export default function GetLoan() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [nftData, setNftData] = useState<any[]>([]);
  const { publicKey, connected } = useWallet();
  const wallet = useWallet();



  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    try {
      const mData = await handleSubmit('sql', {
        query: 'SELECT * FROM payout WHERE uid = ?',
        params: [localStorage.getItem('id')],
      });
      setNftData(mData.rows || []);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
            Work History
          </h1>
          <div>
            {!connected ? (
              <>
                <button
                  onClick={() => setOpen(true)}
                  className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  <h1 className="font-display text-l font-bold">Connect Wallet</h1>
                </button>
                <ManualWalletModal open={open} onClose={() => setOpen(false)} />
              </>
            ) : (
              <button className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition">
                <h1 className="font-display text-l font-bold">
                  {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                </h1>
              </button>
            )}
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-12 animate-fade-in">
          <p className="text-lg text-muted-foreground">
            Instant credit based on your work history and reputation — no identity verification required.
          </p>
        </div>

        {/* NFT Scrollable Row */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4">
            {loading ? (
              <p>Loading NFTs...</p>
            ) : nftData.length === 0 ? (
              <p className="text-gray-400">No NFTs found.</p>
            ) : (
              nftData.map((nft: any, index: number) => (
                <div
                  key={index}
                  className="flex-none w-60 bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={'https://earn.generiba.ai/logo.png'}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="font-semibold text-lg truncate">
                      Gig Reward #{nft.gid}
                    </h2>
                    <p className="text-sm text-gray-400 truncate">
                      SOL {nft.payout}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-400">

                      </span>
                      {
                        nft.status == "Started" ?

                          <Button className="bg-purple-600 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={async () => {
                            if (!wallet?.connected || !wallet?.publicKey) {
                              console.log("⚠️ Wallet not connected.");
                              return;
                            }

                            try {
                              console.log("🔗 Connected wallet:", wallet.publicKey.toBase58());

                              const connection = new Connection("https://api.devnet.solana.com");

                              // 1️⃣ NFT mint address and recipient
                              const mint = new PublicKey(nft.nft_id);
                              const recipient = new PublicKey("4resgyMiKTYALdxfxLH869cf82RgsNEivwgfPabxjwCZ");

                              // 2️⃣ Get token accounts (ATAs)
                              const senderTokenAccount = await getAssociatedTokenAddress(mint, wallet.publicKey);
                              const recipientTokenAccount = await getAssociatedTokenAddress(mint, recipient);

                              // 3️⃣ Create the transfer instruction (NFTs have amount = 1)
                              const transferIx = createTransferInstruction(
                                senderTokenAccount,
                                recipientTokenAccount,
                                wallet.publicKey,
                                1
                              );

                              // 4️⃣ Create and send transaction
                              const transaction = new Transaction().add(transferIx);
                              const signature = await wallet.sendTransaction(transaction, connection);



                              await handleSubmit("transfer", {
                                amount: nft.payout * (20 / 100),
                                transfer: wallet.publicKey,
                              });


                              await handleSubmit("sql", {
                                "query": "UPDATE payout SET `status`='loaned' WHERE id = ?",
                                "params": [nft.id]
                              });

                              toast.success(signature);

                              console.log("📦 Tx Signature:", signature);
                            } catch (err) {
                              console.error("❌ Error sending NFT:", err);
                            }

                          }}>
                            Avail Instant SOL {nft.payout - nft.payout * (20 / 100)}
                          </Button> :
                          <Button className="bg-purple-600 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={async () => {

                          }}>
                            {nft.status}
                          </Button>

                      }

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
