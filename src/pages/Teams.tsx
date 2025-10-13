import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, Shield, TrendingUp, Search, Plus,
  CheckCircle2, Clock, Award, MessageCircle
} from "lucide-react";
import { useState } from "react";

const MOCK_TEAMS = [
  {
    id: 1,
    name: "DeFi Builders",
    members: 8,
    trustLevel: 4,
    completedGigs: 24,
    activeGigs: 3,
    specialties: ["Solidity", "React", "DeFi"],
    description: "Specialized team for DeFi protocol development and auditing"
  },
  {
    id: 2,
    name: "NFT Creators Studio",
    members: 12,
    trustLevel: 5,
    completedGigs: 47,
    activeGigs: 5,
    specialties: ["Design", "Smart Contracts", "Marketing"],
    description: "Full-service NFT collection creation and launch"
  },
  {
    id: 3,
    name: "Web3 Wizards",
    members: 6,
    trustLevel: 3,
    completedGigs: 15,
    activeGigs: 2,
    specialties: ["Frontend", "Web3", "UI/UX"],
    description: "Modern dApp interfaces and wallet integrations"
  },
  {
    id: 4,
    name: "DAO Dev Squad",
    members: 10,
    trustLevel: 5,
    completedGigs: 31,
    activeGigs: 4,
    specialties: ["Governance", "Smart Contracts", "Backend"],
    description: "Building governance systems and DAO infrastructure"
  }
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="font-display text-4xl font-bold">Teams & Groups</h1>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </div>
            <p className="text-xl text-muted-foreground">
              Join forces. Take on bigger projects. Share rewards.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 animate-fade-in-up">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search teams by name or skills..."
                className="pl-10 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Users, label: "Active Teams", value: "84", color: "text-blue-400" },
              { icon: TrendingUp, label: "Group Gigs", value: "156", color: "text-green-400" },
              { icon: CheckCircle2, label: "Success Rate", value: "94%", color: "text-purple-400" },
              { icon: Award, label: "Top Team Reward", value: "$12K", color: "text-yellow-400" }
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

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_TEAMS.map((team, i) => (
              <Card 
                key={team.id}
                className="p-6 border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {team.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-display font-semibold text-xl">{team.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            <Shield className="h-3 w-3 mr-1" />
                            Level {team.trustLevel}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {team.members} members
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {team.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {team.specialties.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{team.completedGigs}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">{team.activeGigs}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">4.{8 - i}/5</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Users className="mr-2 h-4 w-4" />
                    Join Team
                  </Button>
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Why Join Teams Section */}
          <div className="mt-16">
            <Card className="p-8 md:p-12 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl font-bold mb-6">Why Join a Team?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Bigger Projects",
                      desc: "Access enterprise-level gigs that require multiple skills"
                    },
                    {
                      icon: Users,
                      title: "Shared Trust",
                      desc: "Pool reputation and DAO stake to unlock higher-paying work"
                    },
                    {
                      icon: CheckCircle2,
                      title: "Better Success",
                      desc: "Teams have 94% completion rate vs 78% for solo workers"
                    },
                    {
                      icon: Award,
                      title: "DAO Bonuses",
                      desc: "Group gigs earn extra DAO rewards and voting power"
                    }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                      <benefit.icon className="h-8 w-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-primary hover:bg-primary/90" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your Team
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Teams;
