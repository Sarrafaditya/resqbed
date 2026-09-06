'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const HeaderNav = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  // Use the user's uploaded photo if set, otherwise fall back to default
  const profileImage = user?.profilePhotoUrl || '/images/default-profile.png';

  useEffect(() => {
    console.log('HeaderNav rendered with auth state:', {
      isAuthenticated,
      user: user ? `${user.username} (${user.userType})` : 'none'
    });
  }, [isAuthenticated, user]);

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand - clicking logs out and returns home */}
        {isAuthenticated ? (
          <button
            onClick={() => logout()}
            className="text-2xl font-bold hover:opacity-90 transition-opacity"
          >
            ResQBed
          </button>
        ) : (
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
            ResQBed
          </Link>
        )}

        {/* Center content */}
        <div className="hidden sm:block text-sm font-medium">
          Serving hospitals across India
        </div>

        {/* Right profile section */}
        <div className="relative">
          {isAuthenticated ? (
            <div className="flex items-center">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="hidden sm:block text-sm mr-2">{user?.firstName} {user?.lastName}</span>
                <div className="h-10 w-10 rounded-full bg-white p-0.5 shadow-md overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover h-full w-full"
                  />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 top-full z-10 w-48 py-2 bg-white rounded-md shadow-xl">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-red-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                href="/login"
                className="px-3 py-1 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 bg-red-700 text-white rounded-md text-sm font-medium hover:bg-red-800 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;