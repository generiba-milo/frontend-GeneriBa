import { Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="font-display text-xl font-bold">GeneriBa</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fair work. Open future. DAO-powered gig marketplace.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Find Work</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Post a Gig</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Teams</a></li>
            </ul>
          </div>

          {/* DAO */}
          <div>
            <h3 className="font-semibold mb-4">DAO</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Governance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Staking</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Treasury</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Proposals</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Open Source</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 GeneriBa. Open source. No IDs required.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">$125K+ Paid</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">1,200+ Users</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">0 KYC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
