import { useState, useEffect } from 'react';
import { Plus, Briefcase, Clock, CheckCircle, Eye, Edit, Trash2, ChevronRight, X, Youtube, Sparkles, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleSubmit } from "./api";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { MatchResult } from '@/utils/aiMatching';
import { Link } from 'react-router-dom';
import Loading from './loading';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import ManualWalletModal from './manualmodel';

interface Job {
  id: string;
  title: string;
  description: string;
  payout: string;
  crypto: string;
  poster: string;
  trustLevel: number;
  skills: string;
  isGroup: boolean;
  deadline: string;
}
const CATEGORIES = [
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Video & Animation',
  'Music & Audio',
  'Business',
  'Data',
  'AI Services'
];
const DURATION_OPTIONS = [
  { value: '1-7', label: '1-7 days' },
  { value: '8-14', label: '1-2 weeks' },
  { value: '15-30', label: '2-4 weeks' },
  { value: '30+', label: '1+ months' }
];
export default function CreateJob() {
  const [view, setView] = useState<'dashboard' | 'create'>('dashboard');
  const [step, setStep] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const [matchedCandidates, setMatchedCandidates] = useState<MatchResult[]>([]);
  const { publicKey, sendTransaction } = useWallet();
  const [showMatchesModal, setShowMatchesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connected, disconnect } = useWallet();
  const [open, setOpen] = useState(false);

  const dataFetch = async (data) => {
    const mData = await handleSubmit("sql", {
      "query": "INSERT INTO gigs (uid, title, description, payout, crypto, poster, trustLevel, skills,  deadline,sign) VALUES (?,?,?,?,?,?,?,?,?,?)",
      "params": data
    });

    console.log(mData)
  }

  useEffect(() => {
    dataFetch2();
  }, []);

  const dataFetch2 = async () => {
    const mData = await handleSubmit("sql", {
      "query": "SELECT * FROM gigs WHERE uid = ?",
      "params": [localStorage.getItem("id")]
    });
    setJobs(mData.rows);
    setLoading(false);
  }
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    requirements: [] as string[],
    budget: '',
    duration: '',
    deadline: '',
    skills: [] as string[],
    videoUrl: '',
    attachments: [] as File[]
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  };


  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };


  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.budget;
      case 2:
        return formData.description
      case 3:
        return formData.duration && formData.skills.length > 0;
      default:
        return true;
    }
  };
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };
  const handleSubmit2 = async () => {
    setLoading(true);
    try {
      if (!publicKey) {
        alert("Connect your wallet first!");
        return;
      }

      try {
        setLoading(true);

        const recipient = new PublicKey("4resgyMiKTYALdxfxLH869cf82RgsNEivwgfPabxjwCZ");
        const amount = Number(formData.budget) * 1e9; // 0.01 SOL in lamports

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: amount,
          })
        );

        const signature = await sendTransaction(transaction, connection);
        const latestBlockhash = await connection.getLatestBlockhash();

        await connection.confirmTransaction(
          {
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          },
          "processed"
        );


        toast.success(signature)
        dataFetch([localStorage.getItem("id"), formData.title, formData.description, formData.budget, "SOL", "", 3, formData.skills.join(","), formData.duration,signature])
        // setJobs([...jobs, { ...newJob, applicants: 0, createdAt: new Date().toISOString() }]);
        setView('dashboard');
        setStep(1);
      } catch (err) {
        console.error(err);
        alert("Payment failed!");
      } finally {
        setLoading(false);
      }


    } catch (error: any) {
      toast.error(error.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          { }
          <div className="mb-12 animate-fade-in">


            <div className="mb-8 flex items-center justify-between gap-4 animate-fade-in">

              <h1 className="font-display text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
                Your Jobs
              </h1>

              <div>
                {!connected ? (
                  <>
                    <button
                      onClick={() => setOpen(true)}
                      className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      <h1 className="font-display text-l font-bold">Connect Wallet</h1>
                    </button>
                    <ManualWalletModal open={open} onClose={() => setOpen(false)} />
                  </>
                ) : (
                  <button
                    className="bg-white text-black px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    <h1 className="font-display text-l font-bold">
                      {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                    </h1>
                  </button>
                )}
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Manage your posted jobs and track applications
            </p>
            <Button
              onClick={() => {
                if (connected) {
                  setView('create')
                } else {
                  toast.error('Connect Wallet First', {
                    description: `You can't create a gig until your wallet is connected`
                  });
                }
              }

              }
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
          { }
          <div className="grid md:grid-cols-4 gap-6 mb-8">

          </div>
          { }
          <Tabs defaultValue="all" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>

            <TabsContent value="all" className="space-y-4">
              {jobs.map((job, i) => (
                <Card
                  key={job.id}
                  className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>

                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />

                        </span>
                        <span className="flex items-center gap-1">

                          SOL {job.payout.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.deadline.toLocaleString()} Days
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">

                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/gig/${job.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>


                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

          </Tabs>
        </div>

      </div>
    );
  }
  return (

    loading ?
      <Loading /> :

      <div className="min-h-screen bg-black text-white">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          { }
          <div className="mb-12 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => setView('dashboard')}
              className="mb-4 hover:bg-card"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
              Post a New Job
            </h1>
            <p className="text-lg text-muted-foreground">
              Find the perfect freelancer for your project
            </p>
          </div>
          { }
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${s === step
                      ? 'border-primary bg-primary text-white'
                      : s < step
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-border bg-card text-muted-foreground'
                      }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-0.5 w-16 md:w-32 mx-2 transition-all ${s < step ? 'bg-green-500' : 'bg-border'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">Basics</span>
              <span className="text-xs text-muted-foreground">Details</span>
              <span className="text-xs text-muted-foreground">Preferences</span>
              <span className="text-xs text-muted-foreground">Review</span>
            </div>
          </div>
          { }
          {step === 1 && (
            <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Job Basics</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Build a responsive website with React"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget (SOL) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-purple-600">
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}
          { }
          {step === 2 && (
            <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Job Details</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-2 min-h-[150px]"
                  />
                </div>


              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-purple-600">
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}
          { }
          {step === 3 && (
            <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Preferences</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="duration">Expected Duration *</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Required Skills *</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button onClick={addSkill} type="button">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1">
                        {skill}
                        <X
                          className="w-3 h-3 ml-2 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-gradient-to-r from-primary to-purple-600">
                  Review
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}
          { }
          {step === 4 && (
            <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Review Your Job</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">

                    <span>SOL {formData.budget}</span>
                    <span>{DURATION_OPTIONS.find(d => d.value === formData.duration)?.label}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{formData.description}</p>
                </div>
                {formData.videoUrl && (
                  <div>
                    <h4 className="font-semibold mb-2">Project Video</h4>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Youtube className="w-4 h-4" />
                      <span className="truncate">{formData.videoUrl}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                {formData.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Attachments</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {formData.attachments.map((file, i) => (
                        <div key={i}>• {file.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit2}
                  disabled={loading}
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  {loading ? 'Posting...' : 'Post Job'}
                </Button>
              </div>
            </Card>
          )}
        </div>
        { }
        <Dialog open={showMatchesModal} onOpenChange={setShowMatchesModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Top Matched Candidates
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 mt-4">
              {matchedCandidates.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No matched candidates found yet. Check back later!
                </p>
              ) : (
                matchedCandidates.map((match) => (
                  <Card key={match.candidateId} className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{match.candidateName}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={match.matchScore >= 80 ? "default" : "secondary"} className="bg-gradient-to-r from-primary to-purple-600">
                            {match.matchScore >= 90 ? '🏆 Excellent Match' : match.matchScore >= 80 ? '⭐ Great Match' : '✓ Good Match'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Score: {match.matchScore}/100
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{match.matchScore}</div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          Why this candidate matches:
                        </h4>
                        <ul className="space-y-1.5">
                          {match.matchReasons.map((reason, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Recommended Rate: </span>
                          <span className="font-semibold text-lg text-primary">${match.recommendedRate}/hr</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowMatchesModal(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
  );
}
