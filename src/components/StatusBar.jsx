import React from 'react';
import colors from '../colors';

const imgTrafficLight = "https://www.figma.com/api/mcp/asset/c977a84d-070a-4612-b16c-b40b53f5cc94";
const imgIcon = "https://www.figma.com/api/mcp/asset/78625770-a96e-46a8-9c1c-fc79f3d81164"; // Chevron
const imgBatteryAndroid2 = "https://www.figma.com/api/mcp/asset/dd4a12f8-40b1-4ddf-9999-d298486d6a65";

function StatusIndicator({ className }) {
  return (
    <div className={className || ""}>
      <div className="flex items-center justify-center relative size-[20px]">
        <div className="relative shrink-0 size-[9px]">
          <img alt="" className="absolute block max-w-none size-full" src={imgTrafficLight} />
        </div>
      </div>
    </div>
  );
}

function Chevron({ className }) {
  return (
    <div className={className || "relative size-[16px]"}>
      <div className="absolute inset-[12.5%_8.33%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIcon} />
      </div>
    </div>
  );
}

function BatteryAndroid2({ className }) {
  return (
    <div className={className || "relative shrink-0 size-[16px]"}>
      <img alt="" className="absolute block max-w-none size-full" src={imgBatteryAndroid2} />
    </div>
  );
}

function StatusBar({ name = "M 3284791" }) {
  
  return (
    <div className="flex flex-col items-start relative w-full">
      <div 
        className="flex items-center justify-between px-4 py-2 relative shrink-0 w-full border-b"
        style={{
          backgroundColor: colors.neutral[0],
          borderColor: colors.neutral[200]
        }}
      >
        <div className="flex items-center relative shrink-0">
          <StatusIndicator className="flex items-center justify-center relative shrink-0 size-[20px]" />
          <p 
            className="font-inter font-bold text-sm tracking-normal whitespace-nowrap"
            style={{ color: colors.neutral[800] }}
          >
            {name}
          </p>
        </div>
        <div className="flex gap-2 items-center relative shrink-0">
          <div className="flex gap-[2px] items-center relative shrink-0">
            <Chevron className="relative shrink-0 size-[16px]" />
            <p 
              className="font-inter font-bold text-sm tracking-normal whitespace-nowrap"
              style={{ color: colors.neutral[800] }}
            >
              100K
            </p>
          </div>
          <div className="flex gap-[2px] items-center relative shrink-0">
            <BatteryAndroid2 className="relative shrink-0 size-[16px]" />
            <p 
              className="font-inter font-bold text-sm tracking-normal whitespace-nowrap"
              style={{ color: colors.neutral[800] }}
            >
              30%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
