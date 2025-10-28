"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

interface AnimatedUsersIconProps extends HTMLMotionProps<"div"> {}

export function AnimatedUsersIcon({
  className,
  ...props
}: AnimatedUsersIconProps) {

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
        <motion.g>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="8" cy="7" r="4" />
        </motion.g>
        <motion.g>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
