'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnimatedMenuIcon } from './ui/animated-menu-icon';
import { AnimatedDashboardIcon } from './ui/animated-dashboard-icon';
import { HeartIcon } from './ui/HeartIcon';
import { AnimatedBotIcon } from './ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from './ui/animated-calendar-days-icon';
import { AnimatedVideoIcon } from './ui/animated-video-icon';
import { AnimatedWalletIcon } from './ui/animated-wallet-icon';
import { motion } from 'framer-motion';
import { AnimatedPillIcon } from './ui/animated-pill-icon';
import { FileText, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/dashboard', icon: AnimatedDashboardIcon, label: 'Dashboard' },
  { href: '/symptom-guide', icon: AnimatedBotIcon, label: 'AI Symptom Guide' },
  {
    href: '/appointments',
    icon: AnimatedCalendarDaysIcon,
    label: 'Appointments',
  },
  { href: '/medicines', icon: AnimatedPillIcon, label: 'Medicines' },
  {
    href: '/compare-prices',
    icon: () => <Stethoscope className="h-5 w-5" />,
    label: 'Treatment Prices',
  },
  {
    href: '/teleconsultation',
    icon: AnimatedVideoIcon,
    label: 'Teleconsultation',
  },
  { href: '/wallet', icon: AnimatedWalletIcon, label: 'Health Wallet' },
  { href: '/government-policies', icon: () => <FileText className="h-5 w-5" />, label: 'Government Policies' },
];

export function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/login');
  };
  
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <motion.div whileHover={{ scale: 1.2 }}>
                <AnimatedMenuIcon className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <HeartIcon className="h-6 w-6 text-primary" />
                <span className="font-headline text-primary">Care Nexus</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === item.href
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold md:text-2xl font-headline">
          {title}
        </h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
