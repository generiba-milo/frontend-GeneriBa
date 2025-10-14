import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export const MagneticButton = ({
  children,
  className,
  ...props
}: ButtonProps & { className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button
        className={cn(
          "relative overflow-hidden bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export const GlowButton = ({
  children,
  className,
  ...props
}: ButtonProps & { className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        className={cn(
          "relative bg-primary hover:bg-primary/90",
          "shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 rounded-md bg-gradient-to-r from-primary via-primary-glow to-primary"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Button>
    </motion.div>
  );
};
