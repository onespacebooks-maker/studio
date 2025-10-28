'use client';

import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';

export function AnimatedIndianRupeeIcon({ className }: { className?: string }) {
  return (
    <motion.div
      whileHover={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.4,
      }}
    >
      <IndianRupee className={className} />
    </motion.div>
  );
}
