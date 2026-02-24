import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">Names List</h1>
        <div className="header-actions">
          <button className="icon-button" aria-label="Add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
