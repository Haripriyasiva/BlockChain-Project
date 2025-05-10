import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';

const Logo = ({ size = 'medium', showText = true }) => {
  let iconSize;
  let textSize;
  
  switch (size) {
    case 'small':
      iconSize = 'text-xl';
      textSize = 'text-lg';
      break;
    case 'large':
      iconSize = 'text-4xl';
      textSize = 'text-2xl';
      break;
    case 'medium':
    default:
      iconSize = 'text-2xl';
      textSize = 'text-xl';
  }
  
  return (
    <div className="flex items-center">
      <div className={`${iconSize} text-[#22c55e] mr-2`}>
        <FaHandHoldingHeart />
      </div>
      {showText && (
        <span className={`${textSize} font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#16a34a]`}>
          CommunityFund
        </span>
      )}
    </div>
  );
};

export default Logo;
