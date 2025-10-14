import { FloatingNavbar } from "@/components/aceternity/FloatingNavbar";
import { navItems } from "@/components/navItems";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, DollarSign, Users, Vote, AlertCircle, 
  MessageCircle, CheckCircle2, Gift, TrendingUp 
} from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "payment",
    icon: DollarSign,
    color: "text-green-400",
    title: "Payment Received",
    message: "500 USDC has been released to your wallet for 'NFT Marketplace Landing'",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "offer",
    icon: TrendingUp,
    color: "text-blue-400",
    title: "New Gig Offer",
    message: "You've been invited to apply for 'DAO Governance Dashboard' (1200 SOL)",
    time: "5 hours ago",
    read: false
  },
  {
    id: 3,
    type: "dao",
    icon: Vote,
    color: "text-purple-400",
    title: "DAO Proposal Live",
    message: "Proposal #12: 'Reduce Platform Fees for Level 3+' is now open for voting",
    time: "8 hours ago",
    read: true
  },
  {
    id: 4,
    type: "message",
    icon: MessageCircle,
    color: "text-primary",
    title: "New Message",
    message: "Client replied to your question about project timeline",
    time: "1 day ago",
    read: true
  },
  {
    id: 5,
    type: "team",
    icon: Users,
    color: "text-yellow-400",
    title: "Team Invitation",
    message: "'DeFi Builders' team invited you to join their group",
    time: "1 day ago",
    read: true
  },
  {
    id: 6,
    type: "dispute",
    icon: AlertCircle,
    color: "text-yellow-400",
    title: "Dispute Update",
    message: "Case #1247: Arbitrators have been assigned to your dispute",
    time: "2 days ago",
    read: true
  },
  {
    id: 7,
    type: "reward",
    icon: Gift,
    color: "text-pink-400",
    title: "Referral Reward",
    message: "You earned $25 from your referral's first completed gig!",
    time: "3 days ago",
    read: true
  },
  {
    id: 8,
    type: "milestone",
    icon: CheckCircle2,
    color: "text-green-400",
    title: "Milestone Approved",
    message: "Client approved milestone 2 for 'Smart Contract Audit' project",
    time: "3 days ago",
    read: true
  }
];

const Notifications = () => {
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
  <FloatingNavbar navItems={navItems} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-8 w-8 text-primary" />
                <h1 className="font-display text-4xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                Mark all as read
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {NOTIFICATIONS.map((notif, i) => (
              <Card 
                key={notif.id}
                className={`p-4 border-border transition-all duration-300 hover:border-primary/30 animate-fade-in-up ${
                  !notif.read ? "bg-primary/5" : "bg-card"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center ${
                    !notif.read ? "ring-2 ring-primary/30" : ""
                  }`}>
                    <notif.icon className={`h-5 w-5 ${notif.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold">{notif.title}</h3>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ml-2 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                      <div className="flex gap-2">
                        {notif.type === "payment" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            View Wallet
                          </Button>
                        )}
                        {notif.type === "offer" && (
                          <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
                            View Gig
                          </Button>
                        )}
                        {notif.type === "dao" && (
                          <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
                            Vote Now
                          </Button>
                        )}
                        {notif.type === "message" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Reply
                          </Button>
                        )}
                        {notif.type === "team" && (
                          <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
                            View Team
                          </Button>
                        )}
                        {notif.type === "dispute" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            View Case
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              Load Older Notifications
            </Button>
          </div>

          {/* Settings Card */}
          <Card className="p-6 border-border bg-card mt-8">
            <h3 className="font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { label: "Payment notifications", checked: true },
                { label: "New gig offers", checked: true },
                { label: "DAO proposals", checked: true },
                { label: "Messages", checked: true },
                { label: "Team invitations", checked: true },
                { label: "Dispute updates", checked: true },
                { label: "Referral rewards", checked: false },
                { label: "Marketing updates", checked: false }
              ].map((pref, i) => (
                <label 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 cursor-pointer transition-colors"
                >
                  <span className="text-sm">{pref.label}</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={pref.checked}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
