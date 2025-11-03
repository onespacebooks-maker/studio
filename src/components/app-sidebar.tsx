'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './ui/HeartIcon';
import { AnimatedBotIcon } from './ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from './ui/animated-calendar-days-icon';
import { AnimatedScaleIcon } from './ui/animated-scale-icon';
import { AnimatedVideoIcon } from './ui/animated-video-icon';
import { AnimatedWalletIcon } from './ui/animated-wallet-icon';
import { AnimatedDashboardIcon } from './ui/animated-dashboard-icon';
import { AnimatedUsersIcon } from './ui/animated-users-icon';
import { Lightbulb } from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: AnimatedDashboardIcon, label: 'Dashboard' },
  { href: '/symptom-guide', icon: Lightbulb, label: 'AI Symptom Guide' },
  { href: '/appointments', icon: AnimatedCalendarDaysIcon, label: 'Appointments' },
  { href: '/compare-prices', icon: AnimatedScaleIcon, label: 'Compare Prices' },
  { href: '/teleconsultation', icon: AnimatedVideoIcon, label: 'Teleconsultation' },
  { href: '/wallet', icon: AnimatedWalletIcon, label: 'Health Wallet' },
];


export function AppSidebar() {
  const pathname = usePathname();

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
              className="w-full justify-start group"
              asChild
            >
              <Link href={item.href}>
                  <item.icon initial="initial" whileHover="hover" />
                {item.label}
              </Link>
            </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start group">
            <AnimatedUsersIcon initial="initial" whileHover="hover" />
          Family Members
        </Button>
      </div>
    </aside>
  );
}
