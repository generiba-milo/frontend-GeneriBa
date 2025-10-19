import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, Wallet, TrendingUp, Clock, 
  CheckCircle2, AlertCircle, DollarSign, Users,
  Gift, Bell, Shield, Copy
} from "lucide-react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <h1 className="font-display text-4xl font-bold">My Studio</h1>
              </div>
              <Link to="/post-gig">
                <Button className="bg-primary hover:bg-primary/90">
                  Post a Gig
                </Button>
              </Link>
            </div>
          </div>
          {}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: DollarSign, label: "Total Earned", value: "$3,240", color: "text-green-400" },
              { icon: Clock, label: "Active Gigs", value: "3", color: "text-blue-400" },
              { icon: CheckCircle2, label: "Completed", value: "24", color: "text-purple-400" },
              { icon: Shield, label: "Trust Level", value: "3", color: "text-yellow-400" }
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
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="space-y-6">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="active">Active Gigs</TabsTrigger>
                  <TabsTrigger value="payouts">Payouts</TabsTrigger>
                  <TabsTrigger value="staking">Staking</TabsTrigger>
                  <TabsTrigger value="referrals">Referrals</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  {[
                    {
                      title: "Build NFT Marketplace Landing",
                      client: "0x742d35Cc...0bEb",
                      payout: "500 USDC",
                      progress: 65,
                      status: "in-progress",
                      deadline: "3 days"
                    },
                    {
                      title: "DAO Governance Dashboard",
                      client: "0x8ba1f109...DBA72",
                      payout: "1200 SOL",
                      progress: 30,
                      status: "in-progress",
                      deadline: "10 days"
                    },
                    {
                      title: "Smart Contract Review",
                      client: "0x1234567...45678",
                      payout: "800 USDC",
                      progress: 90,
                      status: "review",
                      deadline: "1 day"
                    }
                  ].map((gig, i) => (
                    <Card 
                      key={i}
                      className="p-6 border-border bg-card hover:border-primary/30 transition-all animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg mb-2">
                            {gig.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                                0x
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-mono">{gig.client}</span>
                          </div>
                        </div>
                        <Badge className={
                          gig.status === "in-progress" 
                            ? "bg-blue-500/20 text-blue-400" 
                            : "bg-yellow-500/20 text-yellow-400"
                        }>
                          {gig.status === "in-progress" ? "In Progress" : "In Review"}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{gig.progress}%</span>
                        </div>
                        <Progress value={gig.progress} className="h-2" />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {gig.deadline} left
                            </span>
                            <span className="font-semibold text-primary">{gig.payout}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-primary/30">
                              View
                            </Button>
                            {gig.status === "review" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                Submit Final
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="payouts" className="space-y-4">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-lg mb-4">Payment History</h3>
                    <div className="space-y-3">
                      {[
                        { date: "Mar 10, 2025", amount: "$650", crypto: "USDC", gig: "Mobile App UI Design" },
                        { date: "Mar 5, 2025", amount: "$1,200", crypto: "ETH", gig: "Smart Contract Audit" },
                        { date: "Feb 28, 2025", amount: "$890", crypto: "SOL", gig: "Landing Page Dev" },
                        { date: "Feb 20, 2025", amount: "$500", crypto: "USDC", gig: "Technical Documentation" }
                      ].map((payment, i) => (
                        <div 
                          key={i} 
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div>
                            <div className="font-semibold">{payment.gig}</div>
                            <div className="text-xs text-muted-foreground">{payment.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-400">{payment.amount}</div>
                            <div className="text-xs text-muted-foreground">{payment.crypto}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="staking" className="space-y-4">
                  <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                    <h3 className="font-display font-semibold text-lg mb-4">DAO Staking</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="text-4xl font-bold text-primary mb-2">235 GB</div>
                        <div className="text-sm text-muted-foreground">Currently Staked</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lock Period</span>
                          <span className="font-semibold">45 days remaining</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Estimated Rewards</span>
                          <span className="font-semibold text-green-400">+12 GB (~$24)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">APY</span>
                          <span className="font-semibold">18.5%</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-primary hover:bg-primary/90">
                          Stake More
                        </Button>
                        <Button variant="outline" className="flex-1 border-primary/30">
                          Claim Rewards
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="referrals" className="space-y-4">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-lg mb-4">
                      <Gift className="inline h-5 w-5 mr-2 text-primary" />
                      Referral Program
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Earn 5% of platform fees from users you refer
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">generiba.app/ref/YourCode123</span>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">12</div>
                          <div className="text-sm text-muted-foreground">Referrals</div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-green-400">$156</div>
                          <div className="text-sm text-muted-foreground">Earned</div>
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Withdraw Rewards
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {}
            <div className="space-y-6">
              {}
              <Card className="p-6 border-border bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/20 text-primary text-xl">
                      0x
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-mono text-sm mb-1">0x742d35Cc...0bEb</div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Shield className="h-3 w-3 mr-1" />
                        Level 3
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trust Score</span>
                    <span className="font-semibold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed Gigs</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-green-400">96%</span>
                  </div>
                </div>
                <Link to="/profile">
                  <Button variant="outline" className="w-full mt-4 border-primary/30 hover:bg-primary/10">
                    View Profile
                  </Button>
                </Link>
              </Card>
              {}
              <Card className="p-6 border-border bg-card">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/marketplace">
                    <Button variant="outline" className="w-full justify-start border-border hover:bg-muted">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Browse Gigs
                    </Button>
                  </Link>
                  <Link to="/teams">
                    <Button variant="outline" className="w-full justify-start border-border hover:bg-muted">
                      <Users className="mr-2 h-4 w-4" />
                      Find Teams
                    </Button>
                  </Link>
                  <Link to="/dao">
                    <Button variant="outline" className="w-full justify-start border-border hover:bg-muted">
                      <Wallet className="mr-2 h-4 w-4" />
                      DAO Voting
                    </Button>
                  </Link>
                </div>
              </Card>
              {}
              <Card className="p-6 border-border bg-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { text: "New gig offer: Mobile App Design", time: "2h ago", type: "offer" },
                    { text: "Payment received: 500 USDC", time: "5h ago", type: "payment" },
                    { text: "DAO proposal #12 is live", time: "1d ago", type: "dao" }
                  ].map((notif, i) => (
                    <div key={i} className="text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="font-medium">{notif.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notif.time}</div>
                    </div>
                  ))}
                </div>
                <Link to="/notifications">
                  <Button variant="outline" className="w-full mt-4 border-primary/30 hover:bg-primary/10">
                    View All
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
