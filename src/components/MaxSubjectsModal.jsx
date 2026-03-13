import React, { useState } from 'react';
import colors from '../colors';

function MaxSubjectsModal({ isOpen, onClose, onDoNotShowAgain }) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (doNotShowAgain) {
      onDoNotShowAgain();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleClose}
    >
      <div 
        className="flex flex-col gap-4 p-6 rounded-lg w-full max-w-sm mx-4"
        style={{ backgroundColor: colors.neutral[0] || colors.main.white }}
        onClick={(e) => e.stopPropagation()}
      >
        <p 
          className="font-inter font-semibold text-base"
          style={{ color: colors.neutral[800] }}
        >
          This is the maximum for your camera
        </p>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={doNotShowAgain}
            onChange={(e) => setDoNotShowAgain(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
            style={{ 
              accentColor: colors.interaction.highlight,
              minWidth: '20px',
              minHeight: '20px'
            }}
          />
          <span 
            className="font-inter font-normal text-sm"
            style={{ color: colors.neutral[700] }}
          >
            Do not show again
          </span>
        </label>

        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-colors"
          style={{ 
            backgroundColor: colors.interaction.highlight,
            color: colors.main.white
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.interaction.pressed;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.interaction.highlight;
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default MaxSubjectsModal;
