'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DashboardIcon } from './ui/dashboard-icon';
import { HeartIcon } from './ui/HeartIcon';
import { AnimatedBotIcon } from './ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from './ui/animated-calendar-days-icon';
import { AnimatedScaleIcon } from './ui/animated-scale-icon';
import { AnimatedVideoIcon } from './ui/animated-video-icon';
import { AnimatedWalletIcon } from './ui/animated-wallet-icon';
import { AnimatedUsersIcon } from './ui/animated-users-icon';

const navItems = [
  { href: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { href: '/symptom-guide', icon: AnimatedBotIcon, label: 'AI Symptom Guide' },
  { href: '/appointments', icon: AnimatedCalendarDaysIcon, label: 'Appointments' },
  { href: '/compare-prices', icon: AnimatedScaleIcon, label: 'Compare Prices' },
  { href: '/teleconsultation', icon: AnimatedVideoIcon, label: 'Teleconsultation' },
  { href: '/wallet', icon: AnimatedWalletIcon, label: 'Health Wallet' },
];

export function AppSidebar() {
  const pathname = usePathname();

  const getAnimationFor = (label: string): {variants: Variants} => {
    switch (label) {
      case 'Dashboard':
        return {
          variants: {
            initial: {},
            hover: {},
          },
        };
      case 'AI Symptom Guide':
        return {
          variants: {
            initial: { rotate: 0 },
            hover: { rotate: [0, 15, -15, 0], transition: { duration: 0.5 } },
          }
        };
      case 'Appointments':
        return {
          variants: {
            initial: { rotate: 0 },
            hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
          }
        };
      case 'Compare Prices':
        return {
          variants: {
            initial: { y: 0 },
            hover: { y: [-2, 2, -2, 0], transition: { duration: 0.5 } },
          }
        };
      case 'Teleconsultation':
        return {
          variants: {
            initial: { scale: 1 },
            hover: { scale: [1, 1.1, 1], transition: { duration: 0.5 } },
          }
        };
      case 'Health Wallet':
        return {
          variants: {
            initial: { y: 0 },
            hover: { y: [-2, 0], transition: { duration: 0.4 } },
          }
        };
      default:
        return { variants: {}};
    }
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <HeartIcon className="text-primary" size={32} />
          <h1 className="text-2xl font-bold font-headline text-primary">
            CuraNet
          </h1>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <motion.div initial="initial" whileHover="hover" variants={getAnimationFor(item.label).variants}>
                <item.icon className="mr-2 h-4 w-4" />
              </motion.div>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
            <motion.div initial="initial" whileHover="hover" variants={{initial: {}, hover: {x: [0, -1, 1, 0], transition: {duration: 0.5}}}}>
                <AnimatedUsersIcon className="mr-2 h-4 w-4" />
            </motion.div>
          Family Members
        </Button>
      </div>
    </aside>
  );
}
