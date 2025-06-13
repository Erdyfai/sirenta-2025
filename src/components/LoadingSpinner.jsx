import React from 'react';

export default function LoadingSpinner({ size = 'md', fullscreen = true }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const containerClass = fullscreen
    ? 'flex justify-center items-center min-h-screen'
    : 'flex justify-center items-center h-40'; // lokal: tinggi 160px

  return (
    <div className={containerClass}>
      <div
        className={`animate-spin rounded-full border-b-2 border-gray-900 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
