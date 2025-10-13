import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-display text-xl font-bold">GeneriBa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/dao" className="text-sm font-medium hover:text-primary transition-colors">
              DAO
            </Link>
            <Link to="/teams" className="text-sm font-medium hover:text-primary transition-colors">
              Teams
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            <Link to="/marketplace" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/dao" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              DAO
            </Link>
            <Link to="/teams" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Teams
            </Link>
            <Link to="/dashboard" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
