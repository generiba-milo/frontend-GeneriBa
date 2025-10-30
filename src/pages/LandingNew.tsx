import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/BentoGrid";
import { CardSpotlight } from "@/components/aceternity/CardSpotlight";
import { ThreeDCard } from "@/components/aceternity/ThreeDCard";
import { Sparkles } from "@/components/aceternity/Sparkles";
import { MagneticButton, GlowButton } from "@/components/aceternity/AnimatedButton";
import { MovingBorder } from "@/components/aceternity/MovingBorder";
import { BackgroundGradient } from "@/components/aceternity/BackgroundGradient";
import { HeroParallax } from "@/components/aceternity/HeroParallax";
import { TextGenerateEffect } from "@/components/aceternity/TextGenerateEffect";
import { BackgroundBeamsWithCollision } from "@/components/aceternity/background-beam-with-collision";
import Splash3dButton from "@/components/3d-splash-button";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Wallet, Shield, Users, Zap, TrendingUp, Award,
  ArrowRight, CheckCircle2, Sparkles as SparklesIcon,
  Lock, Globe, Coins, Target, Code, Rocket
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const LandingNew = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true });
  useEffect(() => {
    setMounted(true);
  }, []);
  const navItems = [
    { name: "Marketplace", link: "/marketplace" },
    { name: "DAO", link: "/dao" },
    { name: "Teams", link: "/teams" },
    { name: "Dashboard", link: "/dashboard" },
  ];
  const bentoFeatures = [
    {
      title: "Decentralized Trust",
      description: "Build reputation through DAO staking. Your on-chain proof speaks louder than any ID.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 relative overflow-hidden">
          <Sparkles className="absolute inset-0" particleCount={20} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="h-16 w-16 text-blue-400" />
          </div>
        </div>
      ),
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      className: "md:col-span-2",
    },
    {
      title: "Instant Payments",
      description: "Automated escrow releases funds on completion. Support for USDC, SOL, ETH, and more.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-16 w-16 text-yellow-400" />
          </motion.div>
        </div>
      ),
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      className: "md:col-span-1",
    },
    {
      title: "Team Collaboration",
      description: "Form groups, tackle bigger projects, and share rewards seamlessly.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 relative">
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="h-12 w-12 text-green-400" />
            </motion.div>
          </div>
        </div>
      ),
      icon: <Users className="h-6 w-6 text-green-400" />,
      className: "md:col-span-1",
    },
    {
      title: "DAO Governance",
      description: "Vote on disputes, set policies, earn rewards. Your stake gives you a voice.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Award className="h-16 w-16 text-purple-400" />
          </motion.div>
        </div>
      ),
      icon: <Award className="h-6 w-6 text-purple-400" />,
      className: "md:col-span-2",
    },
  ];
  const steps = [
    {
      num: "01",
      title: "Connect Your Wallet",
      desc: "Any Web3 wallet works. MetaMask, Phantom, WalletConnect - you choose.",
      icon: Wallet,
    },
    {
      num: "02",
      title: "Browse & Apply",
      desc: "Find gigs that match your skills. Filter by payment, timeline, and trust level.",
      icon: Target,
    },
    {
      num: "03",
      title: "Stake & Commit",
      desc: "Lock DAO tokens to show you're serious. Higher stakes = higher trust.",
      icon: Lock,
    },
    {
      num: "04",
      title: "Deliver Excellence",
      desc: "Complete work on time. Use built-in chat. Hit milestones for partial payments.",
      icon: Code,
    },
    {
      num: "05",
      title: "Get Paid Instantly",
      desc: "Funds release automatically to your wallet. Your trust score grows with each success.",
      icon: Rocket,
    },
  ];
  const stats = [
    { value: "$125K+", label: "Total Paid Out", gradient: "from-blue-500 to-cyan-500" },
    { value: "1,200+", label: "Active Users", gradient: "from-purple-500 to-pink-500" },
    { value: "347", label: "Live Gigs", gradient: "from-green-500 to-emerald-500" },
    { value: "0", label: "IDs Required", gradient: "from-orange-500 to-red-500" },
  ];
  return (
    <div className="min-h-screen bg-background overflow-hidden">

      <HeroParallax>
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-32 md:pt-40">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <motion.div
            className="absolute top-40 left-20 w-72 h-72 bg-primary/30 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-primary-glow/30 rounded-full blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Sparkles className="absolute inset-0 z-0" particleCount={30} />
          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BackgroundGradient className="rounded-full inline-block px-6 py-2">
                  <Badge className="bg-transparent text-foreground border-0 text-xs sm:text-sm font-medium">
                    <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                    DAO-Powered • KYC-Free • Trustless
                  </Badge>
                </BackgroundGradient>
              </motion.div>
              <div className="space-y-4 md:space-y-6">
                <TextGenerateEffect
                  words="Fair Work. Open Future."
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="max-w-3xl mx-auto"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light">
                    Decentralized gig marketplace. Earn in crypto.
                    <span className="text-primary font-semibold"> Build trust through DAO.</span> No ID required.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
              >
                <MagneticButton size="lg" className="group text-lg px-8 py-6">
                  <Wallet className="mr-2 h-6 w-6" />
                  Connect Wallet & Start
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <Link to="/marketplace">
                  <GlowButton size="lg" className="text-lg px-8 py-6">
                    Browse Live Gigs
                  </GlowButton>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto pt-12"
              >
                {stats.map((stat, idx) => (
                  <MovingBorder key={idx} duration={3000 + idx * 500}>
                    <div className="p-6 text-center">
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </MovingBorder>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </HeroParallax>
      <section ref={featuresRef} className="py-32 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              How <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">GeneriBa</span> Works
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Built for the decentralized economy. Powered by community trust.
            </p>
          </motion.div>
          <BentoGrid className="max-w-6xl mx-auto">
            {bentoFeatures.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>
      <section className="py-32 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Start Earning in <span className="text-primary">Minutes</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Five simple steps to your first gig
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ThreeDCard>
                  <CardSpotlight className="p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                          <step.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-primary mb-2">{step.num}</div>
                        <h3 className="font-display font-bold text-2xl mb-3">{step.title}</h3>
                        <p className="text-muted-foreground text-lg">{step.desc}</p>
                      </div>
                      <CheckCircle2 className="flex-shrink-0 h-8 w-8 text-primary" />
                    </div>
                  </CardSpotlight>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <MagneticButton size="lg" className="text-lg px-8 py-6">
              <Wallet className="mr-2 h-6 w-6" />
              Get Started Now
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <BackgroundGradient containerClassName="rounded-3xl">
            <Card className="p-10 md:p-16 border-0 bg-background">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-2">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Why GeneriBa?
                  </Badge>
                  <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                    Better Than Traditional Platforms
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Lowest fees in the industry (2% vs 20%)",
                      "No KYC, no documents, no delays",
                      "Community-governed dispute resolution",
                      "Instant crypto payouts, no waiting",
                      "Group gigs & team collaboration",
                      "Build trust through DAO, not ID"
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "DAO Treasury", value: "$2.4M", desc: "Community-controlled", icon: Coins },
                    { label: "Active Gigs", value: "347", desc: "Browse marketplace →", icon: Globe },
                    { label: "Trust Score Avg", value: "4.8/5", desc: "DAO-verified ratings", icon: Shield },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <ThreeDCard>
                        <CardSpotlight className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-2 font-medium">{item.label}</div>
                              <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                              <div className="text-sm text-muted-foreground">{item.desc}</div>
                            </div>
                            <item.icon className="h-8 w-8 text-primary/40" />
                          </div>
                        </CardSpotlight>
                      </ThreeDCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </BackgroundGradient>
        </div>
      </section>
     
    </div>
  );
};
export default LandingNew;
