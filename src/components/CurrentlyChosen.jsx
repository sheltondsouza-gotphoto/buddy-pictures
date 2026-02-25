import React from 'react';
import { useTagging } from '../context/TaggingContext';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import CountdownTimer from './CountdownTimer';
import './List.css';

function CurrentlyChosen() {
  const { status, taggingMode, savedSubjects, maxLimit, removeCode, toggleTaggingMode, countdownTimerClearCodes } = useTagging();
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);
  
  // Countdown timer is active if: multi-tag is on AND status is NOT empty
  // Inactive if: multi-tag is on AND status is empty
  const isCountdownActive = taggingMode && status !== 'empty';

  // Empty state for single_tag
  if (status === 'empty' && !taggingMode) {
    return (
      <div className="currently-chosen-section">
        <p className="currently-chosen-value">{t('noSubjectSelected')}</p>
        
      </div>
      
    );
  }

  // Empty state for multi_tag
  if (status === 'empty' && taggingMode) {
    return (
      <div className="currently-chosen-section currently-chosen-multi-empty">
        <p className="currently-chosen-value">{t('noSubjectSelected')}</p>
        <div className='multi-tag-bottom-bar'>
        <div className='multi-tag-bottom-bar-left'> 
          <div className="countdown-timer-group">
            <CountdownTimer 
              isActive={isCountdownActive} 
              onComplete={countdownTimerClearCodes}
              key={savedSubjects.length}
            />
          </div>
          <div className="multi-tag-capacity">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z"/></svg>
            <span className="multi-tag-fraction">{savedSubjects.length}/{maxLimit}</span>
          </div>
            </div>
            <button className="to-single-tag-button" onClick={toggleTaggingMode}>{t('toSingleTag')}</button>
        </div>
      </div>
    );
  }

  // Filled state for single_tag
  if (status === 'filled' && !taggingMode && savedSubjects.length > 0) {
    return (
      <div className="currently-chosen-section currently-chosen-filled">
        <div className="single-tag-header">
          <div className="single-tag-content">
            <p className="single-tag-name">{savedSubjects[0].name}</p>
            <p className="single-tag-status">{t('active')}</p>
          </div>
          <button 
            className="remove-button" 
            onClick={() => removeCode()}
            aria-label={t('ariaRemove')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className='single-tag-bottom-bar'>
          <button className="to-multi-tag-button" onClick={toggleTaggingMode}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('toMultiTag')}</span>
          </button>
        </div>
      </div>
    );
  }

  // Filled state for multi_tag
  if (status === 'filled' && taggingMode && savedSubjects.length > 0) {
    return (
      <div className="currently-chosen-section currently-chosen-multi-filled">
        <div className="multi-tag-subjects">
          {savedSubjects.map((subject, index) => (
            <div key={index} className="multi-tag-item">
              <p className="multi-tag-name-filled">{subject.name}</p>
              <button 
                className="remove-button-small" 
                onClick={() => removeCode(index)}
                aria-label={t('ariaRemove')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className='multi-tag-bottom-bar'>
          <div className='multi-tag-bottom-bar-left'> 
          <div className="countdown-timer-group">
            <CountdownTimer 
              isActive={isCountdownActive} 
              onComplete={countdownTimerClearCodes}
              key={savedSubjects.length}
            />
          </div>
          <div className="multi-tag-capacity">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(43, 40, 81, 0.1);"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z"/></svg>
            <span className="multi-tag-fraction">{savedSubjects.length}/{maxLimit}</span>
          </div>
            </div>
         
          <button className="to-single-tag-button" onClick={toggleTaggingMode}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('toSingleTag')}</span>
          </button>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="currently-chosen-section">
      <p className="currently-chosen-value">{t('noSubjectSelected')}</p>
    </div>
  );
}

export default CurrentlyChosen;
