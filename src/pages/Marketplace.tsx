import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import GigCard from "@/components/GigCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import { useState } from "react";

const MOCK_GIGS = [
  {
    id: "1",
    title: "Build NFT Marketplace Landing Page",
    description: "Looking for a React developer to build a modern landing page for an NFT marketplace. Must have experience with Web3 integration.",
    payout: "500",
    crypto: "USDC",
    poster: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    trustLevel: 3,
    skills: ["React", "Web3", "TypeScript", "Tailwind"],
    isGroup: false,
    deadline: "5 days"
  },
  {
    id: "2",
    title: "Smart Contract Audit",
    description: "Need experienced Solidity auditor for DeFi protocol. Must provide detailed report with vulnerability assessment.",
    payout: "2000",
    crypto: "ETH",
    poster: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    trustLevel: 5,
    skills: ["Solidity", "Security", "DeFi"],
    isGroup: false,
    deadline: "10 days"
  },
  {
    id: "3",
    title: "DAO Governance Dashboard",
    description: "Build a comprehensive governance dashboard for our DAO. Need to display proposals, voting, treasury stats.",
    payout: "1200",
    crypto: "SOL",
    poster: "0x1234567890abcdef1234567890abcdef12345678",
    trustLevel: 4,
    skills: ["React", "GraphQL", "DAO", "UI/UX"],
    isGroup: true,
    deadline: "2 weeks"
  },
  {
    id: "4",
    title: "Crypto Trading Bot Development",
    description: "Create automated trading bot for major DEXs. Must include backtesting and risk management features.",
    payout: "3500",
    crypto: "USDC",
    poster: "0xabcdef1234567890abcdef1234567890abcdef12",
    trustLevel: 5,
    skills: ["Python", "Trading", "APIs", "ML"],
    isGroup: false,
    deadline: "3 weeks"
  },
  {
    id: "5",
    title: "Write Web3 Technical Documentation",
    description: "Need technical writer to create comprehensive docs for our DeFi protocol. Experience with Solana required.",
    payout: "800",
    crypto: "SOL",
    poster: "0x9876543210fedcba9876543210fedcba98765432",
    trustLevel: 2,
    skills: ["Technical Writing", "DeFi", "Solana"],
    isGroup: false,
    deadline: "1 week"
  },
  {
    id: "6",
    title: "NFT Collection Design (50 Pieces)",
    description: "Design unique NFT collection with consistent theme. Need original artwork, no AI generation.",
    payout: "1500",
    crypto: "ETH",
    poster: "0xfedcba0987654321fedcba0987654321fedcba09",
    trustLevel: 4,
    skills: ["Design", "NFT", "Illustration", "Branding"],
    isGroup: true,
    deadline: "2 weeks"
  }
];

const SKILL_FILTERS = ["React", "Solidity", "Design", "Web3", "Python", "Writing", "DeFi", "DAO"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">Gig Marketplace</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Discover opportunities. Build your reputation. Earn in crypto.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4 animate-fade-in-up">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search gigs by title, skills, or description..."
                  className="pl-10 bg-card border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2">
              {SKILL_FILTERS.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedSkills.includes(skill) 
                      ? "bg-primary hover:bg-primary/90" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 animate-fade-in">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Active Gigs:</span>{" "}
                <span className="font-bold text-primary">347</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Payout:</span>{" "}
                <span className="font-bold text-primary">$125K+</span>
              </div>
              <div>
                <span className="text-muted-foreground">This Week:</span>{" "}
                <span className="font-bold text-primary">DAO Level 2+ = 0% Fees</span>
              </div>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_GIGS.map((gig, i) => (
              <div 
                key={gig.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <GigCard {...gig} />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
              Load More Gigs
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;
