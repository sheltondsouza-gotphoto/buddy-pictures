import React, { useEffect, useRef } from 'react';
import { useTagging } from '../context/TaggingContext';
import './CountdownTimer.css';

function CountdownTimer({ isActive, onComplete }) {
  const { countdown, setCountdown, isModalVisible } = useTagging();
  const intervalRef = useRef(null);

  // Handle countdown reaching 0
  useEffect(() => {
    if (isActive && countdown === 0 && onComplete && !isModalVisible) {
      onComplete();
    }
  }, [isActive, countdown, onComplete, isModalVisible]);

  // Countdown timer interval - pauses when modal is visible, resumes when closed
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start interval only if active and no modal visible
    // The interval will check countdown value internally and stop itself if needed
    if (isActive && !isModalVisible) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          // If already at 0, clear interval and stop
          if (prev <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          // Decrement countdown
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount or when conditions change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isModalVisible, setCountdown]); // Removed countdown from dependencies - interval manages its own state

  const progress = isActive ? (30 - countdown) / 30 : 0; // 0 to 1 as countdown goes from 30 to 0

  return (
    <div className="countdown-indicator">
      <svg className="countdown-circle" viewBox="0 0 24 24" width="24" height="24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="#E4E4E5"
          strokeWidth="2"
        />
        {isActive && (
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="#2B2851"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 10}`}
            strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress)}`}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
            className="countdown-progress"
          />
        )}
      </svg>
      <span className={`timer-text ${!isActive ? 'timer-inactive' : ''}`}>
        {isActive ? `${countdown}s` : '30s'}
      </span>
    </div>
  );
}

export default CountdownTimer;
