import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button-cancel" onClick={onCancel}>
            {cancelText || 'Cancel'}
          </button>
          <button className="modal-button-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
