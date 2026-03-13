import colors from '../colors';

function SubjectListItem({ subject, isActive, onClick }) {
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
          <div className="flex flex-1 flex-col gap-[2px] items-start justify-center relative">
            <p 
              className="font-inter font-normal text-base leading-normal relative shrink-0 w-full"
              style={{ color: isActive ? colors.communication.successText : colors.neutral[800] }}
            >
              {subject.name}
            </p>
          </div>
          {isActive && (
            <p 
              className="font-inter font-normal text-base leading-normal relative shrink-0 text-right tracking-normal whitespace-nowrap"
              style={{ color: colors.communication.successText }}
            >
              Active
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectListItem;
