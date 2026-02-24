import React from 'react';
import './TopBar.css';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="entagged-name">
          <div className="status-indicator">
            <div className="status-dot"></div>
          </div>
          <span className="device-name">M 3284791</span>
        </div>
        <div className="device-details">
          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3C6.34 3 5 4.34 5 6C5 7.66 6.34 9 8 9C9.66 9 11 7.66 11 6C11 4.34 9.66 3 8 3Z" fill="#2B2851"/>
              <path d="M8 10C5.67 10 2 11.17 2 12.67V14H14V12.67C14 11.17 10.33 10 8 10Z" fill="#2B2851"/>
            </svg>
            <span>100K</span>
          </div>
          <div className="detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="12" height="8" rx="1" stroke="#2B2851" strokeWidth="1.5" fill="none"/>
              <path d="M4 6H12" stroke="#2B2851" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>30%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
