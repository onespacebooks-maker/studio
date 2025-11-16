
'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// IMPORTANT: Replace this with your actual Google Client ID
const GOOGLE_CLIENT_ID = '708444926819-3vm66sorgriapree2dmi7st5o2q53316.apps.googleusercontent.com';

export function GoogleSignInButton() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const buttonDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !buttonDiv.current) {
        // If the google object isn't available yet, wait and try again.
        // This can happen on initial page load.
        setTimeout(() => {
            if (window.google && buttonDiv.current) {
                initializeGoogleSignIn();
            }
        }, 100);
      return;
    }
    
    initializeGoogleSignIn();

  }, []);

  function initializeGoogleSignIn() {
    try {
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
            buttonDiv.current!,
            { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with', shape: 'rectangular', width: '350'}
        );
    } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        toast({
            title: 'Sign-In Error',
            description: 'Could not initialize Google Sign-In. Please try again later.',
            variant: 'destructive',
        });
    }
  }


  function handleCredentialResponse(response: any) {
    if (response.credential) {
      signIn(response.credential);
      toast({
        title: 'Sign-In Successful',
        description: 'Welcome back!',
      });
    } else {
      console.error('Google Sign-In failed:', response);
      toast({
        title: 'Sign-In Failed',
        description: 'Could not sign you in with Google. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return <div ref={buttonDiv} className='flex justify-center'></div>;
}

// Add this to your global types or a dedicated types file (e.g., types/google.d.ts)
// to avoid TypeScript errors for the `window.google` object.
declare global {
  interface Window {
    google: any;
  }
}
