import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Vote, TrendingUp, Users, Shield, Award, 
  CheckCircle2, XCircle, Clock, DollarSign 
} from "lucide-react";
const DAO = () => {
  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Vote className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">DAO Governance</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Community-driven decisions. Transparent voting. Shared ownership.
            </p>
          </div>
          {}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: DollarSign, label: "Treasury", value: "$2.4M", color: "text-green-400" },
              { icon: Users, label: "Active Members", value: "1,247", color: "text-blue-400" },
              { icon: Vote, label: "Active Proposals", value: "12", color: "text-purple-400" },
              { icon: Award, label: "Your Voting Power", value: "235", color: "text-yellow-400" }
            ].map((stat, i) => (
              <Card 
                key={i}
                className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mb-3`} />
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </Card>
            ))}
          </div>
          {}
          <div className="grid lg:grid-cols-3 gap-8">
            {}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold">Active Proposals</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Vote className="mr-2 h-4 w-4" />
                  Create Proposal
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Reduce Platform Fees for DAO Level 3+",
                    description: "Proposal to reduce fees from 2% to 0.5% for trusted members",
                    status: "active",
                    votesFor: 847,
                    votesAgainst: 123,
                    totalVotes: 970,
                    endTime: "2 days left",
                    proposer: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                  },
                  {
                    id: 2,
                    title: "Add Solana Network Support",
                    description: "Expand platform to support SOL payments and Solana-based gigs",
                    status: "active",
                    votesFor: 654,
                    votesAgainst: 234,
                    totalVotes: 888,
                    endTime: "5 days left",
                    proposer: "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
                  },
                  {
                    id: 3,
                    title: "Treasury Investment in DeFi Protocol",
                    description: "Invest 10% of treasury into yield-bearing protocol",
                    status: "active",
                    votesFor: 445,
                    votesAgainst: 556,
                    totalVotes: 1001,
                    endTime: "1 day left",
                    proposer: "0x1234567890abcdef1234567890abcdef12345678"
                  }
                ].map((proposal, i) => (
                  <Card 
                    key={proposal.id}
                    className="p-6 border-border bg-card hover:border-primary/30 transition-all animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            #{proposal.id}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {proposal.endTime}
                          </Badge>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2">
                          {proposal.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {proposal.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                              0x
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-mono">{proposal.proposer.substring(0, 10)}...</span>
                        </div>
                      </div>
                    </div>
                    {}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Support</span>
                        <span className="font-semibold">
                          {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={(proposal.votesFor / proposal.totalVotes) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-400" />
                          {proposal.votesFor} For
                        </span>
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-400" />
                          {proposal.votesAgainst} Against
                        </span>
                      </div>
                    </div>
                    {}
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Vote For
                      </Button>
                      <Button variant="outline" className="flex-1 border-red-400/30 hover:bg-red-500/10">
                        <XCircle className="mr-2 h-4 w-4" />
                        Vote Against
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {}
            <div className="space-y-6">
              {}
              <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                <h3 className="font-display font-semibold text-lg mb-4">Your DAO Stake</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">235 GB</div>
                    <div className="text-sm text-muted-foreground">Staked tokens</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voting Power</span>
                      <span className="font-semibold">0.19%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DAO Level</span>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Level 3
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rewards Earned</span>
                      <span className="font-semibold text-green-400">$124</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Stake More GB
                  </Button>
                  <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                    Unstake
                  </Button>
                </div>
              </Card>
              {}
              <Card className="p-6 border-border bg-card">
                <h3 className="font-display font-semibold text-lg mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div key={rank} className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold text-muted-foreground">
                        {rank}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          0x
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-mono text-xs">0x742d...0bEb</div>
                        <div className="text-xs text-muted-foreground">Level {6 - rank}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{1200 - rank * 150} GB</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              {}
              <Card className="p-6 border-border bg-card">
                <h3 className="font-display font-semibold text-lg mb-4">
                  <Shield className="inline h-5 w-5 mr-2 text-primary" />
                  Trust Delegation
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Delegate your trust score to help newcomers get started
                </p>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                  Delegate Trust
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DAO;
