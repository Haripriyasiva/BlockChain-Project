import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';

const Logo = ({ size = 'default' }) => {
  // Size classes
  const sizeClasses = {
    small: {
      container: 'h-8 w-8',
      icon: 'text-xl',
      text: 'text-lg'
    },
    default: {
      container: 'h-10 w-10',
      icon: 'text-2xl',
      text: 'text-xl'
    },
    large: {
      container: 'h-16 w-16',
      icon: 'text-4xl',
      text: 'text-3xl'
    }
  };
  
  const classes = sizeClasses[size] || sizeClasses.default;
  
  return (
    <div className="flex items-center">
      <div className={`${classes.container} rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20`}>
        <FaHandHoldingHeart className={`${classes.icon} text-white`} />
      </div>
      <span className={`ml-2 ${classes.text} font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300`}>
        CommunityFund
      </span>
    </div>
  );
};

export default Logo;
