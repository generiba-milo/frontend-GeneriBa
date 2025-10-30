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
import { useEffect, useState } from "react";
import { handleSubmit } from "./api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  type Details = {
    name: string;
    des: string;
    location: string;
    website: string;
    skills: string[];
  };

  const [json, setJson] = useState<Details>({
    name: "",
    des: "",
    location: "",
    website: "",
    skills: [],
  });

  const [skill, setSkill] = useState("");
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJson((prev) => ({
      ...prev,
      [name]: value, // dynamically update key in JSON
    }));
  };



  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const mData = await handleSubmit("sql", {
      "query": "SELECT * FROM users WHERE id = ?",
      "params": [id]
    });

    setEmail(mData.rows[0].email)
    setJson(mData.rows[0].json == null ? {
      name: "",
      des: "",
      location: "",
      website: "",
      skills: [],
    } : mData.rows[0].json)
  }
  return (
    <div className="min-h-screen bg-background">

      <div className="pt-10 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          { }
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">Profile & Settings</h1>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            { }
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
                      {email}
                    </div>

                  </div>

                </div>
                { }

              </Card>
              { }
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
            { }
            <div className="lg:col-span-2">
              <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="info">Info</TabsTrigger>

                </TabsList>
                <TabsContent value="info" className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="font-display font-semibold text-xl mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nickname">Nickname (Optional)</Label>
                        <Input
                          id="nickname"
                          value={json.name}
                          name="name"
                         readOnly
                          placeholder="Your display name"
                          className="bg-background border-border mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={json.des}
                          name="des"
                          readOnly
                          placeholder="Tell others about your experience and specialties..."
                          className="bg-background border-border mt-1 min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location (Optional)</Label>
                        <Input
                          id="location"
                          name="location"
                          readOnly
                          value={json.location}
                          placeholder="City, Country"
                          className="bg-background border-border mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website / Portfolio</Label>
                        <Input
                          id="website"
                          name="website"
                         readOnly
                          value={json.website}
                          placeholder="https://yourportfolio.com"
                          className="bg-background border-border mt-1"
                        />
                      </div>

                      <Card className="p-6 border-border bg-card">
                        <h3 className="font-display font-semibold text-xl mb-4">Your Skills</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add skills to help clients find you for relevant gigs
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {json.skills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 cursor-pointer"
                            >
                              {skill}
                              <button className="ml-2 hover:text-white">×</button>
                            </Badge>
                          ))}
                        </div>
                        
                      </Card>
                      
                    </div>
                  </Card>
                </TabsContent>

              </Tabs>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default ViewProfile;
