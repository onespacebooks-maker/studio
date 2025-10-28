"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedWalletIconProps extends HTMLMotionProps<"div"> {
    variants?: Variants;
}

export function AnimatedWalletIcon({ className, variants, ...props }: AnimatedWalletIconProps) {

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
        <motion.path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" variants={variants}/>
        <motion.path d="M3 5v14a2 2 0 0 0 2 2h16v-5" variants={variants}/>
        <motion.path
          d="M18 12a2 2 0 0 0 0 4h4v-4Z"
          style={{transformOrigin: "bottom right"}}
          variants={variants}
        />
      </motion.svg>
    </motion.div>
  );
}
