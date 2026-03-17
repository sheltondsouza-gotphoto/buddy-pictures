import React from 'react';
import chevronLeftIcon from '../icons/Single tagging/Chevron Left.svg';
import editIcon from '../icons/Single tagging/Edit.svg';
import addCustomerIcon from '../icons/Single tagging/Add Customer.svg';
import colors from '../colors';
import IconButton from './IconButton';
import { translations } from '../mockData';

function AppHeader({ currentLanguage }) {
  console.log('[AppHeader] Rendering, IconButton type:', typeof IconButton, 'chevronLeftIcon:', typeof chevronLeftIcon);
  return (
    <div 
      className="flex flex-nowrap gap-5 h-14 items-center px-4 py-3 shrink-0 w-full z-50 shadow-[0px_1px_4px_0px_rgba(43,40,81,0.06),0px_2px_6px_0px_rgba(43,40,81,0.04)]"
      style={{ backgroundColor: colors.neutral[0] || colors.main.white }}
    >
      <div className="flex items-center shrink-0">
        <IconButton iconSrc={chevronLeftIcon} altText={translations[currentLanguage].settingsBack} />
      </div>
      
      <div className="flex-1 text-center">
        <p 
          className="font-inter font-semibold text-base leading-[1.4] tracking-[0.1px]"
          style={{ color: colors.main.text }}
        >
          Amy Waller
        </p>
      </div>
      
      <div className="flex gap-4 items-center shrink-0">
        <IconButton iconSrc={editIcon} altText={translations[currentLanguage].edit} />
        <IconButton iconSrc={addCustomerIcon} altText={translations[currentLanguage].addCustomer} />
      </div>
    </div>
  );
}

export default AppHeader;
