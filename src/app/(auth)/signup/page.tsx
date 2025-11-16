'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate signup
    setTimeout(() => {
      // In a real app, you'd use Firebase Auth here to create a user
      toast({
        title: 'Account Created!',
        description: "You've been successfully signed up. Redirecting...",
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleGoogleSignIn = () => {
    toast({
        title: "Coming Soon!",
        description: "Google Sign-In will be available in a future update."
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSignup}>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <HeartIcon className="text-primary" size={32} />
              <h1 className="text-2xl font-bold font-headline text-primary">
                Care Nexus
              </h1>
            </div>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Join our community to manage your healthcare with ease.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Signup Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up with Email'
              )}
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8S111.8 11.6 244 11.6c67.8 0 120.9 25.9 166.4 68.8L344.4 156c-40.4-38.2-90.1-62-154.4-62-108.8 0-197.3 90.1-197.3 200.2s88.5 200.2 197.3 200.2c114.7 0 174.5-80.3 181.8-122H244v-91h244z"></path></svg>
                Sign up with Google
            </Button>
          </CardContent>
          <CardDescription className="p-6 pt-0 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </CardDescription>
        </form>
      </Card>
    </div>
  );
}
