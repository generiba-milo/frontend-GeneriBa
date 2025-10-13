import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 4000,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-[1px]",
        containerClassName
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(168,85,247,0) 0%, rgba(168,85,247,1) 50%, rgba(168,85,247,0) 100%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div
        className={cn(
          "relative rounded-xl bg-background z-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
