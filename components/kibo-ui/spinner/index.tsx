'use client';

import React from 'react';

export type SpinnerVariant =
  | 'default'
  | 'throbber'
  | 'pinwheel'
  | 'circle-filled'
  | 'ellipsis'
  | 'ring'
  | 'bars'
  | 'infinite';

export interface SpinnerProps {
  variant?: SpinnerVariant;
  className?: string;
}

const SPOKES = 8;

export const Spinner = ({ variant = 'default', className = '' }: SpinnerProps) => {
  if (variant === 'throbber') {
    return (
      <>
        <style>{`
          @keyframes resqbed-throbber-fade {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 1; }
          }
        `}</style>
        <div
          className={`relative inline-block ${className}`}
          style={{ width: '1em', height: '1em' }}
          role="status"
          aria-label="Loading"
        >
          {Array.from({ length: SPOKES }).map((_, i) => {
            const rotation = (360 / SPOKES) * i;
            const delay = (i / SPOKES) * 1;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 bg-current rounded-full"
                style={{
                  width: '12%',
                  height: '30%',
                  transform: `rotate(${rotation}deg) translate(0, -140%)`,
                  transformOrigin: 'center',
                  animation: 'resqbed-throbber-fade 1s linear infinite',
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </>
    );
  }

  // Simple fallback for any other variant — a plain rotating ring
  return (
    <div
      className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
      style={{ width: '1em', height: '1em' }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;