"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedVideoIconProps extends HTMLMotionProps<"div"> {
    variants?: Variants;
}

export function AnimatedVideoIcon({ className, variants, ...props }: AnimatedVideoIconProps) {

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center relative", className)}
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
        <motion.path d="m22 8-6 4 6 4V8Z" variants={variants} />
        <motion.rect width="14" height="12" x="2" y="6" rx="2" ry="2" variants={variants} />
         <motion.circle
          cx="8"
          cy="12"
          r="3"
          fill="currentColor"
          className="text-primary"
          style={{transformOrigin: "center"}}
          variants={variants}
        />
      </motion.svg>
    </motion.div>
  );
}
