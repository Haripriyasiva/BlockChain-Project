import React from 'react';

const LoadingSpinner = ({ fullScreen = false, size = 'medium', color = 'emerald' }) => {
  // Size classes
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-t-2 border-b-2',
    large: 'h-16 w-16 border-4'
  };

  // Color classes
  const colorClasses = {
    emerald: 'border-emerald-500',
    teal: 'border-teal-400',
    white: 'border-white',
    gray: 'border-gray-300'
  };

  const spinnerClasses = `animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className={spinnerClasses}></div>
      </div>
    );
  }

  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner;
