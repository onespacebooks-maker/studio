'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  CalendarDays,
  HeartPulse,
  Scale,
  Users,
  Video,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DashboardIcon } from './ui/dashboard-icon';

const navItems = [
  { href: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { href: '/symptom-guide', icon: Bot, label: 'AI Symptom Guide' },
  { href: '/appointments', icon: CalendarDays, label: 'Appointments' },
  { href: '/compare-prices', icon: Scale, label: 'Compare Prices' },
  { href: '/teleconsultation', icon: Video, label: 'Teleconsultation' },
  { href: '/wallet', icon: Wallet, label: 'Health Wallet' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <HeartPulse className="h-8 w-8 text-primary" />
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
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Family Members
        </Button>
      </div>
    </aside>
  );
}
