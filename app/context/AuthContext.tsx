'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type UserType = 'doctor' | 'hospital' | 'admin';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  isActive: boolean;
  hospitalName?: string;
  employeeCode?: string;
  profilePhotoUrl?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, userType?: UserType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Safe localStorage wrapper to prevent SSR issues
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const token = storage.getItem('token');

        if (token) {
          try {
            const response = await axios.get('/api/auth/validate', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(response.data.user);
          } catch (validationError) {
            console.error('Token validation failed:', validationError);
            storage.removeItem('token');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth validation error:', err);
        storage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [mounted]);

  const login = async (username: string, password: string, userType?: UserType) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/login', { username, password, userType });
      const { token, user } = response.data;

      if (userType && user.userType !== userType) {
        setError(`This account is not a ${userType} account. Please use the correct login page.`);
        setIsLoading(false);
        return;
      }

      storage.setItem('token', token);
      setUser(user);

      if (user.userType === 'doctor') {
        router.push('/doctor/dashboard');
      } else if (user.userType === 'hospital') {
        router.push('/hospital/dashboard');
      } else if (user.userType === 'admin') {
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    storage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const refreshUser = async () => {
    const token = storage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.get('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  const isAuthenticated = !!user;

  const contextValue = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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