"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedBotIconProps extends HTMLMotionProps<"div"> {}

export function AnimatedBotIcon({ className, ...props }: AnimatedBotIconProps) {
  const iconVariants: Variants = {
    initial: { rotate: 0 },
    hover: { rotate: [0, 15, -15, 15, -15, 0], transition: { duration: 0.7 } },
  };

  const antennaVariants: Variants = {
    initial: { y: 0 },
    hover: { y: [0, -2, 0], transition: { duration: 0.5, repeat: 1 } },
  };

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
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
        <path d="M12 8V4H8" />
        <motion.path
          d="m8 4 4 4"
          custom={1}
          variants={antennaVariants}
        />
        <rect width="16" height="12" x="4" y="12" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 18H9" />
      </motion.svg>
    </motion.div>
  );
}
