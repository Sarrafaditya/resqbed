'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

const HospitalLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const router = useRouter();
  const { login, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/hospital/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutTime) {
      interval = setInterval(() => {
        const remaining = Math.max(0, lockoutTime - Date.now());
        setTimeRemaining(Math.ceil(remaining / 1000));
        
        if (remaining <= 0) {
          setLockoutTime(null);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [lockoutTime]);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutTime) return;
    
    if (validateForm()) {
      try {
        // Add userType to login method for hospital-specific login
        await login(username.toLowerCase(), password, 'hospital');
      } catch (err) {
        // The error is already handled in the auth context
        setAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= 5) {
            setLockoutTime(Date.now() + 60000); // 1 minute lockout
            return 0; // Reset attempts after lockout
          }
          return newAttempts;
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Hospital Login</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {lockoutTime && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p>Too many failed attempts. Please wait {timeRemaining} seconds before trying again.</p>
        </div>
      )}
      
      
      
      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Hospital Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={errors.username}
          disabled={!!lockoutTime}
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
          disabled={!!lockoutTime}
        />
        
        <div className="flex items-center justify-between mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={!!lockoutTime}
          >
            Login
          </Button>
          
          <Link href="/register/hospital" className="text-sm text-red-600 hover:underline">
            Register Hospital
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:underline">
            ← Back to login options
          </Link>
        </div>
      </form>
    </div>
  );
};

export default HospitalLoginPage; 