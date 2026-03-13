import React from 'react';
import closeIcon from '../icons/Single tagging/Close.svg';
import groupIcon from '../icons/Single tagging/Group.svg';
import clearAllIcon from '../icons/Multi-tagging/clear all.svg';
import colors from '../colors';
import IconButton from './IconButton';

function SubjectCard({ taggingMode, selectedSubjects, onToggleTaggingMode, onClearSelected, onRemoveSubject }) {
  const renderSingleTaggingSelected = (subject) => (
    <div 
      className="border flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.neutral[0] || colors.main.white,
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
          {subject.pictureTypes.join(' + ')}
        </p>
      </div>
      <div className="flex gap-1 items-center shrink-0">
        <IconButton iconSrc={closeIcon} altText="Close" onClick={() => onRemoveSubject(subject.id)} className="size-[24px] p-0" />
        <IconButton iconSrc={groupIcon} altText="Group" onClick={onToggleTaggingMode} className="size-[24px] p-0" />
      </div>
    </div>
  );

  const renderSingleTaggingNoneSelected = () => (
    <div 
      className="border flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.neutral[0] || colors.main.white,
        borderColor: colors.neutral[200],
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <p 
        className="font-inter font-normal text-sm text-center flex-1"
        style={{ color: colors.neutral[800] }}
      >
        No subject selected
      </p>
      
    </div>
  );

  const renderMultiTaggingSelected = (subjects) => {
    const isMultiple = subjects.length > 1;
    
    return (
      <div 
        className={`flex ${isMultiple ? 'flex-col' : 'items-center justify-between'} px-3 py-2 rounded-lg w-full`}
        style={{ 
          backgroundColor: colors.neutral[0] || colors.main.white,
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
                  <IconButton iconSrc={closeIcon} altText="Close" onClick={() => onRemoveSubject(subject.id)} className="size-[24px] p-0 shrink-0" />
                  <p 
                    className="font-inter font-bold text-base flex-1 truncate"
                    style={{ color: colors.communication.successText }}
                  >
                    {subject.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-1 items-center shrink-0">
              <IconButton iconSrc={clearAllIcon} altText="Clear All" onClick={onClearSelected} className="size-[24px] p-0" />
              <IconButton 
                iconSrc={groupIcon} 
                altText="Group" 
                onClick={onToggleTaggingMode}
                className="size-[24px] p-0"
                style={{ backgroundColor: colors.neutral[800] }}
                iconColor={colors.main.white}
              />
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
            <div className="flex gap-1 items-center shrink-0">
              <IconButton iconSrc={clearAllIcon} altText="Clear All" onClick={onClearSelected} className="size-[24px] p-0" />
              <IconButton 
                iconSrc={groupIcon} 
                altText="Group" 
                onClick={onToggleTaggingMode}
                className="size-[24px] p-0"
                style={{ backgroundColor: colors.neutral[800] }}
                iconColor={colors.main.white}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderNoSubjectSelectedMultiTagging = () => (
    <div 
      className="flex items-center justify-between px-3 py-2 rounded-lg w-full"
      style={{ 
        backgroundColor: colors.neutral[0] || colors.main.white,
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
      <div className="flex gap-1 items-center shrink-0">
        <IconButton iconSrc={clearAllIcon} altText="Clear All" onClick={onClearSelected} className="size-[24px] p-0 opacity-40" />
        <IconButton 
          iconSrc={groupIcon} 
          altText="Group" 
          onClick={onToggleTaggingMode}
          className="size-[24px] p-0"
          style={{ backgroundColor: colors.neutral[800] }}
          iconColor={colors.main.white}
        />
      </div>
    </div>
  );

  switch (taggingMode) {
    case 'single' : 
      return selectedSubjects.length > 0 ? renderSingleTaggingSelected(selectedSubjects[0]) : renderSingleTaggingNoneSelected();
    case 'multi' :
      if (selectedSubjects.length === 0) {
        return renderNoSubjectSelectedMultiTagging();
      } else {
        return renderMultiTaggingSelected(selectedSubjects);
      }
    default:
      return renderSingleTaggingNoneSelected();
  }
}

export default SubjectCard;
