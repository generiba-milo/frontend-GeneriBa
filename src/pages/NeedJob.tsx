import { useState, useEffect } from 'react';
import { Search, Briefcase, DollarSign, Users, TrendingUp, ChevronLeft, ChevronRight, Sparkles, Target } from 'lucide-react';
import { FloatingNavbar } from '@/components/aceternity/FloatingNavbar';
import { navItems } from '@/components/navItems';
import Footer from '@/components/Footer';
import GigCard from '@/components/GigCard';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { jobService } from '@/services/job.service';
import type { Job } from '@/services/job.service';
import { HeroHighlight } from '@/components/aceternity/HeroHighlight';
import { CardSpotlight } from '@/components/aceternity/CardSpotlight';
import { calculateMatchScore } from '@/utils/aiMatching';
import { useAuth } from '@/contexts/AuthContext';
interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  payout: string;
  crypto: string;
  category: string;
  deadline: string;
  clientName: string;
  poster: string;
  trustLevel: number;
  skills: string[];
  skillsRequired: string[];
}
const MOCK_GIGS: Gig[] = [
  {
    id: '1',
    title: 'Full-Stack Web App Development',
    description: 'Build a modern web application with React and Node.js',
    budget: 5000,
    payout: '5000',
    crypto: 'USDC',
    category: 'Development',
    deadline: '2024-03-01',
    clientName: 'TechCorp',
    poster: 'TechCorp',
    trustLevel: 95,
    skills: ['React', 'Node.js', 'MongoDB'],
    skillsRequired: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Design a beautiful and intuitive mobile app interface',
    budget: 3000,
    payout: '3000',
    crypto: 'ETH',
    category: 'Design',
    deadline: '2024-02-15',
    clientName: 'StartupXYZ',
    poster: 'StartupXYZ',
    trustLevel: 88,
    skills: ['Figma', 'UI/UX', 'Mobile Design'],
    skillsRequired: ['Figma', 'UI/UX', 'Mobile Design']
  },
  {
    id: '3',
    title: 'SEO & Content Marketing',
    description: 'Improve website ranking and create engaging content',
    budget: 2000,
    payout: '2000',
    crypto: 'USDT',
    category: 'Marketing',
    deadline: '2024-02-28',
    clientName: 'EcomBrand',
    poster: 'EcomBrand',
    trustLevel: 92,
    skills: ['SEO', 'Content Writing', 'Analytics'],
    skillsRequired: ['SEO', 'Content Writing', 'Analytics']
  },
  {
    id: '4',
    title: 'Smart Contract Development',
    description: 'Develop and audit Ethereum smart contracts',
    budget: 8000,
    payout: '8000',
    crypto: 'ETH',
    category: 'Blockchain',
    deadline: '2024-03-15',
    clientName: 'DeFi Protocol',
    poster: 'DeFi Protocol',
    trustLevel: 98,
    skills: ['Solidity', 'Web3', 'Security'],
    skillsRequired: ['Solidity', 'Web3', 'Security']
  },
  {
    id: '5',
    title: 'Video Production & Editing',
    description: 'Create promotional videos for social media',
    budget: 1500,
    payout: '1500',
    crypto: 'USDC',
    category: 'Video',
    deadline: '2024-02-20',
    clientName: 'CreativeAgency',
    poster: 'CreativeAgency',
    trustLevel: 85,
    skills: ['Premiere Pro', 'After Effects', 'Storytelling'],
    skillsRequired: ['Premiere Pro', 'After Effects', 'Storytelling']
  },
  {
    id: '6',
    title: 'AI/ML Model Development',
    description: 'Build custom ML models for predictive analytics',
    budget: 10000,
    payout: '10000',
    crypto: 'USDC',
    category: 'AI/ML',
    deadline: '2024-04-01',
    clientName: 'DataTech',
    poster: 'DataTech',
    trustLevel: 97,
    skills: ['Python', 'TensorFlow', 'Data Science'],
    skillsRequired: ['Python', 'TensorFlow', 'Data Science']
  }
];
const CATEGORIES = ['All', 'Development', 'Design', 'Marketing', 'Blockchain', 'Video', 'AI/ML', 'Writing', 'Data'];
export default function NeedJob() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<Array<Job & { matchScore: number; matchReasons: string[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const gigsPerPage = 6;
  const stats = [
    { label: 'Total Jobs', value: jobs.length.toString(), icon: Briefcase, color: 'text-blue-400' },
    { label: 'Categories', value: '9', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Avg Payout', value: jobs.length > 0 ? `$${Math.round(jobs.reduce((sum, j) => sum + j.budget, 0) / jobs.length)}` : '$0', icon: DollarSign, color: 'text-purple-400' },
    { label: 'Open Jobs', value: jobs.filter(j => j.status === 'open').length.toString(), icon: Users, color: 'text-yellow-400' }
  ];
  useEffect(() => {
    loadJobs();
  }, []);
  useEffect(() => {
    filterAndSortJobs();
    if (user && jobs.length > 0) {
      calculateJobMatches();
    }
  }, [searchTerm, selectedCategory, sortBy, jobs, user]);
  const loadJobs = async () => {
    try {
      setLoading(true);
      const fetchedJobs = await jobService.list({ status: 'open' });
      setJobs(fetchedJobs);
      setFilteredJobs(fetchedJobs);
    } catch (error: any) {
      console.error('Failed to load jobs:', error);
      toast.error('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const filterAndSortJobs = () => {
    let filtered = [...jobs];
    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    if (sortBy === 'budget-high') {
      filtered.sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'budget-low') {
      filtered.sort((a, b) => a.budget - b.budget);
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };
  const calculateJobMatches = () => {
    if (!user) return;
    const mockCandidate = {
      id: user.uid || 'guest',
      name: user.displayName || 'User',
      email: user.email || '',
      skills: ['React', 'TypeScript', 'Node.js', 'Web3', 'Solana'], // Mock skills - in production, get from user profile
      experience: 3, // Mock experience - in production, get from user profile
      completedJobs: 12, // Mock - in production, get from user profile
      rating: 4.5, // Mock - in production, get from user profile
      hourlyRate: 50 // Mock - in production, get from user profile
    };
    const jobsWithScores = jobs.map(job => {
      const matchScore = calculateMatchScore(mockCandidate, {
        id: job.id,
        title: job.title,
        category: job.category,
        skills: job.skills || [],
        budget: job.budget,
        duration: job.deadline || '1 week'
      });
      const reasons: string[] = [];
      if (matchScore >= 80) {
        reasons.push('Excellent skills match');
        reasons.push('Your experience is perfect for this role');
      } else if (matchScore >= 60) {
        reasons.push('Good skills overlap');
        reasons.push('Your profile fits this job well');
      } else {
        reasons.push('Some relevant skills');
        reasons.push('Could be a learning opportunity');
      }
      return {
        ...job,
        matchScore,
        matchReasons: reasons
      };
    });
    const topMatches = jobsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
    setMatchedJobs(topMatches);
  };
  const indexOfLastGig = currentPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = filteredJobs.slice(indexOfFirstGig, indexOfLastGig);
  const totalPages = Math.ceil(filteredJobs.length / gigsPerPage);
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar navItems={navItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {}
        <div className="mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
            Find Your Next Gig
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse thousands of opportunities and start earning today
          </p>
        </div>
        {}
        {user && matchedJobs.length > 0 && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <HeroHighlight className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                  Find Your Next Job
                </h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Based on your profile, we've matched you with these top opportunities
              </p>
            </HeroHighlight>
            <div className="grid md:grid-cols-3 gap-6">
              {matchedJobs.map((job, idx) => (
                <CardSpotlight key={job.id} className="h-full">
                  <div className="p-6 h-full flex flex-col">
                    {}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Match Score
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-primary">
                          {job.matchScore}%
                        </div>
                      </div>
                    </div>
                    {}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="text-sm text-primary mb-3">
                      {job.category}
                    </div>
                    {}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                      {job.description}
                    </p>
                    {}
                    <div className="mb-4 space-y-2">
                      {job.matchReasons.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                          <span className="text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </div>
                    {}
                    <div className="border-t border-border pt-4 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">Budget</span>
                        <span className="text-lg font-bold text-primary">
                          ${job.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills?.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {}
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      onClick={() => window.location.href = `/gig/${job.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardSpotlight>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                View All {jobs.length} Jobs
              </Button>
            </div>
          </div>
        )}
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
        <Card className="p-6 mb-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  <SelectItem value="deadline">Deadline Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        {}
        <div className="mb-6 text-muted-foreground">
          Showing {indexOfFirstGig + 1}-{Math.min(indexOfLastGig, filteredJobs.length)} of {filteredJobs.length} jobs
        </div>
        {}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 border-border">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : currentGigs.length === 0 ? (
          <Card className="p-12 border-border bg-gradient-to-br from-card to-card/50 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentGigs.map((gig) => (
              <GigCard 
                key={gig.id} 
                id={gig.id}
                title={gig.title}
                description={gig.description}
                payout={gig.budget.toString()}
                crypto="USDC"
                poster={gig.clientName || 'Anonymous'}
                trustLevel={95}
                skills={gig.skills || []}
                deadline={gig.deadline || undefined}
              />
            ))}
          </div>
        )}
        {}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {renderPageNumbers().map((number, index) => (
              <Button
                key={index}
                variant={currentPage === number ? 'default' : 'outline'}
                size="sm"
                onClick={() => typeof number === 'number' && paginate(number)}
                disabled={number === '...'}
                className={currentPage === number ? 'bg-primary' : ''}
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
