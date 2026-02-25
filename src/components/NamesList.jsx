import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './List.css';
import CurrentlyChosen from './CurrentlyChosen';
import { useTagging } from '../context/TaggingContext';
import LimitReachedModal from './LimitReachedModal';
import ToastNotification from './ToastNotification';

function NamesList({ names, onBack, job, group, teacher }) {
  const { addCode, maxLimit, savedSubjects, showLimitModal, setShowLimitModal } = useTagging();
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);
  const [showToast, setShowToast] = useState(false);
  const [dontShowModal, setDontShowModal] = useState(false);

  const handleNameClick = (nameData) => {
    const result = addCode(nameData);
    
    if (result.success) {
      if (result.showLimitModal && !dontShowModal) {
        setShowLimitModal(true);
      }
    } else if (result.reason === 'limit_reached') {
      // Show toast notification
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCloseLimitModal = (doNotShowAgain) => {
    setShowLimitModal(false);
    if (doNotShowAgain) {
      setDontShowModal(true);
    }
  };

  return (
    <>
      <div className="list-container">
        <CurrentlyChosen />
        <div className="list-header">
          <div className="list-header-left">
            <button className="back-button" onClick={onBack} aria-label={t('ariaBack')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="list-title">{t('names')}</h2>
          </div>
          <button className="icon-button" aria-label={t('ariaSearch')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="#2B2851" strokeWidth="2"/>
              <path d="M20 20L16 16" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="list">
          {names.map((nameData, index) => {
            const isSelected = savedSubjects.some(subject => subject.name === nameData.name);
            const prevIsSelected = index > 0 && savedSubjects.some(subject => subject.name === names[index - 1]?.name);
            const nextIsSelected = index < names.length - 1 && savedSubjects.some(subject => subject.name === names[index + 1]?.name);
            
            // Show divider above if: not first item, current item not selected, previous item not selected
            const showDividerAbove = index > 0 && !isSelected && !prevIsSelected;
            // Show divider below if: not last item, current item not selected, next item not selected
            const showDividerBelow = index < names.length - 1 && !isSelected && !nextIsSelected;
            
            return (
              <React.Fragment key={nameData.name}>
                {showDividerAbove && <div className="list-divider"></div>}
                <div 
                  className={`list-item ${isSelected ? 'list-item-selected' : ''}`} 
                  onClick={() => handleNameClick(nameData)}
                >
                  <div className="list-item-text">
                    <p className={isSelected ? 'list-item-name-selected' : ''}>{nameData.name}</p>
                  </div>
                  {isSelected && (
                    <p className="list-item-active">{t('active')}</p>
                  )}
                </div>
                {showDividerBelow && <div className="list-divider"></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {showLimitModal && <LimitReachedModal onClose={handleCloseLimitModal} />}
      {showToast && (
        <ToastNotification 
          message={t('toastLimitMessage', { max: maxLimit })}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default NamesList;
