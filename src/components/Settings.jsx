import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './Settings.css';

function Settings({ onBack }) {
  const { language, setLanguage } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);

  return (
    <div className="settings-container">
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
