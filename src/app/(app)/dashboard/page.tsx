'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';
import { AnimatedBotIcon } from '@/components/ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from '@/components/ui/animated-calendar-days-icon';
import { AnimatedVideoIcon } from '@/components/ui/animated-video-icon';
import { AnimatedWalletIcon } from '@/components/ui/animated-wallet-icon';
import { AnimatedUsersIcon } from '@/components/ui/animated-users-icon';
import { motion } from 'framer-motion';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { AnimatedPillIcon } from '@/components/ui/animated-pill-icon';

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
};

const quickAccess = [
  {
    title: 'AI Symptom Guide',
    description: 'Confused about your symptoms?',
    icon: AnimatedBotIcon,
    href: '/symptom-guide',
  },
  {
    title: 'Book an Appointment',
    description: 'Find top doctors near you.',
    icon: AnimatedCalendarDaysIcon,
    href: '/appointments',
  },
  {
    title: 'Compare Treatment Prices',
    description: 'Check costs for treatments.',
    icon: AnimatedPillIcon,
    href: '/compare-prices',
  },
  {
    title: 'Start a Teleconsultation',
    description: 'Consult a doctor from home.',
    icon: AnimatedVideoIcon,
    href: '/teleconsultation',
  },
];

const appointments = [
  {
    doctor: 'Dr. Anjali Sharma',
    speciality: 'Cardiologist',
    time: 'Tomorrow, 10:30 AM',
    hospital: 'Apollo Hospital',
  },
  {
    doctor: 'Dr. Vikram Singh',
    speciality: 'Dermatologist',
    time: 'June 28, 2024, 3:00 PM',
    hospital: 'Fortis Clinic',
  },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Health Wallet
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedWalletIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupeeIcon size={24} className="mr-1" />
                5,231.89
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedCalendarDaysIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Dr. Sharma tomorrow
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Family Members
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedUsersIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                2 adults, 2 children
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Help?</CardTitle>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="text-primary-foreground/70"
              >
                <AnimatedBotIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Try our AI Symptom Guide to find the right specialist.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/symptom-guide">Start Guide</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                Manage your and your family's upcoming visits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {appt.doctor} ({appt.speciality})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appt.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appt.hospital}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/appointments">Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/appointments">
                  View All Appointments{' '}
                  <motion.div whileHover={{ x: 5 }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-8">
            {quickAccess.map((item) => (
              <Link href={item.href} key={item.title}>
                <Card className="hover:bg-muted transition-colors group">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      initial="initial"
                      whileHover="hover"
                      className="h-8 w-8 text-primary"
                    >
                      <item.icon className="w-full h-full" />
                    </motion.div>
                    <div>
                      <CardTitle className="font-headline">
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
