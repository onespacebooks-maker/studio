
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  name: string;
  email: string;
  picture?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (user: {email: string, name?: string}) => void;
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data in storage:", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = (userData: {email: string, name?: string}) => {
    // This function handles both login and signup.
    // If name is provided, it's a signup or a login where we have the name.
    // If name is not provided, it's a login, and we should rely on what's in storage.
    try {
        let userToStore: User;
        
        // This is a SIGNUP if a name is provided that wasn't there before
        if (userData.name) {
            userToStore = {
                name: userData.name,
                email: userData.email,
            };
        } else {
            // This is a LOGIN. Try to find user in localStorage.
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser: User = JSON.parse(storedUser);
                // Make sure the email matches
                if (parsedUser.email === userData.email) {
                    userToStore = parsedUser;
                } else {
                    // This case is unlikely but handles weird state. Default to email-based name.
                     userToStore = {
                        name: userData.email.split('@')[0],
                        email: userData.email,
                    };
                }
            } else {
                 // If no user in storage on login, create a temporary one.
                 // This might happen on the very first login before signup is forced.
                 userToStore = {
                    name: userData.email.split('@')[0],
                    email: userData.email,
                };
            }
        }

        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        router.push('/dashboard');
    } catch (error) {
        console.error("Failed to sign in:", error);
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
