import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton, GlowButton } from "@/components/aceternity/AnimatedButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Users, Shield, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDCard } from "@/components/aceternity/ThreeDCard";

interface GigCardProps {
  id: string;
  title: string;
  description: string;
  payout: string;
  crypto: string;
  poster: string;
  trustLevel: number;
  skills: string;
  isGroup?: boolean;
  deadline?: string;
}

const GigCard = ({
  id,
  title,
  description,
  payout,
  crypto,
  poster,
  trustLevel,
  skills,
  isGroup = false,
  deadline = "3 days",
}: GigCardProps) => {
  return (
    <Link to={`/gig/${id}`}>
      <ThreeDCard
        containerClassName="group relative overflow-hidden"
        className="border border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 w-full"
      >

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.split(",").slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.split(",").length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.split(",").length - 3}
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deadline} Days</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">

              <MagneticButton className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" size="sm">
                  Apply Now
                </Button>
              </MagneticButton>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                 
                  {payout}
                </div>
                <span className="text-xs text-muted-foreground">SOL</span>
              </div>
            </div>
          </div>


        </div>
      </ThreeDCard>
    </Link>
  );
};

export default GigCard;
