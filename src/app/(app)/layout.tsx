'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from '@/components/ui/loader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Wait until the loading is complete before checking for authentication.
    if (!isLoading && !isAuthenticated) {
        router.replace('/');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // While loading, or if not authenticated (and waiting for the redirect effect to run), show a loader.
  if (isLoading || !isAuthenticated) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader className="h-8 w-8" />
        </div>
    )
  }

  // If loading is complete and user is authenticated, render the layout with its children.
  return (
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
  );
}
