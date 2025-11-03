'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedScaleIconProps extends React.SVGProps<SVGSVGElement> {}

export function AnimatedScaleIcon({
  className,
  ...props
}: AnimatedScaleIconProps) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={cn('mr-2', className)}
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
        className="h-4 w-4"
        {...props}
      >
        <motion.path
          d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
          variants={{ hover: { y: [0, -1, 0] } }}
        />
        <motion.path
          d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
          variants={{ hover: { y: [0, 1, 0] } }}
        />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
      </motion.svg>
    </motion.div>
  );
}
