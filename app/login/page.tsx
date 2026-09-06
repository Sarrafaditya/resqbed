'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../components/Button';

const LoginSelectionPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Login to ResQBed</h1>
      
      <p className="text-center mb-6">Please select your account type to login:</p>
      
      <div className="space-y-4">
        <Link href="/login/doctor" className="block w-full">
          <Button
            type="button"
            variant="primary"
            className="w-full py-3 flex items-center justify-center"
          >
            Login as Doctor
          </Button>
        </Link>
        
        <Link href="/login/hospital" className="block w-full">
          <Button
            type="button"
            variant="secondary"
            className="w-full py-3 flex items-center justify-center"
          >
            Login as Hospital
          </Button>
        </Link>
        
        <div className="text-center mt-6">
          <Link href="/register" className="text-sm text-red-600 hover:underline">
            Need an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage; 