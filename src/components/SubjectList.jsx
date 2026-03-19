import React from 'react';
import SubjectListItem from './SubjectListItem';

function SubjectList({ subjects, activeSubjectId, selectedSubjectIds = [], doneSubjectIds = [], onSubjectSelect, getSubjectRegistration, modeSwitchStyle, taggingMode, onLongPressAddSecondSubject }) {
  // Support both single (activeSubjectId) and multi-select (selectedSubjectIds)
  const isSubjectActive = (subjectId) => {
    if (selectedSubjectIds.length > 0) {
      return selectedSubjectIds.includes(subjectId);
    }
    return activeSubjectId === subjectId;
  };

  const isV4LongPressEnabled = modeSwitchStyle === 'v4' && taggingMode === 'single' && selectedSubjectIds.length === 1;

  return (
    <div className="flex flex-col items-start relative shrink-0 w-full">
      {subjects.map((subject) => (
        <SubjectListItem
          key={subject.id}
          subject={subject}
          isActive={isSubjectActive(subject.id)}
          isDone={doneSubjectIds.includes(subject.id) && !isSubjectActive(subject.id)}
          onClick={() => onSubjectSelect(subject.id)}
          registration={getSubjectRegistration(subject)}
          enableLongPressAdd={isV4LongPressEnabled && !selectedSubjectIds.includes(subject.id)}
          onLongPressAdd={onLongPressAddSecondSubject}
        />
      ))}
    </div>
  );
}

export default SubjectList;
