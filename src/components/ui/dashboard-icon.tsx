'use client';

import { cn } from '@/lib/utils';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface DashboardIconProps extends HTMLMotionProps<'svg'> {
  size?: number;
}

const iconVariants = {
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300 },
  },
};

const DashboardIcon = ({
  className,
  size = 24,
  ...props
}: DashboardIconProps) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={iconVariants}
      whileHover="hover"
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
      <motion.rect width="7" height="9" x="3" y="3" rx="1" />
      <motion.rect width="7" height="5" x="14" y="3" rx="1" />
      <motion.rect width="7" height="9" x="14" y="12" rx="1" />
      <motion.rect width="7" height="5" x="3" y="16" rx="1" />
    </motion.svg>
  );
};

DashboardIcon.displayName = 'DashboardIcon';
export { DashboardIcon };
