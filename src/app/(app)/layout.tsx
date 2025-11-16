
'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);


  useEffect(() => {
    // This check runs on the client-side
    // We give it a moment to ensure the auth state is settled
    const timer = setTimeout(() => {
        const token = localStorage.getItem('google-auth-token');
        if (!isAuthenticated && !token) {
            router.replace('/');
        } else {
            setIsVerifying(false);
        }
    }, 100); // A small delay can help prevent race conditions on initial load

    return () => clearTimeout(timer);

  }, [isAuthenticated, router]);
  
  if (isVerifying) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader className="h-8 w-8" />
        </div>
    )
  }

  return (
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
  );
}
