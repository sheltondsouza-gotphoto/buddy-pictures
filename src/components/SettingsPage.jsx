import React from 'react';
import colors from '../colors';

function SettingsPage({ currentLanguage, onLanguageChange, onNavigateBack }) {
  return (
    <div 
      className="flex flex-col items-start p-4 w-full h-full"
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <div className="flex items-center justify-between w-full mb-6">
        <h2 
          className="font-inter font-bold text-xl"
          style={{ color: colors.main.text }}
        >
          Settings
        </h2>
        <button
          onClick={onNavigateBack}
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
          Back
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <p 
          className="font-inter font-semibold text-base"
          style={{ color: colors.neutral[800] }}
        >
          Language:
        </p>
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="p-2 border rounded-md w-full"
          style={{ 
            borderColor: colors.neutral[300],
            backgroundColor: colors.neutral[0],
            color: colors.neutral[800]
          }}
        >
          <option value="en">English</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
}

export default SettingsPage;
