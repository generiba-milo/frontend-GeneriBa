import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Shield, Star, Award, Edit2, 
  CheckCircle2, Clock, DollarSign, Users,
  Wallet, Settings
} from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">Profile & Settings</h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="space-y-6">
              <Card className="p-6 border-border bg-card">
                <div className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                      0x
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-mono text-sm text-muted-foreground mb-2">
                      0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Shield className="h-3 w-3 mr-1" />
                        Level 3
                      </Badge>
                      <Badge variant="outline">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        DAO Member
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Avatar
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trust Score</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed Gigs</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-semibold text-green-400">$3,240</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-green-400">96%</span>
                  </div>
                </div>
              </Card>

              {/* Badges */}
              <Card className="p-6 border-border bg-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: CheckCircle2, label: "Reliable", color: "text-green-400" },
                    { icon: Clock, label: "Fast", color: "text-blue-400" },
                    { icon: Star, label: "Top Rated", color: "text-yellow-400" },
                    { icon: Users, label: "Team Player", color: "text-purple-400" },
                    { icon: Shield, label: "Trusted", color: "text-primary" },
                    { icon: DollarSign, label: "High Earner", color: "text-green-400" }
                  ].map((badge, i) => (
                    <div 
                      key={i}
                      className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <badge.icon className={`h-6 w-6 ${badge.color} mb-1`} />
                      <span className="text-xs text-center">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nickname">Nickname (Optional)</Label>
                        <Input 
                          id="nickname"
                          placeholder="Your display name"
                          className="bg-background border-border mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          placeholder="Tell others about your experience and specialties..."
                          className="bg-background border-border mt-1 min-h-[100px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Location (Optional)</Label>
                        <Input 
                          id="location"
                          placeholder="City, Country"
                          className="bg-background border-border mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="website">Website / Portfolio</Label>
                        <Input 
                          id="website"
                          placeholder="https://yourportfolio.com"
                          className="bg-background border-border mt-1"
                        />
                      </div>

                      <Button className="bg-primary hover:bg-primary/90">
                        Save Changes
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-4">Your Skills</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add skills to help clients find you for relevant gigs
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        "React", "TypeScript", "Solidity", "Web3", "UI/UX",
                        "Smart Contracts", "DeFi", "Node.js", "Python"
                      ].map((skill) => (
                        <Badge 
                          key={skill}
                          className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 cursor-pointer"
                        >
                          {skill}
                          <button className="ml-2 hover:text-white">×</button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input 
                        placeholder="Add a new skill..."
                        className="bg-background border-border"
                      />
                      <Button className="bg-primary hover:bg-primary/90">
                        Add
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-6">Client Reviews</h3>
                    <div className="space-y-4">
                      {[
                        {
                          client: "0x8ba1f109...DBA72",
                          rating: 5,
                          comment: "Excellent work! Delivered ahead of schedule and communication was top-notch.",
                          gig: "NFT Marketplace Landing",
                          date: "Mar 10, 2025"
                        },
                        {
                          client: "0x1234567...45678",
                          rating: 5,
                          comment: "Very professional and knowledgeable. Will hire again!",
                          gig: "Smart Contract Audit",
                          date: "Mar 5, 2025"
                        },
                        {
                          client: "0xabcdef1...cdef12",
                          rating: 4,
                          comment: "Good work overall. Minor revisions needed but handled well.",
                          gig: "DAO Dashboard",
                          date: "Feb 28, 2025"
                        }
                      ].map((review, i) => (
                        <div 
                          key={i}
                          className="p-4 rounded-lg bg-muted/50 border border-border"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                  0x
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-mono text-xs">{review.client}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm mb-2">{review.comment}</p>
                          <div className="text-xs text-muted-foreground">
                            Gig: {review.gig}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      Wallet Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Connected Wallet</Label>
                        <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border flex items-center justify-between">
                          <span className="font-mono text-sm">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</span>
                          <Button size="sm" variant="outline">
                            Disconnect
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Preferred Payment Method</Label>
                        <div className="mt-2 space-y-2">
                          {["USDC", "ETH", "SOL"].map((crypto) => (
                            <label 
                              key={crypto}
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors"
                            >
                              <input type="radio" name="payment" className="text-primary" />
                              <span className="font-semibold">{crypto}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Privacy Settings
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Show profile in search", checked: true },
                        { label: "Allow direct messages", checked: true },
                        { label: "Show completed gig count", checked: true },
                        { label: "Show earnings publicly", checked: false }
                      ].map((setting, i) => (
                        <label 
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors"
                        >
                          <span>{setting.label}</span>
                          <input 
                            type="checkbox" 
                            defaultChecked={setting.checked}
                            className="h-4 w-4"
                          />
                        </label>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
