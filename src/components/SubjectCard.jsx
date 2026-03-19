import React, { useRef, useCallback, useState, useEffect } from 'react';
import closeIcon from '../icons/Single tagging/Close.svg';
import clearAllIcon from '../icons/Multi-tagging/clear all.svg';
import clearAllV2Icon from '../icons/Multi-tagging/clear all v2.svg';
import groupIcon from '../icons/Multi-tagging/Group.svg';
import trashIcon from '../icons/Trash.svg';
import colors from '../colors';
import IconButton from './IconButton';
import { translations, mockTaggingModes } from '../mockData';

const SWIPE_THRESHOLD = 50;
const SWIPE_ANIMATION_MS = 250;
const SWIPE_DELETE_REVEAL_WIDTH = 52;

function SubjectCard({ taggingMode, selectedSubjects, onToggleTaggingMode, onClearSelected, onRemoveSubject, currentLanguage, modeSwitchStyle = 'v2' }) {
  const touchStartX = useRef(null);
  const pointerStartX = useRef(null);
  const containerRef = useRef(null);

  const [dragOffset, setDragOffset] = useState(0);
  const [swipingSubjectId, setSwipingSubjectId] = useState(null);
  const [swipeDeleteOffsets, setSwipeDeleteOffsets] = useState({});
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
    // v3/v4: block left swipe (multi→single) - card should not move
    if ((modeSwitchStyle === 'v3' || modeSwitchStyle === 'v4') && isMulti && delta < 0) {
      setDragOffset(0);
      return;
    }
    setDragOffset(delta);
  }, [getCurrentX, modeSwitchStyle, isMulti]);

  const handlePointerEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const endX = getEndX(e);
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    pointerStartX.current = null;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      const direction = deltaX > 0 ? 1 : -1;
      // v3/v4: block left swipe (multi→single) - do not trigger mode switch or animation
      if ((modeSwitchStyle === 'v3' || modeSwitchStyle === 'v4') && isMulti && direction < 0) {
        setDragOffset(0);
        return;
      }
      setExitDirection(direction);
      setIsAnimating(true);
      setDragOffset(direction * (containerRef.current?.offsetWidth ?? 400));
    } else {
      setDragOffset(0);
    }
  }, [getEndX, modeSwitchStyle, isMulti]);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      // v3/v4: only swipe single→multi; in multi, clear-all button is the only way to exit
      if ((modeSwitchStyle === 'v3' || modeSwitchStyle === 'v4') && isMulti && exitDirection < 0) {
        setIsAnimating(false);
        setExitDirection(0);
        setDragOffset(0);
        return;
      }
      onToggleTaggingMode();
      setIsAnimating(false);
      setExitDirection(0);
      setDragOffset(0);
    }, SWIPE_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [isAnimating, onToggleTaggingMode, modeSwitchStyle, isMulti, exitDirection]);

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

  const swipeDeleteStartX = useRef(null);
  const swipeDeleteOffsetAtStart = useRef(0);
  const handleSwipeDeleteStart = useCallback((e, subjectId) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    swipeDeleteStartX.current = x;
    swipeDeleteOffsetAtStart.current = swipeDeleteOffsets[subjectId] ?? 0;
    setSwipingSubjectId(subjectId);
  }, [swipeDeleteOffsets]);

  const handleSwipeDeleteMove = useCallback((e, subjectId) => {
    if (swipingSubjectId !== subjectId) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = x - swipeDeleteStartX.current;
    const newOffset = Math.min(SWIPE_DELETE_REVEAL_WIDTH, Math.max(0, swipeDeleteOffsetAtStart.current + delta));
    setSwipeDeleteOffsets((prev) => ({ ...prev, [subjectId]: newOffset }));
  }, [swipingSubjectId]);

  const handleSwipeDeleteEnd = useCallback((e, subjectId) => {
    if (swipingSubjectId !== subjectId) return;
    const threshold = SWIPE_DELETE_REVEAL_WIDTH / 2;
    setSwipeDeleteOffsets((prev) => {
      const current = prev[subjectId] ?? 0;
      return { ...prev, [subjectId]: current >= threshold ? SWIPE_DELETE_REVEAL_WIDTH : 0 };
    });
    swipeDeleteStartX.current = null;
    setSwipingSubjectId(null);
  }, [swipingSubjectId]);

  const handleSwipeDeleteCancel = useCallback(() => {
    setSwipingSubjectId(null);
    swipeDeleteStartX.current = null;
  }, []);

  const handleDeleteSubject = useCallback((e, subjectId) => {
    e.stopPropagation();
    onRemoveSubject(subjectId);
    setSwipeDeleteOffsets((prev) => {
      const next = { ...prev };
      delete next[subjectId];
      return next;
    });
    setSwipingSubjectId(null);
  }, [onRemoveSubject]);

  useEffect(() => {
    if (!swipingSubjectId) return;
    const handleMouseMove = (e) => handleSwipeDeleteMove(e, swipingSubjectId);
    const handleMouseUp = (e) => handleSwipeDeleteEnd(e, swipingSubjectId);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [swipingSubjectId, handleSwipeDeleteMove, handleSwipeDeleteEnd]);

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
    const clearIcon = (isV3 || isV4) ? clearAllV2Icon : clearAllIcon;
    const onClear = onClearSelected;
    const v3RightSection = (isV3 || isV4) ? (
      <div className="flex gap-2 items-center shrink-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleTaggingMode(); }}
          className="flex items-center justify-center size-10 rounded-[40px] shrink-0 cursor-pointer transition-colors"
          style={{ backgroundColor: '#2B2851', color: 'rgba(43, 40, 81, 1)' }}
          aria-label={translations[currentLanguage].subjectCardSwitchToSingle}
          title={translations[currentLanguage].subjectCardSwitchToSingle}
        >
          <img src={groupIcon} alt="" className="size-6" style={{ filter: 'brightness(0) invert(1)' }} />
        </button>
        <IconButton iconSrc={clearAllV2Icon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClear} className="size-10" />
      </div>
    ) : (
      <div className="flex gap-2 items-center shrink-0">
        <IconButton iconSrc={clearIcon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClear} className="size-10" />
        {modeSwitchButton}
      </div>
    );

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
                isV4 ? (
                  <div
                    key={subject.id}
                    className="relative overflow-hidden rounded-lg w-full"
                    style={{ borderBottom: '0px' }}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSubject(e, subject.id)}
                      className="absolute left-0 top-0 bottom-0 w-[52px] flex items-center justify-center shrink-0 z-0 cursor-pointer"
                      style={{ backgroundColor: colors.communication.criticalBg }}
                      aria-label={translations[currentLanguage].subjectCardClose}
                      title={translations[currentLanguage].subjectCardClose}
                    >
                      <img src={trashIcon} alt="" className="size-6" />
                    </button>
                    <div
                      className="relative flex gap-1 items-center py-1 px-1 min-h-[44px] touch-none select-none"
                      style={{
                        transform: `translateX(${swipeDeleteOffsets[subject.id] ?? 0}px)`,
                        transition: swipingSubjectId === subject.id ? 'none' : 'transform 0.2s ease-out',
                        backgroundColor: colors.main.white,
                      }}
                      onTouchStart={(e) => handleSwipeDeleteStart(e, subject.id)}
                      onTouchMove={(e) => handleSwipeDeleteMove(e, subject.id)}
                      onTouchEnd={(e) => handleSwipeDeleteEnd(e, subject.id)}
                      onTouchCancel={handleSwipeDeleteCancel}
                      onPointerDown={(e) => { e.button === 0 && handleSwipeDeleteStart(e, subject.id); }}
                      onPointerUp={(e) => { e.button === 0 && handleSwipeDeleteEnd(e, subject.id); }}
                      onPointerLeave={handleSwipeDeleteCancel}
                      onPointerCancel={handleSwipeDeleteCancel}
                    >
                      <p
                        className="font-inter font-bold text-base flex-1 truncate pl-2"
                        style={{ color: colors.communication.successText }}
                      >
                        {subject.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={subject.id} className="flex gap-1 items-center py-1 w-full">
                    <IconButton iconSrc={closeIcon} altText={translations[currentLanguage].subjectCardClose} onClick={() => onRemoveSubject(subject.id)} className="size-10" />
                    <p
                      className="font-inter font-bold text-base flex-1 truncate"
                      style={{ color: colors.communication.successText }}
                    >
                      {subject.name}
                    </p>
                  </div>
                )
              ))}
            </div>
            {v3RightSection}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p 
                className="font-inter font-bold text-base truncate"
                style={{ color: colors.communication.successText }}
              >
                {subjects[0].name}
              </p>
              {(isV3 || isV4) && (
                <p 
                  className="font-inter font-normal text-xs truncate"
                  style={{ color: colors.neutral[700] }}
                >
                  {translations[currentLanguage].subjectCardAddUpTo3}
                </p>
              )}
            </div>
            {v3RightSection}
          </>
        )}
      </div>
    );
  };

  const renderNoSubjectSelectedMultiTagging = (modeSwitchButton) => {
    const clearIcon = (isV3 || isV4) ? clearAllV2Icon : clearAllIcon;
    const onClear = onClearSelected;
    const v3RightSection = (isV3 || isV4) ? (
      <div className="flex gap-2 items-center shrink-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleTaggingMode(); }}
          className="flex items-center justify-center size-10 rounded-[40px] shrink-0 cursor-pointer transition-colors"
          style={{ backgroundColor: '#2B2851', color: 'rgba(43, 40, 81, 1)' }}
          aria-label={translations[currentLanguage].subjectCardSwitchToSingle}
          title={translations[currentLanguage].subjectCardSwitchToSingle}
        >
          <img src={groupIcon} alt="" className="size-6" style={{ filter: 'brightness(0) invert(1)' }} />
        </button>
        <IconButton iconSrc={clearAllV2Icon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClear} className="size-10 opacity-40" />
      </div>
    ) : (
      <div className="flex gap-2 items-center shrink-0">
        <IconButton iconSrc={clearIcon} altText={translations[currentLanguage].subjectCardClearAll} onClick={onClear} className="size-10 opacity-40" />
        {modeSwitchButton}
      </div>
    );

    return (
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
          Select up to 3 subjects
        </p>
        {v3RightSection}
      </div>
    );
  };

  const useSwipe = modeSwitchStyle === 'v2' || modeSwitchStyle === 'v3'; // v4 uses long-press on list, no swipe
  const isV3 = modeSwitchStyle === 'v3';
  const isV4 = modeSwitchStyle === 'v4';
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
          if ((isV3 || isV4) && isMulti) return;
          onToggleTaggingMode();
        }
      }}
      aria-label={translations[currentLanguage].subjectCardSwipeHint}
    >
      {/* Hint text revealed as card swipes - left: To multi-tag (when in single), right: To single-tag (when in multi, v2 only) */}
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
            opacity: isMulti && !isV3 && !isV4 && (dragOffset < -20 || exitDirection < 0) ? 1 : 0.12,
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
