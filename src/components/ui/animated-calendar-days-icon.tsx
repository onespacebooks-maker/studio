"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedCalendarDaysIconProps extends HTMLMotionProps<"div"> {
    variants?: Variants;
}

export function AnimatedCalendarDaysIcon({ className, variants, ...props }: AnimatedCalendarDaysIconProps) {

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
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
          variants={variants}
        />
        <motion.line x1="16" x2="16" y1="2" y2="6" variants={variants} />
        <motion.line x1="8" x2="8" y1="2" y2="6" variants={variants} />
        <motion.line x1="3" x2="21" y1="10" y2="10" variants={variants} />
        <motion.path d="M8 14h.01" variants={variants} />
        <motion.path d="M12 14h.01" variants={variants}/>
        <motion.path d="M16 14h.01" variants={variants}/>
        <motion.path d="M8 18h.01" variants={variants} />
        <motion.path d="M12 18h.01" variants={variants}/>
        <motion.path d="M16 18h.01" variants={variants}/>
      </motion.svg>
    </motion.div>
  );
}
