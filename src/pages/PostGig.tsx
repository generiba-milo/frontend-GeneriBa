import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, DollarSign, Clock, Shield, Users,
  CheckCircle2, ArrowRight
} from "lucide-react";
import { useState } from "react";

const PostGig = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Plus className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">Post a Gig</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Find the perfect freelancer for your project
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { num: 1, label: "Details" },
                { num: 2, label: "Payment" },
                { num: 3, label: "Requirements" },
                { num: 4, label: "Review" }
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num 
                        ? "bg-primary text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground">{s.label}</span>
                  </div>
                  {i < 3 && (
                    <div className={`h-0.5 w-16 md:w-24 mx-2 ${
                      step > s.num ? "bg-primary" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-border bg-card">
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-display text-2xl font-bold">Gig Details</h2>
                    
                    <div>
                      <Label htmlFor="title">Gig Title*</Label>
                      <Input 
                        id="title"
                        placeholder="e.g., Build NFT Marketplace Landing Page"
                        className="bg-background border-border mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Be specific and descriptive
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description*</Label>
                      <Textarea 
                        id="description"
                        placeholder="Describe your project, requirements, and deliverables..."
                        className="bg-background border-border mt-1 min-h-[150px]"
                      />
                    </div>

                    <div>
                      <Label>Category*</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {[
                          "Development", "Design", "Marketing", "Writing",
                          "Smart Contracts", "Consulting", "Other"
                        ].map((cat) => (
                          <label 
                            key={cat}
                            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors"
                          >
                            <input type="radio" name="category" className="text-primary" />
                            <span className="text-sm">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Skills Required</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["React", "TypeScript", "Web3", "Tailwind"].map((skill) => (
                          <Badge 
                            key={skill}
                            className="bg-primary/20 text-primary border-primary/30"
                          >
                            {skill}
                            <button className="ml-2 hover:text-white">×</button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Input 
                          placeholder="Add a skill..."
                          className="bg-background border-border"
                        />
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-display text-2xl font-bold">Payment Details</h2>
                    
                    <div>
                      <Label htmlFor="budget">Budget*</Label>
                      <div className="flex gap-3 mt-1">
                        <Input 
                          id="budget"
                          type="number"
                          placeholder="500"
                          className="bg-background border-border"
                        />
                        <div>
                          <Label htmlFor="currency" className="sr-only">Currency</Label>
                          <select id="currency" aria-label="Currency" className="px-4 py-2 rounded-md bg-background border border-border">
                            <option>USDC</option>
                            <option>ETH</option>
                            <option>SOL</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Your Budget</span>
                        <span className="font-semibold">$500</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Platform Fee (2%)</span>
                        <span className="font-semibold">$10</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="font-semibold">Freelancer Receives</span>
                        <span className="font-semibold text-green-400">$490</span>
                      </div>
                    </div>

                    <div>
                      <Label>Escrow Type*</Label>
                      <div className="space-y-3 mt-2">
                        <label className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                          <input type="radio" name="escrow" className="mt-1 text-primary" defaultChecked />
                          <div>
                            <div className="font-semibold">Full Escrow</div>
                            <div className="text-xs text-muted-foreground">
                              100% locked until completion (recommended)
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                          <input type="radio" name="escrow" className="mt-1 text-primary" />
                          <div>
                            <div className="font-semibold">Milestone-Based</div>
                            <div className="text-xs text-muted-foreground">
                              Release payment per milestone
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-display text-2xl font-bold">Requirements & Settings</h2>
                    
                    <div>
                      <Label htmlFor="deadline">Deadline*</Label>
                      <Input 
                        id="deadline"
                        type="date"
                        className="bg-background border-border mt-1"
                      />
                    </div>

                    <div>
                      <Label>Minimum Trust Level</Label>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <label 
                            key={level}
                            className="flex-1 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors text-center"
                          >
                            <input type="radio" name="trust" className="sr-only" />
                            <Shield className="h-6 w-6 mx-auto mb-1 text-primary" />
                            <div className="text-sm font-semibold">Level {level}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Gig Type</Label>
                      <div className="space-y-3 mt-2">
                        <label className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                          <input type="radio" name="type" className="text-primary" defaultChecked />
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-semibold">Solo Freelancer</div>
                            <div className="text-xs text-muted-foreground">
                              Hire one person
                            </div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                          <input type="radio" name="type" className="text-primary" />
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">Team/Group</div>
                            <div className="text-xs text-muted-foreground">
                              Hire a whole team (recommended for complex projects)
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="attachments">Attachments (Optional)</Label>
                      <div className="mt-2 p-8 rounded-lg border-2 border-dashed border-border hover:border-primary/30 cursor-pointer transition-colors text-center">
                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload files or drag and drop
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-display text-2xl font-bold">Review Your Gig</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Title</div>
                        <div className="font-semibold">Build NFT Marketplace Landing Page</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Payment</div>
                        <div className="text-2xl font-bold text-primary">500 USDC</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <Clock className="h-5 w-5 text-primary mb-2" />
                          <div className="text-sm text-muted-foreground">Deadline</div>
                          <div className="font-semibold">7 days</div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                          <Shield className="h-5 w-5 text-primary mb-2" />
                          <div className="text-sm text-muted-foreground">Trust Level</div>
                          <div className="font-semibold">Level 2+</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
                        <div className="font-semibold mb-1">Ready to Post!</div>
                        <div className="text-sm text-muted-foreground">
                          Your gig will be visible to all freelancers immediately
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                  {step > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(step - 1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button 
                      onClick={() => setStep(step + 1)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Post Gig
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                <h3 className="font-semibold mb-4">Posting Tips</h3>
                <div className="space-y-3 text-sm">
                  {[
                    "Be specific about deliverables",
                    "Set realistic deadlines",
                    "Offer competitive rates",
                    "Require appropriate trust levels",
                    "Respond to questions quickly"
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border bg-card">
                <h3 className="font-semibold mb-4">
                  <DollarSign className="inline h-5 w-5 text-primary mr-2" />
                  Pricing Guide
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Simple Landing Page</span>
                    <span className="font-semibold">$300-600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smart Contract</span>
                    <span className="font-semibold">$1K-5K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full dApp</span>
                    <span className="font-semibold">$5K-20K</span>
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

export default PostGig;
