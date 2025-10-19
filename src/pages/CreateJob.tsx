import { useState, useEffect } from 'react';
import { Plus, Briefcase, Clock, DollarSign, CheckCircle, XCircle, Eye, Edit, Trash2, ChevronRight, Upload, X, Youtube, Sparkles, Star } from 'lucide-react';
import { FloatingNavbar } from '@/components/aceternity/FloatingNavbar';
import { navItems } from '@/components/navItems';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { jobService } from '@/services/job.service';
import type { MatchResult } from '@/utils/aiMatching';
interface Job {
  id: string;
  title: string;
  category: string;
  budget: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  applicants: number;
  createdAt: string;
  deadline?: string;
}
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Full-Stack Web App Development',
    category: 'Development',
    budget: 5000,
    status: 'open',
    applicants: 12,
    createdAt: '2024-01-15',
    deadline: '2024-03-01'
  },
  {
    id: '2',
    title: 'Brand Identity Design',
    category: 'Design',
    budget: 2500,
    status: 'in_progress',
    applicants: 8,
    createdAt: '2024-01-10',
    deadline: '2024-02-15'
  },
  {
    id: '3',
    title: 'SEO Optimization Campaign',
    category: 'Marketing',
    budget: 1500,
    status: 'completed',
    applicants: 5,
    createdAt: '2023-12-20',
    deadline: '2024-01-20'
  }
];
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
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [loading, setLoading] = useState(false);
  const [matchedCandidates, setMatchedCandidates] = useState<MatchResult[]>([]);
  const [showMatchesModal, setShowMatchesModal] = useState(false);
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
  const [currentRequirement, setCurrentRequirement] = useState('');
  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'text-blue-400' },
    { label: 'Open Jobs', value: jobs.filter(j => j.status === 'open').length, icon: Clock, color: 'text-green-400' },
    { label: 'In Progress', value: jobs.filter(j => j.status === 'in_progress').length, icon: Edit, color: 'text-yellow-400' },
    { label: 'Completed', value: jobs.filter(j => j.status === 'completed').length, icon: CheckCircle, color: 'text-purple-400' }
  ];
  const getStatusColor = (status: Job['status']) => {
    const colors = {
      open: 'bg-green-500/10 text-green-400 border-green-500/20',
      in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[status];
  };
  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] });
      setCurrentSkill('');
    }
  };
  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };
  const addRequirement = () => {
    if (currentRequirement.trim() && !formData.requirements.includes(currentRequirement.trim())) {
      setFormData({ ...formData, requirements: [...formData.requirements, currentRequirement.trim()] });
      setCurrentRequirement('');
    }
  };
  const removeRequirement = (req: string) => {
    setFormData({ ...formData, requirements: formData.requirements.filter(r => r !== req) });
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
    }
  };
  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };
  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.budget;
      case 2:
        return formData.description && formData.requirements.length > 0;
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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newJob = await jobService.create({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements,
        budget: parseFloat(formData.budget),
        duration: formData.duration,
        deadline: formData.deadline,
        skills: formData.skills,
        videoUrl: formData.videoUrl,
        attachments: formData.attachments.map(f => f.name),
        status: 'open'
      });
      try {
        const jobWithMatches = await jobService.getMatchedCandidates(newJob.id);
        const matches: MatchResult[] = (jobWithMatches.matchedCandidates || []).map(candidate => ({
          candidateId: candidate.userId,
          candidateName: candidate.userName,
          matchScore: candidate.matchScore,
          matchReasons: [
            `Skills match: ${candidate.skills.join(', ')}`,
            `Match score: ${candidate.matchScore}/100`
          ],
          recommendedRate: Math.round((newJob.budget / 160) * 10) / 10 // Estimate based on budget
        }));
        setMatchedCandidates(matches);
        toast.success(`✅ Job posted! Found ${matches.length} matching candidates`);
        if (matches.length > 0) {
          setShowMatchesModal(true);
        }
      } catch (matchError) {
        console.error('Failed to get matches:', matchError);
        toast.success('Job posted successfully!');
      }
      setView('dashboard');
      setStep(1);
      setFormData({
        title: '',
        category: '',
        description: '',
        requirements: [],
        budget: '',
        duration: '',
        deadline: '',
        skills: [],
        videoUrl: '',
        attachments: []
      });
      setJobs([...jobs, { ...newJob, applicants: 0, createdAt: new Date().toISOString() }]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };
  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-white">
        <FloatingNavbar navItems={navItems} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {}
          <div className="mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
              Your Jobs
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Manage your posted jobs and track applications
            </p>
            <Button
              onClick={() => setView('create')}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
          {}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card
                key={stat.label}
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
          <Tabs defaultValue="all" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <TabsList className="bg-card border border-border mb-6">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
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
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${job.budget.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            {['open', 'in_progress', 'completed'].map(status => (
              <TabsContent key={status} value={status} className="space-y-4">
                {jobs
                  .filter(job => job.status === status)
                  .map((job, i) => (
                    <Card
                      key={job.id}
                      className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${job.budget.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar navItems={navItems} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {}
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
        {}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    s === step
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
                    className={`h-0.5 w-16 md:w-32 mx-2 transition-all ${
                      s < step ? 'bg-green-500' : 'bg-border'
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
        {}
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
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget (USD) *</Label>
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
        {}
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
              <div>
                <Label htmlFor="videoUrl">Project Video (YouTube URL)</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="mt-2"
                />
                {formData.videoUrl && extractYouTubeId(formData.videoUrl) && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-border">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoUrl)}`}
                      title="Project Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
              <div>
                <Label>Requirements *</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="Add a requirement..."
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button onClick={addRequirement} type="button">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.requirements.map((req, i) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1">
                      {req}
                      <X
                        className="w-3 h-3 ml-2 cursor-pointer"
                        onClick={() => removeRequirement(req)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="attachments">Attachments</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 mr-2" />
                    <span>Upload files</span>
                    <input
                      id="attachments"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {formData.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.attachments.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-card rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <X
                            className="w-4 h-4 cursor-pointer text-red-400"
                            onClick={() => removeFile(i)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
        {}
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
                <Label htmlFor="deadline">Deadline (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="mt-2"
                />
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
        {}
        {step === 4 && (
          <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Review Your Job</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{formData.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline">{formData.category}</Badge>
                  <span>${formData.budget}</span>
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
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {formData.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
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
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
            </div>
          </Card>
        )}
      </div>
      {}
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
      <Footer />
    </div>
  );
}
