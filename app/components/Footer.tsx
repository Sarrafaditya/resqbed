'use client';

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-600 text-white py-4 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {currentYear} ResQBed | Serving hospitals across India
        </p>
      </div>
    </footer>
  );
};

export default Footer;