import React from 'react';
import colors from '../colors';

function IconButton({ onClick, iconSrc, altText = '', className = '', style = {}, iconStyle = {}, iconColor = colors.interaction.main }) {
  const defaultStyle = { backgroundColor: 'transparent', ...style };
  const hasBgColor = style && style.backgroundColor;
  
  // Apply white filter if iconColor is white
  const iconFilter = iconColor === 'white' || iconColor === colors.main.white 
    ? { filter: 'brightness(0) invert(1)' }
    : {};
  
  const finalIconStyle = { ...iconFilter, ...iconStyle };
  
  return (
    <div 
      className={`flex items-center justify-center p-1 rounded-[40px] shrink-0 size-10 cursor-pointer transition-colors ${className}`}
      onClick={onClick}
      style={defaultStyle}
      onMouseEnter={(e) => {
        if (!hasBgColor) {
          e.currentTarget.style.backgroundColor = colors.neutral[100];
        } else {
          e.currentTarget.style.opacity = '0.9';
        }
      }}
      onMouseLeave={(e) => {
        if (!hasBgColor) {
          e.currentTarget.style.backgroundColor = 'transparent';
        } else {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      <img alt={altText} src={iconSrc} className="size-6" style={finalIconStyle} />
    </div>
  );
}

export default IconButton;
