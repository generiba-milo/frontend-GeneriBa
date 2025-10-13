import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Users, Zap, TrendingUp, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1">
              <Shield className="h-3 w-3 mr-2" />
              DAO-Powered • KYC-Free • Trustless
            </Badge>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Fair Work.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Open Future.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Decentralized gig marketplace. Earn in crypto. Build trust through DAO. No ID required.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 group">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet & Start
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  Browse Gigs
                </Button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$125K+</div>
                <div className="text-sm text-muted-foreground">Paid Out</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">IDs Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="font-display text-4xl font-bold">How GeneriBa Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the decentralized economy. Powered by community trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Stake for Trust",
                description: "Build reputation through DAO staking. No KYC, just on-chain proof.",
                color: "text-blue-400"
              },
              {
                icon: Zap,
                title: "Get Paid Instantly",
                description: "Escrow releases funds automatically. USDC, SOL, ETH supported.",
                color: "text-yellow-400"
              },
              {
                icon: Users,
                title: "Join Groups",
                description: "Team up for bigger gigs. Share rewards. Build together.",
                color: "text-green-400"
              },
              {
                icon: Award,
                title: "DAO Perks",
                description: "Vote on disputes. Lower fees. Get referral bonuses.",
                color: "text-purple-400"
              }
            ].map((feature, i) => (
              <Card 
                key={i}
                className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="font-display font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-display text-4xl font-bold">Start Earning in Minutes</h2>
            <p className="text-xl text-muted-foreground">
              Five simple steps to your first gig
            </p>
          </div>

          <div className="space-y-6">
            {[
              { step: "1", title: "Connect Your Wallet", desc: "Any Web3 wallet works. No signup forms." },
              { step: "2", title: "Browse Gigs", desc: "Filter by skills, crypto, payout, and trust level." },
              { step: "3", title: "Stake & Apply", desc: "Lock DAO tokens to show commitment." },
              { step: "4", title: "Complete Work", desc: "Deliver on time. Chat with clients. Hit milestones." },
              { step: "5", title: "Get Paid", desc: "Funds release instantly to your wallet. Build your trust score." }
            ].map((item, i) => (
              <div 
                key={i}
                className="flex gap-6 items-start p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center font-display font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-primary" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30">
              <Wallet className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Competitive Edge */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="p-8 md:p-12 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  Why GeneriBa?
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Better Than Traditional Platforms
                </h2>
                <div className="space-y-3">
                  {[
                    "Lowest fees in the industry (2% vs 20%)",
                    "No KYC, no documents, no delays",
                    "Community-governed dispute resolution",
                    "Instant crypto payouts, no waiting",
                    "Group gigs & team collaboration",
                    "Build trust through DAO, not ID"
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Card className="p-6 bg-card border-border">
                  <div className="text-sm text-muted-foreground mb-1">DAO Treasury</div>
                  <div className="text-3xl font-bold text-primary">$2.4M</div>
                  <div className="text-sm text-muted-foreground mt-2">Community-controlled</div>
                </Card>
                <Card className="p-6 bg-card border-border">
                  <div className="text-sm text-muted-foreground mb-1">Active Gigs</div>
                  <div className="text-3xl font-bold text-primary">347</div>
                  <div className="text-sm text-muted-foreground mt-2">Browse marketplace →</div>
                </Card>
                <Card className="p-6 bg-card border-border">
                  <div className="text-sm text-muted-foreground mb-1">Trust Score Average</div>
                  <div className="text-3xl font-bold text-primary">4.8/5</div>
                  <div className="text-sm text-muted-foreground mt-2">DAO-verified ratings</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
