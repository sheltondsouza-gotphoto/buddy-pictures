import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Settings.css';

function Settings({ onBack }) {
  const { language, setLanguage } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);

  return (
    <div className="settings-container">
      <div className="list-header">
        <div className="list-header-left">
          <button className="back-button" onClick={onBack} aria-label={t('ariaBack')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="list-title">{t('settingsTitle')}</h2>
        </div>
      </div>
      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">{t('language')}</h3>
          <div className="language-selector">
            <button
              className={`language-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              {t('english')}
            </button>
            <button
              className={`language-option ${language === 'de' ? 'active' : ''}`}
              onClick={() => setLanguage('de')}
            >
              {t('german')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
