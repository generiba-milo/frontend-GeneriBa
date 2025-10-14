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
  skills: string[];
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
        {/* Trust Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            <Shield className="h-3 w-3 mr-1" />
            Level {trustLevel}
          </Badge>
        </div>

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
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {isGroup && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Group</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {poster.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground font-mono">
                {poster.substring(0, 8)}...
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <DollarSign className="h-4 w-4" />
                  {payout}
                </div>
                <span className="text-xs text-muted-foreground">{crypto}</span>
              </div>
            </div>
          </div>

          <MagneticButton className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" size="sm">
              Apply Now
            </Button>
          </MagneticButton>
        </div>
  </ThreeDCard>
    </Link>
  );
};

export default GigCard;
