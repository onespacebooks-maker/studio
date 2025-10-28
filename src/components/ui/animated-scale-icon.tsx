"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedScaleIconProps extends HTMLMotionProps<"div"> {
    variants?: Variants;
}

export function AnimatedScaleIcon({ className, variants, ...props }: AnimatedScaleIconProps) {

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
        <motion.path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" variants={variants} />
        <motion.path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" variants={variants} />
        <motion.path
          d="M7 21h10"
          style={{ transformOrigin: "center" }}
          variants={variants}
        />
         <motion.path
          d="M12 3v18"
          style={{ transformOrigin: "center" }}
          variants={variants}
        />
        <motion.path
          d="M3 7h18"
          style={{ transformOrigin: "center" }}
          variants={variants}
        />
      </motion.svg>
    </motion.div>
  );
}
