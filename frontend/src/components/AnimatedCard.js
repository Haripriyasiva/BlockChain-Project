import React from 'react';

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <div 
      className="transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
      style={{ 
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
