import React from 'react';
import colors from '../colors';
import groupIcon from '../icons/Single tagging/Group.svg';

const imgScanCode = "https://www.figma.com/api/mcp/asset/32c4b41c-90a4-4747-b9ce-8af906f6ff94"; // Scan barcode
const imgDevices = "https://www.figma.com/api/mcp/asset/811e5f52-f9cf-42f9-ac27-a20dae8f0ccf"; // Entagged placeholder
const imgSettings = "https://www.figma.com/api/mcp/asset/f52374e7-49e2-43be-b94f-cdcf099328f7"; // Settings

function BottomNavigationItem({ iconSrc, label, isActive, onClick }) {
  const activeIconClasses = isActive
    ? `bg-[${colors.interaction.highlight}]`
    : "";
  const activeTextClasses = isActive
    ? `font-semibold text-[${colors.interaction.highlight}]`
    : `font-medium text-[${colors.neutral[500]}]`;

  return (
    <div className="flex flex-1 flex-col gap-0 items-center px-2 py-2 relative cursor-pointer" onClick={onClick}>
      <div className={`${activeIconClasses} flex items-center justify-center p-2 relative rounded-2xl shrink-0 size-10`}>
        <div className="relative shrink-0 size-6">
          <img alt={label} className="absolute block max-w-none size-full" src={iconSrc} />
        </div>
      </div>
      <p className={`${activeTextClasses} font-inter leading-normal relative shrink-0 text-xs text-center tracking-normal whitespace-nowrap`}>
        {label}
      </p>
    </div>
  );
}

function BottomNavigationBar({ activeItem, onNavigate }) {
  return (
      <div className={`bg-[${colors.neutral[0]}] flex h-[64px] items-center justify-around relative w-full border-t border-[${colors.neutral[200]}]`}>
      <BottomNavigationItem
        iconSrc={groupIcon}
        label="Name list"
        isActive={activeItem === 'nameList'}
        onClick={() => onNavigate('nameList')}
      />
      <BottomNavigationItem
        iconSrc={imgScanCode}
        label="Scan code"
        isActive={activeItem === 'scanCode'}
        onClick={() => onNavigate('scanCode')}
      />
      <BottomNavigationItem
        iconSrc={imgDevices}
        label="Devices"
        isActive={activeItem === 'devices'}
        onClick={() => onNavigate('devices')}
      />
      <BottomNavigationItem
        iconSrc={imgSettings}
        label="Settings"
        isActive={activeItem === 'settings'}
        onClick={() => onNavigate('settings')}
      />
    </div>
  );
}

export default BottomNavigationBar;
