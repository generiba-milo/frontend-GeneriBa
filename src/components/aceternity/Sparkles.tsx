import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { generateParticles } from "@/lib/cn-utils";

export const Sparkles = ({
  className,
  size = 1.2,
  particleCount = 50,
}: {
  className?: string;
  size?: number;
  particleCount?: number;
}) => {
  const particles = generateParticles(particleCount);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * size,
            height: particle.size * size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
