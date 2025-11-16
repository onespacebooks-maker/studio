
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
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // This check runs on the client-side
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('google-auth-token');
        if (!token) {
            router.replace('/');
        } else {
            setIsLoading(false);
        }
    }
  }, [isAuthenticated, router]);
  
  if (isLoading) {
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
