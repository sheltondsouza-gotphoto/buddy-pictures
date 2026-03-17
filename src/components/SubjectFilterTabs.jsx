import colors from '../colors';
import { translations } from '../mockData';

function Chips({ label, isActive, onClick }) {
  return (
    <div
      className="flex items-center justify-center px-4 relative rounded-[20px] shrink-0 cursor-pointer"
      onClick={onClick}
      style={{
        backgroundColor: isActive ? colors.interaction.highlight : (colors.neutral[0] || colors.main.white),
        borderColor: isActive ? colors.interaction.highlight : colors.neutral[300],
        borderWidth: isActive ? '2px' : '1px',
        borderStyle: 'solid'
      }}
    >
      <div 
        className="flex items-center justify-center px-2 relative shrink-0"
        style={{
          height: 'fit-content',
          paddingTop: '4px',
          paddingBottom: '4px'
        }}
      >
        <p 
          className="font-inter font-semibold leading-normal relative shrink-0 text-sm text-center tracking-normal whitespace-nowrap"
          style={{ color: isActive ? (colors.neutral[0] || colors.main.white) : colors.neutral[700] }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function SubjectFilterTabs({ filters, activeFilter, onFilterChange, currentLanguage }) {
  console.log('[SubjectFilterTabs] Rendering');
  return (
    <div className="flex items-center relative shrink-0 w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2 items-center relative p-8 min-w-max">
        {filters.map((filter) => (
          <Chips
            key={filter.id}
            label={translations[currentLanguage][filter.labelKey]}
            isActive={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SubjectFilterTabs;
