
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
    // This effect now correctly waits for the AuthContext to be fully resolved.
    // The `isAuthenticated` state from the context is now the single source of truth.
    if (isAuthenticated === false) { // Explicitly check for `false` after context has loaded
        const token = localStorage.getItem('google-auth-token');
        if (!token) {
            router.replace('/');
        } else {
             // If there is a token but context says not authenticated yet, we might still be loading.
             // A small delay can help if the context is slow to update.
             const timer = setTimeout(() => {
                if (!isAuthenticated) {
                    // router.replace('/');
                } else {
                    setIsVerifying(false);
                }
             }, 250);
             return () => clearTimeout(timer);
        }
    } else if (isAuthenticated === true) {
        setIsVerifying(false);
    }
    // If isAuthenticated is null (initial state), we just wait.
  }, [isAuthenticated, router]);
  
  if (isVerifying && !isAuthenticated) {
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

