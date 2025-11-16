
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export type User = {
  name: string;
  email: string;
  picture?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (token: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('google-auth-token');
    if (storedToken) {
      try {
        const decodedUser: User = jwtDecode(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('google-auth-token');
      }
    }
  }, []);

  const signIn = (token: string) => {
    try {
        const decodedUser: User = jwtDecode(token);
        setUser(decodedUser);
        localStorage.setItem('google-auth-token', token);
        router.push('/dashboard');
    } catch (error) {
        console.error("Failed to decode token:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('google-auth-token');
    router.push('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
