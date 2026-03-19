import React, { useRef, useState, useCallback } from 'react';
import colors from '../colors';
import doneIcon from '../icons/Right icon-1.svg';
import familyIcon from '../icons/Family.svg';
import groupCancelledIcon from '../icons/Icon/group cancelled.svg';
import personCancelledIcon from '../icons/Icon/person cancelled.svg';

const LONG_PRESS_MS = 2000;
const LOADER_DELAY_MS = 300; // Delay before showing loader to avoid flash on quick taps

function SubjectListItem({ subject, isActive, isDone, registration, onClick, enableLongPressAdd, onLongPressAdd }) {
  const longPressTimerRef = useRef(null);
  const loaderDelayRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (loaderDelayRef.current) {
      clearTimeout(loaderDelayRef.current);
      loaderDelayRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const handlePointerDown = useCallback(() => {
    if (!enableLongPressAdd || !onLongPressAdd || isLoading) return;
    longPressTimerRef.current = setTimeout(() => {
      longPressTimerRef.current = null;
      onLongPressAdd(subject);
      setIsLoading(false);
    }, LONG_PRESS_MS);
    loaderDelayRef.current = setTimeout(() => {
      loaderDelayRef.current = null;
      setIsLoading(true);
    }, LOADER_DELAY_MS);
  }, [enableLongPressAdd, onLongPressAdd, subject, isLoading]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimerRef.current) {
      clearLongPressTimer();
    }
  }, [clearLongPressTimer]);

  const handlePointerCancel = useCallback(() => {
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  return (
    <div
      className="flex items-start relative shrink-0 w-full cursor-pointer"
      style={{
        backgroundColor: isActive ? colors.communication.successBg : colors.neutral[0],
        borderBottom: isActive ? 'none' : `1px solid ${colors.neutral[200]}`
      }}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
    >
      <div className="flex flex-1 items-start relative">
        <div className="flex flex-1 gap-3 h-[48px] items-center px-4 py-3 relative rounded-lg">
          <div
            className={`flex items-center justify-center shrink-0 size-6 ${!isDone ? 'invisible w-0 overflow-hidden min-w-0' : ''}`}
          >
            <img id="done-icon" src={doneIcon} alt="Done" className="size-full" />
          </div>
          <div id="subject-name-and-registration-icons" className="flex flex-row gap-2 items-center justify-center">
          <p 
            className="font-inter font-normal text-base leading-normal relative shrink w-auto"
            style={{ color: isActive ? colors.communication.successText : colors.neutral[800] }}
          >
            {subject.name}
          </p>
          <div id="registration-icons"className="flex w-fit gap-2">
            {registration && registration.family && (
              <img src={familyIcon} alt="Family" className="size-16" />
            )}

            {registration && !registration.group && (
              <img src={groupCancelledIcon} alt="Group Cancelled" className="size-16" />
            )}
            {registration && !registration.individual && (
              <img src={personCancelledIcon} alt="Person Cancelled" className="size-16" />
            )}
          </div>
          </div>
          <div id="actions" className="flex flex-row gap-2 items-center justify-end w-full flex-1">
          {isLoading ? (
            <div
              className="size-6 rounded-full border-2 border-t-transparent shrink-0 loader-spinner"
              style={{ borderColor: colors.communication.successText, borderTopColor: 'transparent' }}
            />
          ) : (
            <p
              className={`font-inter font-normal text-base leading-normal relative shrink-0 text-right tracking-normal whitespace-nowrap ${!isActive ? 'invisible' : ''}`}
              style={{ color: colors.communication.successText }}
            >
              Active
            </p>
          )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SubjectListItem;
