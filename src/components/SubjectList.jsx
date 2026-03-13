import React from 'react';
import SubjectListItem from './SubjectListItem';

function SubjectList({ subjects, activeSubjectId, selectedSubjectIds = [], onSubjectSelect }) {
  // Support both single (activeSubjectId) and multi-select (selectedSubjectIds)
  const isSubjectActive = (subjectId) => {
    if (selectedSubjectIds.length > 0) {
      return selectedSubjectIds.includes(subjectId);
    }
    return activeSubjectId === subjectId;
  };

  return (
    <div className="flex flex-col items-start relative shrink-0 w-full">
      {subjects.map((subject) => (
        <SubjectListItem
          key={subject.id}
          subject={subject}
          isActive={isSubjectActive(subject.id)}
          onClick={() => onSubjectSelect(subject.id)}
        />
      ))}
    </div>
  );
}

export default SubjectList;
