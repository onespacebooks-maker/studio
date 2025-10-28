import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  HeartPulse,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedCalendarDaysIcon } from '@/components/ui/animated-calendar-days-icon';
import { AnimatedScaleIcon } from '@/components/ui/animated-scale-icon';
import { AnimatedBotIcon } from '@/components/ui/animated-bot-icon';
import { AnimatedVideoIcon } from '@/components/ui/animated-video-icon';
import { AnimatedWalletIcon } from '@/components/ui/animated-wallet-icon';

const features = [
  {
    icon: <AnimatedCalendarDaysIcon className="h-8 w-8 text-primary" />,
    title: 'Appointment Booking',
    description: 'Book appointments with top doctors and hospitals in real-time.',
  },
  {
    icon: <AnimatedScaleIcon className="h-8 w-8 text-primary" />,
    title: 'Service Price Comparison',
    description: 'Compare treatment costs and insurance details across hospitals.',
  },
  {
    icon: <AnimatedBotIcon className="h-8 w-8 text-primary" />,
    title: 'AI Symptom Guide',
    description: 'Get guidance on the right medical department for your symptoms.',
  },
  {
    icon: <AnimatedVideoIcon className="h-8 w-8 text-primary" />,
    title: 'Teleconsultation',
    description: 'Schedule low-cost video calls with healthcare professionals.',
  },
  {
    icon: <AnimatedWalletIcon className="h-8 w-8 text-primary" />,
    title: 'Medical EMI & Health Wallet',
    description: 'Split bills into monthly payments and save for expenses.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Family Health Dashboard',
    description: 'Manage your entire family’s health records and appointments.',
  },
];

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <HeartPulse className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">
            CuraNet
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground tracking-tight">
                Your Health,
                <br />
                <span className="text-primary">Connected & Simplified.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg">
                CuraNet is your trusted partner in navigating the complexities
                of healthcare. From booking appointments to managing family
                health, we provide a seamless experience.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Explore Dashboard
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="bg-card/50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <p className="font-semibold text-primary">Our Features</p>
              <h3 className="text-3xl md:text-4xl font-headline font-bold">
                A Better Way to Manage Healthcare
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                CuraNet brings all your healthcare needs into one simple,
                powerful platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-card hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CuraNet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
