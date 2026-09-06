'use client';

import React from 'react';
import Link from 'next/link';

const RegisterSelectionPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">Register for ResQBed</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <p className="text-lg text-gray-700 mb-8">
            Select the type of account you would like to create:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Doctor Registration Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">Doctor Registration</h2>
              <p className="text-gray-600 mb-6 text-center">
                Create an account as a doctor to refer patients to higher hierarchy hospitals.
              </p>
              <Link href="/register/doctor" className="btn-primary w-full text-center">
                Register as Doctor
              </Link>
            </div>
            
            {/* Hospital Registration Card */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">Hospital Registration</h2>
              <p className="text-gray-600 mb-6 text-center">
                Register your hospital to manage patient referrals and bed availability.
              </p>
              <Link href="/register/hospital" className="btn-primary w-full text-center">
                Register as Hospital
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 border-t text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-red-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelectionPage; 