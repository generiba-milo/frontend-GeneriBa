import { useState, useEffect } from 'react';
import { DollarSign, Clock, Shield, TrendingUp, Upload, Image as ImageIcon, CheckCircle, AlertCircle, Wallet, Coins, Star, Briefcase, Award, Sparkles } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDemo } from '@/contexts/DemoContext';
import { jobService } from '@/services/job.service';
import { NFTCard } from '@/components/NFTCard';
import { MOCK_NFTS, calculateNFTValue } from '@/utils/nftMock';
import type { NFT } from '@/utils/nftMock';
import { BentoGrid, BentoGridItem } from '@/components/aceternity/BentoGrid';
import { BackgroundGradient } from '@/components/aceternity/BackgroundGradient';
interface LoanApplication {
  id: string;
  amount: number;
  crypto: string;
  duration: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid_back';
  appliedAt: string;
  interestRate: number;
  totalRepayment: number;
  hasNFTCollateral: boolean;
  hasDocuments: boolean;
}
interface NFTCollateral {
  contractAddress: string;
  tokenId: string;
  name: string;
  floorPrice: number;
  image?: string;
}
const MOCK_APPLICATIONS: LoanApplication[] = [
  {
    id: '1',
    amount: 2500,
    crypto: 'USDC',
    duration: 30,
    urgency: 'medium',
    reason: 'Equipment upgrade for new project',
    status: 'approved',
    appliedAt: '2024-01-15',
    interestRate: 5,
    totalRepayment: 2610.27,
    hasNFTCollateral: true,
    hasDocuments: true
  },
  {
    id: '2',
    amount: 1000,
    crypto: 'ETH',
    duration: 14,
    urgency: 'high',
    reason: 'Emergency medical expense',
    status: 'pending',
    appliedAt: '2024-01-20',
    interestRate: 5,
    totalRepayment: 1019.18,
    hasNFTCollateral: false,
    hasDocuments: true
  }
];
export default function GetLoan() {
  const { user } = useAuth();
  const { connected, publicKey } = useWallet();
  const { isDemoMode, demoUser } = useDemo();
  const [applications, setApplications] = useState<LoanApplication[]>(MOCK_APPLICATIONS);
  const [loading, setLoading] = useState(true);
  const [credibilityLoading, setCredibilityLoading] = useState(true);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [maxCredit, setMaxCredit] = useState(0);
  const [nftsOwned, setNftsOwned] = useState(0);
  const [userNFTs, setUserNFTs] = useState<NFT[]>([]);
  const [nftValue, setNFTValue] = useState(0);
  const [formData, setFormData] = useState({
    amount: '',
    crypto: 'USDC',
    duration: '30',
    urgency: 'medium',
    reason: '',
    useNFTCollateral: false,
    hasDocuments: false
  });
  const [nftCollateral, setNFTCollateral] = useState<NFTCollateral>({
    contractAddress: '',
    tokenId: '',
    name: '',
    floorPrice: 0
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [nftImage, setNFTImage] = useState<File | null>(null);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const stats = [
    { label: 'Credit Score', value: creditScore.toString(), icon: Star, color: 'text-green-400' },
    { label: 'Completed Jobs', value: completedJobs.toString(), icon: Briefcase, color: 'text-blue-400' },
    { label: 'Rating', value: `${userRating.toFixed(1)}⭐`, icon: Award, color: 'text-purple-400' },
    { label: 'NFTs Owned', value: nftsOwned.toString(), icon: Shield, color: 'text-yellow-400' }
  ];
  useEffect(() => {
    loadUserCredibility();
  }, [user, connected, isDemoMode]);
  useEffect(() => {
    calculateInterest();
  }, [formData.amount, formData.duration]);
  const loadUserCredibility = async () => {
    if (!user && !connected && !isDemoMode) {
      setCredibilityLoading(false);
      setLoading(false);
      return;
    }
    try {
      setCredibilityLoading(true);
      if (isDemoMode && demoUser) {
        setCompletedJobs(demoUser.completedJobs);
        setUserRating(demoUser.rating);
        const nfts = MOCK_NFTS.slice(0, demoUser.nfts);
        setUserNFTs(nfts);
        setNftsOwned(nfts.length);
        const totalNFTValue = calculateNFTValue(nfts);
        setNFTValue(totalNFTValue);
        setIsEligible(true); // Demo user is always eligible
        const score = 20 + Math.min(40, demoUser.completedJobs * 8) + Math.min(20, demoUser.rating * 4) + Math.min(20, nfts.length * 5);
        setCreditScore(Math.min(100, score));
        const credit = (demoUser.completedJobs * 500) + (nfts.length * 200) + (totalNFTValue * 1000);
        setMaxCredit(Math.round(credit));
        setCredibilityLoading(false);
        setLoading(false);
        return;
      }
      const myJobs = await jobService.getMyJobs();
      const completed = myJobs.filter(j => j.status === 'completed').length;
      setCompletedJobs(completed);
      const rating = completed > 0 ? Math.min(5.0, 3.5 + (completed * 0.3)) : 0;
      setUserRating(rating);
      const nfts = completed > 0 ? MOCK_NFTS.slice(0, Math.min(completed, 3)) : [];
      setUserNFTs(nfts);
      setNftsOwned(nfts.length);
      const totalNFTValue = calculateNFTValue(nfts);
      setNFTValue(totalNFTValue);
      const walletConnected = connected && publicKey !== null;
      const eligible = walletConnected && completed >= 3 && rating >= 4.0;
      setIsEligible(eligible);
      let score = 0;
      if (walletConnected) score += 20;
      score += Math.min(40, completed * 8);
      score += Math.min(20, rating * 4);
      score += Math.min(20, nfts.length * 5);
      setCreditScore(Math.min(100, score));
      const credit = eligible ? (completed * 500) + (nfts.length * 200) + (totalNFTValue * 1000) : 0;
      setMaxCredit(Math.round(credit));
    } catch (error) {
      console.error('Error loading user credibility:', error);
    } finally {
      setCredibilityLoading(false);
      setLoading(false);
    }
  };
  const calculateInterest = () => {
    const principal = parseFloat(formData.amount) || 0;
    const days = parseInt(formData.duration) || 0;
    const rate = 0.05; // 5% APR
    const interest = principal * (rate * days / 365);
    const total = principal + interest;
    setRepaymentAmount(total);
    return total;
  };
  useEffect(() => {
    calculateInterest();
  }, [formData.amount, formData.duration]);
  useEffect(() => {
    const interval = setInterval(() => {
      setApplications(prev => [...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: 'bg-green-500/10 text-green-400 border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      critical: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[urgency as keyof typeof colors] || colors.low;
  };
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      approved: 'bg-green-500/10 text-green-400 border-green-500/20',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
      paid_back: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setDocuments([...documents, ...files]);
      setFormData({ ...formData, hasDocuments: true });
      toast.success('Documents uploaded successfully');
    }
  };
  const handleNFTImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNFTImage(e.target.files[0]);
      toast.success('NFT image uploaded');
    }
  };
  const validateNFT = async () => {
    if (!nftCollateral.contractAddress || !nftCollateral.tokenId) {
      toast.error('Please provide NFT contract address and token ID');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setNFTCollateral({
        ...nftCollateral,
        name: 'Bored Ape #' + nftCollateral.tokenId,
        floorPrice: 45.2
      });
      setFormData({ ...formData, useNFTCollateral: true });
      toast.success('NFT validated successfully!');
    } catch (error) {
      toast.error('Failed to validate NFT');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) {
      toast.error('Not Eligible', {
        description: 'You need 3+ completed jobs and 4.0+ rating'
      });
      return;
    }
    const amount = parseFloat(formData.amount);
    if (!formData.amount || amount < 100) {
      toast.error('Minimum loan amount is $100');
      return;
    }
    if (amount > maxCredit) {
      toast.error(`Maximum credit available is $${maxCredit}`);
      return;
    }
    if (!formData.reason.trim()) {
      toast.error('Please provide a reason for the credit');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newApplication: LoanApplication = {
        id: (applications.length + 1).toString(),
        amount: amount,
        crypto: formData.crypto,
        duration: parseInt(formData.duration),
        urgency: formData.urgency as any,
        reason: formData.reason,
        status: 'approved',
        appliedAt: new Date().toISOString().split('T')[0],
        interestRate: 5,
        totalRepayment: repaymentAmount,
        hasNFTCollateral: formData.useNFTCollateral,
        hasDocuments: false
      };
      setApplications([newApplication, ...applications]);
      toast.success('Credit Approved!', {
        description: `$${amount} will be deposited to your wallet`
      });
      setFormData({
        amount: '',
        crypto: 'USDC',
        duration: '30',
        urgency: 'medium',
        reason: '',
        useNFTCollateral: false,
        hasDocuments: false
      });
      setDocuments([]);
      setNFTImage(null);
      setNFTCollateral({
        contractAddress: '',
        tokenId: '',
        name: '',
        floorPrice: 0
      });
    } catch (error) {
      toast.error('Failed to submit loan application');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar navItems={navItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {}
        <div className="mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-600">
            Get Credit (No KYC)
          </h1>
          <p className="text-lg text-muted-foreground">
            Instant credit based on your work history and reputation - no identity verification required
          </p>
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
        <Card className="p-6 mb-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-semibold mb-4">Your Credit Profile</h2>
          {credibilityLoading ? (
            <p className="text-muted-foreground">Loading your profile...</p>
          ) : (
            <>
              <BentoGrid className="mb-6">
                <BentoGridItem
                  title="Wallet Status"
                  description={connected ? (
                    <span className="text-green-500 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Connected
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Not Connected
                    </span>
                  )}
                  icon={<Wallet className="w-6 h-6 text-primary" />}
                  className="md:col-span-1"
                />
                <BentoGridItem
                  title="Completed Jobs"
                  description={
                    <div>
                      <p className="text-2xl font-bold mb-1">{completedJobs}</p>
                      <p className="text-xs text-muted-foreground">{completedJobs >= 3 ? '✅ Requirement met' : `❌ Need ${3 - completedJobs} more`}</p>
                    </div>
                  }
                  icon={<Briefcase className="w-6 h-6 text-primary" />}
                  className="md:col-span-1"
                />
                <BentoGridItem
                  title="Rating"
                  description={
                    <div>
                      <p className="text-2xl font-bold mb-1">{userRating.toFixed(1)} ⭐</p>
                      <p className="text-xs text-muted-foreground">{userRating >= 4.0 ? '✅ Requirement met' : '❌ Need 4.0+'}</p>
                    </div>
                  }
                  icon={<Star className="w-6 h-6 text-primary" />}
                  className="md:col-span-1"
                />
              </BentoGrid>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <span className="text-xl font-bold">{creditScore}/100</span>
                </div>
                <Progress value={creditScore} className="h-3" />
              </div>
              {isEligible ? (
                <BackgroundGradient className="rounded-[22px] p-0.5 bg-white dark:bg-zinc-900">
                  <Card className="p-4 bg-green-500/10 border-0 rounded-[20px]">
                    <h3 className="text-xl font-bold text-green-500 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      You're Eligible!
                    </h3>
                    <p className="text-green-400">
                      Maximum Credit Available: <strong className="text-2xl">${maxCredit.toLocaleString()}</strong>
                    </p>
                  </Card>
                </BackgroundGradient>
              ) : (
                <BackgroundGradient className="rounded-[22px] p-0.5 bg-white dark:bg-zinc-900">
                  <Card className="p-4 bg-red-500/10 border-0 rounded-[20px]">
                    <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6" />
                      Not Eligible Yet
                    </h3>
                    <p className="text-red-400 mb-2">Requirements:</p>
                    <ul className="list-disc ml-6 text-red-400 space-y-1">
                      <li>Wallet connected: {connected ? '✅' : '❌'}</li>
                      <li>3+ completed jobs: {completedJobs >= 3 ? '✅' : `❌ (${completedJobs}/3)`}</li>
                      <li>4.0+ rating: {userRating >= 4.0 ? '✅' : `❌ (${userRating.toFixed(1)}/4.0)`}</li>
                    </ul>
                  </Card>
                </BackgroundGradient>
              )}
            </>
          )}
        </Card>
        {}
        {userNFTs.length > 0 && (
          <Card className="p-6 mb-8 border-border bg-gradient-to-br from-card to-card/50 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Your NFT Portfolio</h2>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white">
                {userNFTs.length} NFT{userNFTs.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {nftValue.toFixed(2)} SOL
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈ ${(nftValue * 100).toFixed(2)} USD (estimated)
                  </p>
                </div>
                <Coins className="w-12 h-12 text-primary opacity-50" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userNFTs.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  onViewDetails={(nft) => {
                    toast.info('NFT Details', {
                      description: `${nft.name} - ${nft.description}`
                    });
                  }}
                  onList={(nft) => {
                    toast.info('List NFT', {
                      description: 'NFT marketplace listing coming soon!'
                    });
                  }}
                />
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">NFT Completion Certificates</h4>
                  <p className="text-sm text-muted-foreground">
                    Each NFT represents a successfully completed job on GeneriBa. NFTs can be used as collateral for loans, 
                    traded on marketplaces, or held as proof of work. Your NFT portfolio adds <strong>${(nftValue * 1000).toFixed(0)}</strong> to your maximum credit limit.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
        {}
        {userNFTs.length === 0 && !credibilityLoading && (
          <Card className="p-8 mb-8 border-border bg-gradient-to-br from-muted/50 to-muted/30 text-center animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete jobs on GeneriBa to earn NFT completion certificates. NFTs increase your credit limit and can be used as collateral.
            </p>
            <Button variant="outline" className="mt-2">
              Browse Available Jobs
            </Button>
          </Card>
        )}
        <div className="grid lg:grid-cols-2 gap-8">{}
          {}
          <div className="space-y-6">
            <Card className="p-8 border-border bg-gradient-to-br from-card to-card/50 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Apply for a Loan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="amount">Loan Amount (USD) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="mt-2"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum: $100</p>
                </div>
                <div>
                  <Label htmlFor="crypto">Receive in *</Label>
                  <Select value={formData.crypto} onValueChange={(value) => setFormData({ ...formData, crypto: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Loan Duration (days) *</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Can wait 24-48 hours</SelectItem>
                      <SelectItem value="medium">Medium - Need within 24 hours</SelectItem>
                      <SelectItem value="high">High - Need within 12 hours</SelectItem>
                      <SelectItem value="critical">Critical - Emergency (4 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Loan *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Explain why you need this loan..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-2 min-h-[100px]"
                    required
                  />
                </div>
                {}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Identity Verification *
                  </h3>
                  <Label htmlFor="documents">Upload ID (Passport/National ID)</Label>
                  <div className="mt-2">
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-5 h-5 mr-2" />
                      <span>Upload Documents</span>
                      <input
                        id="documents"
                        type="file"
                        multiple
                        accept="image/*,application/pdf"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                    </label>
                    {documents.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {documents.map((f, idx) => (
                          <div key={idx}>{f.name}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-purple-400" />
                    NFT Collateral (Optional)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stake an NFT as collateral for better rates and instant approval
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contractAddress">NFT Contract Address</Label>
                      <Input
                        id="contractAddress"
                        placeholder="0x..."
                        value={nftCollateral.contractAddress}
                        onChange={(e) => setNFTCollateral({ ...nftCollateral, contractAddress: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tokenId">Token ID</Label>
                      <Input
                        id="tokenId"
                        placeholder="e.g., 1234"
                        value={nftCollateral.tokenId}
                        onChange={(e) => setNFTCollateral({ ...nftCollateral, tokenId: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nftImage">NFT Image (Optional)</Label>
                      <label className="flex items-center justify-center w-full p-4 mt-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        <span>Upload NFT Image</span>
                        <input
                          id="nftImage"
                          type="file"
                          accept="image/*"
                          onChange={handleNFTImageUpload}
                          className="hidden"
                        />
                      </label>
                      {nftImage && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          {nftImage.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {formData.amount && formData.duration && (
                  <Card className="p-4 bg-primary/10 border-primary/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Principal</span>
                      <span className="font-semibold">${parseFloat(formData.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Interest (5% APR)</span>
                      <span className="font-semibold">${(repaymentAmount - parseFloat(formData.amount)).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-primary/20 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Repayment</span>
                        <span className="text-lg font-bold text-primary">${repaymentAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Card>
          </div>
          {}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
            {applications.length === 0 ? (
              <Card className="p-12 border-border bg-gradient-to-br from-card to-card/50 text-center">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No loan applications yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((app, i) => (
                  <Card
                    key={app.id}
                    className="p-6 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">${app.amount.toLocaleString()}</h3>
                          <Badge variant="outline">{app.crypto}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{app.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span>{app.interestRate}% APR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Repayment</span>
                        <span className="font-semibold">${app.totalRepayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Urgency</span>
                        <Badge className={getUrgencyColor(app.urgency)}>
                          {app.urgency}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {app.hasNFTCollateral && (
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                          <Coins className="w-3 h-3 mr-1" />
                          NFT Collateral
                        </Badge>
                      )}
                      {app.hasDocuments && (
                        <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground mb-3">
                        <span className="font-semibold">Reason:</span> {app.reason}
                      </p>
                      {app.status === 'approved' && (
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          Repay Loan
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
