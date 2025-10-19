import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Clock, Users, DollarSign, Star, MessageCircle, 
  CheckCircle2, AlertCircle, TrendingUp 
} from "lucide-react";
import { useParams } from "react-router-dom";
const GigDetail = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Shield className="h-3 w-3 mr-1" />
                Trust Level 3
              </Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Web3</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
            <h1 className="font-display text-4xl font-bold">
              Build NFT Marketplace Landing Page
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 days left</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Solo Gig</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>8 applications</span>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {}
            <div className="lg:col-span-2 space-y-6">
              {}
              <Tabs defaultValue="description" className="animate-fade-in-up">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-display font-semibold text-xl mb-4">Project Details</h2>
                    <div className="prose prose-invert max-w-none space-y-4">
                      <p className="text-muted-foreground">
                        Looking for an experienced React developer to build a modern, responsive landing page 
                        for an NFT marketplace. The design should be clean, professional, and optimized for Web3 users.
                      </p>
                      <h3 className="font-semibold text-lg mt-6">Requirements</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Experience with React and TypeScript</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Knowledge of Web3 wallet integration (MetaMask, WalletConnect)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Responsive design with Tailwind CSS</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Clean, maintainable code with documentation</span>
                        </li>
                      </ul>
                      <h3 className="font-semibold text-lg mt-6">Deliverables</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Fully responsive landing page</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Web3 wallet connection functionality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Source code on GitHub</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>Basic documentation</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="timeline" className="space-y-4">
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-display font-semibold text-xl mb-6">Project Timeline</h2>
                    <div className="space-y-6">
                      {[
                        { status: "complete", title: "Gig Posted", desc: "Project listed on marketplace", time: "2 days ago" },
                        { status: "complete", title: "Applications Open", desc: "Accepting proposals from developers", time: "2 days ago" },
                        { status: "current", title: "Review Phase", desc: "Client reviewing applications", time: "In progress" },
                        { status: "pending", title: "Work Begins", desc: "Selected developer starts work", time: "Pending" },
                        { status: "pending", title: "Delivery", desc: "Final deliverables submitted", time: "In 5 days" }
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.status === "complete" ? "bg-primary" :
                              step.status === "current" ? "bg-primary/50 animate-glow-pulse" :
                              "bg-muted"
                            }`}>
                              {step.status === "complete" && <CheckCircle2 className="h-5 w-5" />}
                              {step.status === "current" && <Clock className="h-5 w-5" />}
                              {step.status === "pending" && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                            </div>
                            {i < 4 && (
                              <div className={`w-0.5 h-12 ${
                                step.status === "complete" ? "bg-primary" : "bg-border"
                              }`} />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                            <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews">
                  <Card className="p-6 border-border bg-card">
                    <h2 className="font-display font-semibold text-xl mb-4">Client Reviews</h2>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-border pb-4 last:border-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                0x
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-mono text-sm">0x742d...0bEb</div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Great work! Delivered on time and communication was excellent throughout the project.
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {}
            <div className="space-y-6">
              {}
              <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Payout</div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <span className="text-4xl font-bold text-primary">500</span>
                      <span className="text-muted-foreground">USDC</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Escrow Status</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        Funded
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform Fee</span>
                      <span>2% ($10)</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>You Receive</span>
                      <span className="text-primary">$490</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" size="lg">
                    Apply for Gig
                  </Button>
                  <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Ask Question
                  </Button>
                </div>
              </Card>
              {}
              <Card className="p-6 border-border bg-card animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <h3 className="font-semibold mb-4">Posted By</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        0x
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-mono text-sm">0x742d...0bEb</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>4.9/5.0 (12 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trust Level</span>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Level 3
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gigs Posted</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DAO Member</span>
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default GigDetail;
