"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar (drawer style) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar Drawer */}
          <div className="relative w-64 bg-white shadow-lg z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 relative z-0">
        {/* Top bar for mobile */}
        <div className="flex items-center p-4 border-b bg-black md:hidden shadow-sm">
          <Button
            variant="ghost"
           
            size="icon"
            onClick={() => setSidebarOpen(true)}

          >
            <Menu className="h-6 w-6" size={50}  color="white" />
          </Button>
          <div className="flex items-center p-4 border-gray-700">
           
              <img
                src={"/logo.png"} // 👉 replace this with your actual logo path
                alt="GeneriBa Logo"
                className="w-10 h-10 object-contain"
              />
           
            <h1 className={`font-bold text-xl`}>GeneriBa</h1>

          </div>
         
        </div>

        <main className="flex-1 overflow-y-auto md:p-0">{children}</main>
      </div>

      {/* Wallet modal fix layer */}
      <div id="wallet-modal-root" className="z-[9999] fixed inset-0 pointer-events-none" />
    </div>
  );
}
