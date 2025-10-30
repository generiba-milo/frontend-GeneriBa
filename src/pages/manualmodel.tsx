"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

type ManualWalletModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ManualWalletModal({ open, onClose }: ManualWalletModalProps) {
  const { select, wallets, connecting } = useWallet();

  if (!open) return null;

  // Filter wallets that are actually installed in the browser
  const installedWallets = wallets.filter((wallet) => wallet.readyState === "Installed");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-6 w-[350px] relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">Connect Wallet</h2>

        {/* Wallet Options */}
        <div className="space-y-3">
          {installedWallets.length > 0 ? (
            installedWallets.map((wallet) => (
              <button
                key={wallet.adapter.name}
                onClick={() => {
                  select(wallet.adapter.name);
                  onClose();
                }}
                disabled={connecting}
                className="w-full flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-xl py-2 px-4 disabled:opacity-50"
              >
                {wallet.adapter.icon && (
                  <img
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    className="w-6 h-6"
                  />
                )}
                <span className="flex-1 text-left">{wallet.adapter.name}</span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 text-center text-gray-400">
              <p>No wallets detected.</p>
              <a
                href="https://phantom.app/download"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm"
              >
                Install Phantom
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
