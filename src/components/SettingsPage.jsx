import React from 'react';
import colors from '../colors';
import { translations } from '../mockData';

function SettingsPage({ currentLanguage, onLanguageChange, modeSwitchStyle, onModeSwitchStyleChange, onNavigateBack }) {
  return (
    <div 
      className="flex flex-col items-start p-4 w-full min-h-0 flex-1 overflow-y-auto"
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <div className="flex items-center justify-between w-full mb-6">
        <h2 
          className="font-inter font-bold text-xl"
          style={{ color: colors.main.text }}
        >
          {translations[currentLanguage].settingsTitle}
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
          {translations[currentLanguage].settingsBack}
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4">
          <p 
            className="font-inter font-semibold text-base"
            style={{ color: colors.neutral[800] }}
          >
            {translations[currentLanguage].settingsLanguage}
          </p>
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="p-2 border rounded-md w-full"
            style={{ 
              borderColor: colors.neutral[300],
              backgroundColor: colors.main.white,
              color: colors.neutral[800]
            }}
          >
            <option value="en">English</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <p 
            className="font-inter font-semibold text-base"
            style={{ color: colors.neutral[800] }}
          >
            {translations[currentLanguage].settingsModeSwitchStyle}
          </p>
          <select
            value={modeSwitchStyle ?? 'v2'}
            onChange={(e) => onModeSwitchStyleChange(e.target.value)}
            className="p-2 border rounded-md w-full"
            style={{ 
              borderColor: colors.neutral[300],
              backgroundColor: colors.main.white,
              color: colors.neutral[800]
            }}
          >
            <option value="v1">{translations[currentLanguage].settingsModeSwitchV1}</option>
            <option value="v2">{translations[currentLanguage].settingsModeSwitchV2}</option>
            <option value="v3">{translations[currentLanguage].settingsModeSwitchV3}</option>
            <option value="v4">{translations[currentLanguage].settingsModeSwitchV4}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
