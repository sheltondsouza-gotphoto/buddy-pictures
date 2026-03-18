import React, { useRef, useCallback, useState, useEffect } from 'react';
import closeIcon from '../icons/Single tagging/Close.svg';
import clearAllIcon from '../icons/Multi-tagging/clear all.svg';
import groupIcon from '../icons/Multi-tagging/Group.svg';
import colors from '../colors';
import IconButton from './IconButton';
import { translations, mockTaggingModes } from '../mockData';

const SWIPE_THRESHOLD = 50;
const SWIPE_ANIMATION_MS = 250;

function SubjectCard({ taggingMode, selectedSubjects, onToggleTaggingMode, onClearSelected, onRemoveSubject, currentLanguage, modeSwitchStyle = 'v2' }) {
  const touchStartX = useRef(null);
  const pointerStartX = useRef(null);
  const containerRef = useRef(null);

  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState(0);

  const isMulti = taggingMode === mockTaggingModes.multi;

  const getCurrentX = useCallback((e) => {
    if (e.touches) return e.touches[0].clientX;
    return e.clientX;
  }, []);

  const getEndX = useCallback((e) => {
    if (e.changedTouches) return e.changedTouches[0].clientX;
    return e.clientX;
  }, []);

  const handlePointerStart = useCallback((e) => {
    if (isAnimating) return;
    const x = getCurrentX(e);
    touchStartX.current = x;
    pointerStartX.current = x;
    setDragOffset(0);
  }, [isAnimating, getCurrentX]);

  const handlePointerMove = useCallback((e) => {
    if (touchStartX.current === null) return;
    const x = getCurrentX(e);
    const delta = x - pointerStartX.current;
    setDragOffset(delta);
  }, [getCurrentX]);

  const handlePointerEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const endX = getEndX(e);
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    pointerStartX.current = null;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      const direction = deltaX > 0 ? 1 : -1;
      setExitDirection(direction);
      setIsAnimating(true);
      setDragOffset(direction * (containerRef.current?.offsetWidth ?? 400));
    } else {
      setDragOffset(0);
    }
  }, [getEndX]);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      onToggleTaggingMode();
      setIsAnimating(false);
      setExitDirection(0);
      setDragOffset(0);
    }, SWIPE_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [isAnimating, onToggleTaggingMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (touchStartX.current !== null && !e.touches) handlePointerMove(e);
    };
    const handleMouseUp = (e) => {
      if (touchStartX.current !== null && !e.touches) handlePointerEnd(e);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handlePointerMove, handlePointerEnd]);

  const translatePictureType = (type) => {
    switch(type) {
      case 'Individual': return translations[currentLanguage].filterIndividual;
      case 'Group': return translations[currentLanguage].filterGroup;
      case 'Family': return translations[currentLanguage].filterFamily;
      default: return type;
    }
  };

  const renderSingleTaggingSelected = (subject, modeSwitchButton) => (
    <div 
      className="border flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.main.white,
        borderColor: colors.neutral[200],
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p 
          className="font-inter font-bold text-base truncate"
          style={{ color: colors.communication.successText }}
        >
          {subject.name}
        </p>
        <p 
          className="font-inter font-normal text-xs truncate"
          style={{ color: colors.neutral[700] }}
        >
          {subject.pictureTypes.map(translatePictureType).join(' + ')}
        </p>
      </div>
      <div className="flex gap-2 items-center shrink-0">
        <IconButton iconSrc={closeIcon} altText={translations[currentLanguage].subjectCardClose} onClick={() => onRemoveSubject(subject.id)} className="size-10" />
        {modeSwitchButton}
      </div>
    </div>
  );

  const renderSingleTaggingNoneSelected = (modeSwitchButton) => (
    <div 
      className="border flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.main.white,
        borderColor: colors.neutral[200],
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <p 
        className="font-inter font-normal text-sm text-center flex-1"
        style={{ color: colors.neutral[800] }}
      >
        {translations[currentLanguage].subjectCardNoSubject}
      </p>
      {modeSwitchButton && (
        <div className="flex shrink-0">
          {modeSwitchButton}
        </div>
      )}
    </div>
  );

  const renderMultiTaggingSelected = (subjects, modeSwitchButton) => {
    const isMultiple = subjects.length > 1;
    
    return (
      <div 
        className={`flex ${isMultiple ? 'flex-col' : 'items-center justify-between'} px-3 py-2 rounded-lg w-full`}
        style={{ 
          backgroundColor: colors.main.white,
          borderColor: colors.neutral[800],
          borderWidth: '2px',
          borderStyle: 'solid'
        }}
      >
        {isMultiple ? (
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              {subjects.map((subject, index) => (
                <div key={index} className="flex gap-1 items-center py-1 w-full">
                  <IconButton iconSrc={closeIcon} altText={translations[currentLanguage].subjectCardClose} onClick={() => onRemoveSubject(subject.id)} className="size-10" />
                  <p 
                    className="font-inter font-bold text-base flex-1 truncate"
                    style={{ color: colors.communication.successText }}
                  >
                    {subject.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <IconButton iconSrc={clearAllIcon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClearSelected} className="size-10" />
              {modeSwitchButton}
            </div>
          </div>
        ) : (
          <>
            <p 
              className="font-inter font-bold text-base flex-1"
              style={{ color: colors.communication.successText }}
            >
              {subjects[0].name}
            </p>
            <div className="flex gap-2 items-center shrink-0">
              <IconButton iconSrc={clearAllIcon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClearSelected} className="size-10" />
              {modeSwitchButton}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderNoSubjectSelectedMultiTagging = (modeSwitchButton) => (
    <div 
      className="flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.main.white,
        borderColor: colors.neutral[800],
        borderWidth: '2px',
        borderStyle: 'solid'
      }}
    >
      <p 
        className="font-inter font-normal text-sm text-base flex-1"
        style={{ color: colors.neutral[800] }}
      >
        No subject selected
      </p>
      <div className="flex gap-2 items-center shrink-0">
        <IconButton iconSrc={clearAllIcon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClearSelected} className="size-10 opacity-40" />
        {modeSwitchButton}
      </div>
    </div>
  );

  const useSwipe = modeSwitchStyle === 'v2';
  const switchButtonLabel = isMulti
    ? translations[currentLanguage].subjectCardSwitchToSingle
    : translations[currentLanguage].subjectCardSwitchToMulti;

  const modeSwitchButton = !useSwipe ? (
    <IconButton
      iconSrc={groupIcon}
      altText={switchButtonLabel}
      onClick={(e) => {
        e.stopPropagation();
        onToggleTaggingMode();
      }}
      className="size-10"
      style={isMulti ? { backgroundColor: colors.neutral[800] } : {}}
      iconColor={isMulti ? colors.main.white : colors.interaction.main}
      iconStyle={!isMulti ? { filter: 'brightness(0)' } : {}}
    />
  ) : null;

  const cardContent = (() => {
    switch (taggingMode) {
      case 'single':
        return selectedSubjects.length > 0
          ? renderSingleTaggingSelected(selectedSubjects[0], modeSwitchButton)
          : renderSingleTaggingNoneSelected(modeSwitchButton);
      case 'multi':
        if (selectedSubjects.length === 0) {
          return renderNoSubjectSelectedMultiTagging(modeSwitchButton);
        }
        return renderMultiTaggingSelected(selectedSubjects, modeSwitchButton);
      default:
        return renderSingleTaggingNoneSelected(modeSwitchButton);
    }
  })();

  const swipeHintRight = translations[currentLanguage].subjectCardToMultiTag;
  const swipeHintLeft = translations[currentLanguage].subjectCardToSingleTag;

  if (!useSwipe) {
    return (
      <div className="w-full py-2 px-16">
        {cardContent}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full py-2 px-16 overflow-hidden relative"
      onTouchStart={handlePointerStart}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerEnd}
      onMouseDown={handlePointerStart}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggleTaggingMode();
        }
      }}
      aria-label={translations[currentLanguage].subjectCardSwipeHint}
    >
      {/* Hint text revealed as card swipes - left: To multi-tag (when in single), right: To single-tag (when in multi) */}
      <div className="absolute inset-0 flex pointer-events-none z-0">
        <div
          className="flex-1 flex items-center justify-center px-4 transition-opacity duration-200"
          style={{
            opacity: !isMulti && (dragOffset > 20 || exitDirection > 0) ? 1 : 0.12,
            color: colors.neutral[600]
          }}
        >
          <span className="font-inter font-normal text-sm">{swipeHintRight}</span>
        </div>
        <div
          className="flex-1 flex items-center justify-center px-4 transition-opacity duration-200"
          style={{
            opacity: isMulti && (dragOffset < -20 || exitDirection < 0) ? 1 : 0.12,
            color: colors.neutral[600]
          }}
        >
          <span className="font-inter font-normal text-sm">{swipeHintLeft}</span>
        </div>
      </div>

      {/* Swipeable card */}
      <div
        className="relative z-10 touch-none select-none"
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isAnimating ? `transform ${SWIPE_ANIMATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
          willChange: dragOffset !== 0 || isAnimating ? 'transform' : 'auto'
        }}
      >
        {cardContent}
      </div>
    </div>
  );
}

export default SubjectCard;
