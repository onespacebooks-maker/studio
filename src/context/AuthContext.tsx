
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (userData: {email: string; username?: string; isSignUp?: boolean}) => boolean;
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // On initial load, try to get user from local storage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data in storage:", error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = (userData: {email: string; username?: string; isSignUp?: boolean}) => {
    const { email, username, isSignUp } = userData;
    try {
      // Handle signup
      if (isSignUp) {
        if (!username) return false; // Name is required for signup
        const newUser: User = {
          name: username,
          email: email,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        return true;
      }

      // Handle login
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const existingUser: User = JSON.parse(storedUser);
        // Check if both email and username match
        if (existingUser.email === email && existingUser.name === username) {
          setUser(existingUser);
          return true; // Login successful
        }
      }

      return false; // Login failed
    } catch (error) {
      console.error("Failed to sign in:", error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated, isLoading }}>
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
