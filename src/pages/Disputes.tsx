import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Shield, MessageCircle, Upload, CheckCircle2, Clock } from "lucide-react";

const Disputes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-yellow-400" />
              <h1 className="font-display text-4xl font-bold">Dispute Center</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Fair resolution through community arbitration
            </p>
          </div>

          {/* Active Disputes */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Your Disputes</h2>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                1 Active
              </Badge>
            </div>

            {/* Dispute Card */}
            <Card className="p-6 border-yellow-400/30 bg-card animate-fade-in-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                      In Arbitration
                    </Badge>
                    <Badge variant="outline">Case #1247</Badge>
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">
                    NFT Marketplace Landing Page
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dispute opened 2 days ago • Payout: 500 USDC
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h4 className="font-semibold mb-4">Case Timeline</h4>
                <div className="space-y-4">
                  {[
                    { status: "complete", title: "Dispute Filed", desc: "Claim: Incomplete deliverables", time: "2 days ago" },
                    { status: "complete", title: "Evidence Submitted", desc: "Both parties uploaded proof", time: "1 day ago" },
                    { status: "current", title: "DAO Review", desc: "3 arbitrators assigned", time: "In progress" },
                    { status: "pending", title: "Resolution", desc: "Awaiting decision", time: "Pending" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === "complete" ? "bg-primary" :
                          step.status === "current" ? "bg-yellow-500 animate-glow-pulse" :
                          "bg-muted"
                        }`}>
                          {step.status === "complete" && <CheckCircle2 className="h-4 w-4" />}
                          {step.status === "current" && <Clock className="h-4 w-4" />}
                          {step.status === "pending" && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        {i < 3 && (
                          <div className={`w-0.5 h-8 ${
                            step.status === "complete" ? "bg-primary" : "bg-border"
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h5 className="font-semibold">{step.title}</h5>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Section */}
              <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-primary" />
                  Evidence & Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>project-screenshots.zip</span>
                    <Badge variant="outline" className="text-xs">Uploaded</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background">
                    <span>communication-log.pdf</span>
                    <Badge variant="outline" className="text-xs">Uploaded</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 border-primary/30">
                  <Upload className="mr-2 h-4 w-4" />
                  Add More Evidence
                </Button>
              </div>

              {/* Chat/Messages */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Case Discussion
                </h4>
                <div className="space-y-3 mb-3">
                  {[
                    { user: "Arbitrator", message: "Please provide more details about the missing features.", time: "5h ago" },
                    { user: "You", message: "The navbar and wallet connection were not implemented as agreed.", time: "3h ago" }
                  ].map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {msg.user.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Textarea 
                  placeholder="Add a message to the case..."
                  className="mb-2 bg-background border-border"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Send Message
                </Button>
              </div>

              {/* Arbitrators */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Assigned Arbitrators (3)
                </h4>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        A{i}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    DAO Level 5 members reviewing your case
                  </span>
                </div>
              </div>
            </Card>

            {/* Past Disputes */}
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold mb-6">Past Cases</h2>
              <div className="space-y-4">
                {[
                  {
                    id: 1143,
                    title: "Smart Contract Audit",
                    status: "Resolved - Freelancer Favor",
                    payout: "800 USDC",
                    date: "Feb 15, 2025"
                  },
                  {
                    id: 1089,
                    title: "Logo Design Project",
                    status: "Resolved - Client Favor",
                    payout: "250 USDC",
                    date: "Jan 28, 2025"
                  }
                ].map((dispute, i) => (
                  <Card 
                    key={i}
                    className="p-4 border-border bg-card hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Case #{dispute.id}</Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                            Resolved
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{dispute.title}</h3>
                        <p className="text-sm text-muted-foreground">{dispute.status}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{dispute.payout}</div>
                        <div className="text-xs text-muted-foreground">{dispute.date}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Disputes;
