import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Header.css';

function Header() {
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">{t('headerTitle')}</h1>
        <div className="header-actions">
          <button className="icon-button" aria-label={t('ariaAdd')}>
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
