"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedVideoIconProps extends HTMLMotionProps<"div"> {}

export function AnimatedVideoIcon({ className, ...props }: AnimatedVideoIconProps) {
  const iconVariants: Variants = {
    initial: {},
    hover: {},
  };

  const playButtonVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    hover: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center relative", className)}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={iconVariants}
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
         <motion.circle
          cx="8"
          cy="12"
          r="3"
          fill="currentColor"
          className="text-primary"
          variants={playButtonVariants}
          style={{transformOrigin: "center"}}
        />
      </motion.svg>
    </motion.div>
  );
}
