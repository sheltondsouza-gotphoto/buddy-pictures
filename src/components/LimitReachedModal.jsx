import React, { useState } from 'react';
import './LimitReachedModal.css';

function LimitReachedModal({ onClose }) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleOK = () => {
    // Pass the checkbox state to the parent component
    onClose(doNotShowAgain);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Limit Reached</h2>
        <p className="modal-message">
          You have reached the maximum number of subjects that can be tagged.
        </p>
        <div className="modal-checkbox-container">
          <label className="modal-checkbox-label">
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
              className="modal-checkbox"
            />
            <span>Do not show again</span>
          </label>
        </div>
        <button className="modal-button" onClick={handleOK}>
          OK
        </button>
      </div>
    </div>
  );
}

export default LimitReachedModal;
