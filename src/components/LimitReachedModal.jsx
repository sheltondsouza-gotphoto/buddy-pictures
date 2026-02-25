import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';
import './LimitReachedModal.css';

function LimitReachedModal({ onClose }) {
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleOK = () => {
    // Pass the checkbox state to the parent component
    onClose(doNotShowAgain);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{t('limitReached')}</h2>
        <p className="modal-message">
          {t('limitReachedMessage')}
        </p>
        <div className="modal-checkbox-container">
          <label className="modal-checkbox-label">
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
              className="modal-checkbox"
            />
            <span>{t('doNotShowAgain')}</span>
          </label>
        </div>
        <button className="modal-button" onClick={handleOK}>
          {t('ok')}
        </button>
      </div>
    </div>
  );
}

export default LimitReachedModal;
