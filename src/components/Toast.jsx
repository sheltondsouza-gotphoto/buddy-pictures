import React, { useEffect } from 'react';
import colors from '../colors';

function Toast({ message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      style={{ animation: 'slideDown 0.3s ease-out' }}
    >
      <div 
        className="flex items-center px-4 py-3 rounded-lg shadow-lg min-w-[280px] max-w-[90vw]"
        style={{ 
          backgroundColor: colors.neutral[800],
          color: colors.main.white
        }}
      >
        <p className="font-inter font-normal text-sm flex-1">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Toast;
