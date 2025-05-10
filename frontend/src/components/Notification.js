import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Notification = ({ 
  type = 'success', 
  message, 
  isVisible, 
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          if (onClose) onClose();
          setIsClosing(false);
        }, 300);
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseTime, onClose]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
      setIsClosing(false);
    }, 300);
  };
  
  if (!isVisible) return null;
  
  let bgColor, icon, borderColor;
  
  switch (type) {
    case 'success':
      bgColor = 'bg-green-800';
      borderColor = 'border-green-500';
      icon = <FaCheckCircle className="text-green-400" />;
      break;
    case 'error':
      bgColor = 'bg-red-800';
      borderColor = 'border-red-500';
      icon = <FaExclamationCircle className="text-red-400" />;
      break;
    case 'warning':
      bgColor = 'bg-yellow-800';
      borderColor = 'border-yellow-500';
      icon = <FaExclamationCircle className="text-yellow-400" />;
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-800';
      borderColor = 'border-blue-500';
      icon = <FaInfoCircle className="text-blue-400" />;
  }
  
  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      <div className={`${bgColor} border-l-4 ${borderColor} rounded-md shadow-lg p-4 flex items-start`}>
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {icon}
        </div>
        <div className="flex-grow mr-3">
          <p className="text-white">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Notification;
