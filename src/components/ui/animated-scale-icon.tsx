'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedScaleIconProps extends React.SVGProps<SVGSVGElement> {}

const scaleVariants = {
  hover: { y: [-2, 2, -2, 0], transition: { duration: 0.5 } },
};

export function AnimatedScaleIcon({
  className,
  ...props
}: AnimatedScaleIconProps) {
  return (
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
      variants={scaleVariants}
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" style={{ transformOrigin: 'center' }} />
      <path d="M12 3v18" style={{ transformOrigin: 'center' }} />
      <path d="M3 7h18" style={{ transformOrigin: 'center' }} />
    </motion.svg>
  );
}
