import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './ToastNotification.css';

function ToastNotification({ message, onClose }) {
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-content">
        <p className="toast-message">{message}</p>
        <button className="toast-close" onClick={onClose} aria-label={t('ariaClose')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ToastNotification;
