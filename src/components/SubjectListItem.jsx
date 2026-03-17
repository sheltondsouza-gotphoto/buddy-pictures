import colors from '../colors';
import doneIcon from '../icons/Right icon-1.svg';
import familyIcon from '../icons/Family.svg';
import groupCancelledIcon from '../icons/Icon/group cancelled.svg';
import personCancelledIcon from '../icons/Icon/person cancelled.svg';

function SubjectListItem({ subject, isActive, isDone, registration, onClick }) {
  console.log('[SubjectListItem] Rendering');
  return (
    <div
      className="flex items-start relative shrink-0 w-full cursor-pointer"
      style={{
        backgroundColor: isActive ? colors.communication.successBg : colors.neutral[0],
        borderBottom: isActive ? 'none' : `1px solid ${colors.neutral[200]}`
      }}
      onClick={onClick}
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
          <p
            className={`font-inter font-normal text-base leading-normal relative shrink-0 text-right tracking-normal whitespace-nowrap ${!isActive ? 'invisible' : ''}`}
            style={{ color: colors.communication.successText }}
          >
            Active
          </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SubjectListItem;
