'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new user login page by default
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="h-8 w-8" />
    </div>
  );
}
