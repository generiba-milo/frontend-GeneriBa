import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-border rounded-full bg-background/80 backdrop-blur-md shadow-xl z-[5000] px-8 py-4 items-center justify-center space-x-4",
          className
        )}
      >
        <Link to="/" className="flex items-center space-x-2 mr-4">
          <img src="/generiba_logo_left_square.png" alt="GeneriBa" className="h-8 w-8" />
          <span className="font-display text-lg font-bold">GeneriBa</span>
        </Link>

        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative text-sm font-medium hover:text-primary transition-colors px-3 py-2"
            )}
          >
            <span className="block">{navItem.name}</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
          </Link>
        ))}

        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 ml-4">
          <Wallet className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
