import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './List.css';
import CurrentlyChosen from './CurrentlyChosen';

function GroupsList({ groups, onGroupClick, onBack, job }) {
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);

  return (
    <div className="list-container">
      <CurrentlyChosen />
      <div className="list-header">
        <div className="list-header-left">
          <button className="back-button" onClick={onBack} aria-label={t('ariaBack')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="list-title">{t('groups')}</h2>
        </div>
        <button className="icon-button" aria-label={t('ariaSearch')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="#2B2851" strokeWidth="2"/>
            <path d="M20 20L16 16" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="list">
        {groups.map((group, index) => (
          <React.Fragment key={group}>
            {index > 0 && <div className="list-divider"></div>}
            <div className="list-item" onClick={() => onGroupClick(group)}>
              <div className="list-item-text">
                <p>{group}</p>
              </div>
              <div className="list-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default GroupsList;
