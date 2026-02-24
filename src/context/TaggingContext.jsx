import React, { createContext, useContext, useState } from 'react';

const TaggingContext = createContext();

export const useTagging = () => {
  const context = useContext(TaggingContext);
  if (!context) {
    throw new Error('useTagging must be used within TaggingProvider');
  }
  return context;
};

export const TaggingProvider = ({ children }) => {
  // tagging_mode: false = single_tag, true = multi_tag
  const [taggingMode, setTaggingMode] = useState(false); // Default: single_tag
  const [status, setStatus] = useState('empty'); // 'empty' or 'filled'
  const [savedSubjects, setSavedSubjects] = useState([]); // Array of name objects
  const maxLimit = 3; // Maximum number of subjects for multi-tagging
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [countdown, setCountdown] = useState(30); // Countdown timer state (persists across navigation)

  const toggleTaggingMode = () => {
    if (taggingMode) {
      // Switching from multi_tag to single_tag
      if (savedSubjects.length > 1) {
        // Show confirmation modal
        setShowConfirmModal(true);
      } else {
        // Single name or no names, just switch
        setTaggingMode(false);
        if (savedSubjects.length === 0) {
          setStatus('empty');
        } else if (savedSubjects.length === 1) {
          // Keep the single subject when switching to single_tag mode
          setStatus('filled');
        }
      }
    } else {
      // Switching from single_tag to multi_tag
      setTaggingMode(true);
      // If there's a single subject, keep it in the array (it's already there)
      if (savedSubjects.length === 0) {
        setStatus('empty');
      } else {
        // Keep existing subject(s) when switching to multi_tag
        setStatus('filled');
      }
    }
  };

  const handleConfirmTurnOff = () => {
    setTaggingMode(false);
    setStatus('empty');
    setSavedSubjects([]);
    setShowConfirmModal(false);
  };

  const handleCancelTurnOff = () => {
    setShowConfirmModal(false);
  };

  const addCode = (nameData) => {
    if (!taggingMode) {
      // Single tag mode: replace existing value
      setSavedSubjects([nameData]);
      setStatus('filled');
    } else {
      // Multi tag mode: check if name already exists
      const nameExists = savedSubjects.some(subject => subject.name === nameData.name);
      if (nameExists) {
        // Name already in list, do nothing
        return { success: false, reason: 'duplicate' };
      }
      
      // Check if we're transitioning from empty to filled (first subject added)
      const wasEmpty = savedSubjects.length === 0;
      
      // Multi tag mode
      if (savedSubjects.length === maxLimit) {
        // Already at limit, show toast
        // We'll handle this in the component that calls addCode
        return { success: false, reason: 'limit_reached' };
      } else if (savedSubjects.length + 1 === maxLimit) {
        // Will reach limit after adding, show modal then add
        setSavedSubjects([...savedSubjects, nameData]);
        setStatus('filled');
        // Reset countdown only when adding first subject (transitioning from empty to filled)
        if (wasEmpty) {
          setCountdown(30);
        }
        return { success: true, showLimitModal: true };
      } else {
        // Can add normally
        setSavedSubjects([...savedSubjects, nameData]);
        setStatus('filled');
        // Reset countdown only when adding first subject (transitioning from empty to filled)
        if (wasEmpty) {
          setCountdown(30);
        }
        return { success: true, showLimitModal: false };
      }
    }
    return { success: true, showLimitModal: false };
  };

  const removeCode = (index = null) => {
    if (!taggingMode) {
      // Single tag mode: clear everything
      setSavedSubjects([]);
      setStatus('empty');
    } else {
      // Multi tag mode: remove specific subject or all
      if (index !== null && index >= 0 && index < savedSubjects.length) {
        const newSubjects = savedSubjects.filter((_, i) => i !== index);
        setSavedSubjects(newSubjects);
        if (newSubjects.length === 0) {
          setStatus('empty');
        }
      } else {
        // Remove all
        setSavedSubjects([]);
        setStatus('empty');
      }
    }
  };

  const countdownTimerClearCodes = () => {
    // Remove all names and set status to empty, keep multi-tag mode on
    setSavedSubjects([]);
    setStatus('empty');
    // taggingMode stays true (multi-tag mode)
  };

  // Check if any modal is visible (pauses countdown)
  const isModalVisible = showConfirmModal || showLimitModal;

  const value = {
    taggingMode,
    status,
    savedSubjects,
    maxLimit,
    toggleTaggingMode,
    addCode,
    removeCode,
    countdownTimerClearCodes,
    showConfirmModal,
    handleConfirmTurnOff,
    handleCancelTurnOff,
    showLimitModal,
    setShowLimitModal,
    countdown,
    setCountdown,
    isModalVisible,
  };

  return (
    <TaggingContext.Provider value={value}>
      {children}
    </TaggingContext.Provider>
  );
};
