import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, Search, BookOpen, MessageCircle, 
  Shield, Wallet, Users, FileText 
} from "lucide-react";
const CATEGORIES = [
  { icon: Wallet, title: "Getting Started", desc: "Connect wallet, set up profile", count: 8 },
  { icon: FileText, title: "Posting Gigs", desc: "How to create and manage gigs", count: 12 },
  { icon: Users, title: "Working on Gigs", desc: "Apply, deliver, get paid", count: 15 },
  { icon: Shield, title: "Trust & DAO", desc: "Staking, voting, reputation", count: 10 },
  { icon: MessageCircle, title: "Disputes", desc: "Resolution process", count: 6 },
  { icon: BookOpen, title: "Platform Policies", desc: "Terms, fees, guidelines", count: 7 }
];
const FAQS = [
  {
    question: "How do I connect my wallet?",
    answer: "Click the 'Connect Wallet' button in the top right corner. We support MetaMask, WalletConnect, Phantom, and other major Web3 wallets. Make sure you have a compatible wallet installed in your browser."
  },
  {
    question: "What cryptocurrencies can I use?",
    answer: "GeneriBa supports USDC, ETH, and SOL for payments. You can choose your preferred crypto when posting or applying for gigs. All payments are held in escrow until work is completed."
  },
  {
    question: "How does the Trust Level system work?",
    answer: "Your Trust Level increases as you complete gigs successfully, receive positive reviews, and stake DAO tokens. Higher levels unlock lower fees, better gig visibility, and voting power in the DAO."
  },
  {
    question: "What are the platform fees?",
    answer: "GeneriBa charges a 2% platform fee on completed gigs. DAO Level 3+ members get reduced fees. Some promotional periods offer 0% fees - check the marketplace banner for current offers."
  },
  {
    question: "How do disputes get resolved?",
    answer: "Disputes are handled by community arbitrators - DAO Level 5 members who review evidence from both parties. Decisions are typically made within 3-5 days. The process is transparent and fair."
  },
  {
    question: "Can I work as part of a team?",
    answer: "Yes! You can join existing teams or create your own. Teams can take on larger, more complex gigs and share rewards. Team reputation is tracked separately from individual reputation."
  },
  {
    question: "Is KYC required?",
    answer: "No. GeneriBa is fully decentralized and KYC-free. Your wallet address and on-chain reputation are all you need to start earning. This makes the platform accessible to anyone globally."
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "Earnings are automatically sent to your connected wallet once a gig is marked complete and the escrow releases. There's no withdrawal process - you control your funds immediately."
  }
];
const Help = () => {
  return (
    <div className="min-h-screen bg-background">
  
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {}
          <div className="mb-12 text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold">Help Center</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers, learn about features, and get support
            </p>
            {}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for help..."
                  className="pl-12 h-14 text-lg bg-card border-border"
                />
              </div>
            </div>
          </div>
          {}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Browse by Topic</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat, i) => (
                <Card 
                  key={i}
                  className="p-6 border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <cat.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cat.desc}</p>
                  <div className="text-xs text-muted-foreground">
                    {cat.count} articles
                  </div>
                </Card>
              ))}
            </div>
          </div>
          {}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Card className="p-6 border-border bg-card">
              <Accordion type="single" collapsible className="space-y-2">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
          {}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-xl mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guides for developers and users
              </p>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Read Docs
              </Button>
            </Card>
            <Card className="p-6 border-border bg-card">
              <MessageCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-xl mb-2">Community Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our Discord for real-time help from the community
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Join Discord
              </Button>
            </Card>
          </div>
          {}
          <Card className="p-8 border-border bg-card text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Submit Feedback
              </Button>
            </div>
          </Card>
        </div>
      </div>
     
    </div>
  );
};
export default Help;
