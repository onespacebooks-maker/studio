"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedCalendarDaysIconProps extends HTMLMotionProps<"div"> {}

export function AnimatedCalendarDaysIcon({ className, ...props }: AnimatedCalendarDaysIconProps) {
  const pageFlipVariants: Variants = {
    initial: { rotateX: 0, y: 0 },
    hover: {
      rotateX: [0, 20, 0],
      y: [0, -2, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };
  
  const dotVariants: Variants = {
    initial: { scale: 1, opacity: 1 },
    hover: (i:number) => ({
      scale: [1, 1.3, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 0.5, delay: i * 0.1}
    })
  }

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
      >
        <motion.rect
          width="18"
          height="18"
          x="3"
          y="4"
          rx="2"
          ry="2"
          variants={pageFlipVariants}
        />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <motion.path d="M8 14h.01" variants={dotVariants} custom={0}/>
        <motion.path d="M12 14h.01" variants={dotVariants} custom={1}/>
        <motion.path d="M16 14h.01" variants={dotVariants} custom={2}/>
        <motion.path d="M8 18h.01" variants={dotVariants} custom={3}/>
        <motion.path d="M12 18h.01" variants={dotVariants} custom={4}/>
        <motion.path d="M16 18h.01" variants={dotVariants} custom={5}/>
      </motion.svg>
    </motion.div>
  );
}
