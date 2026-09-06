import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { Providers } from './providers';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ResQBed - Hospital Referrals Across India',
  description: 'A platform to streamline referrals from local hospitals to higher hierarchy hospitals across India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex flex-col`}>
        <Providers>
          <HeaderNav />
          <main className="container mx-auto p-4 flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}