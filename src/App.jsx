import React, { useState, useEffect, useRef } from 'react';
import AppHeaderMod from './components/AppHeader';
import StatusBarMod from './components/StatusBar';
import SubjectCardMod from './components/SubjectCard';
import SubjectFilterTabsMod from './components/SubjectFilterTabs';
import SubjectListMod from './components/SubjectList';
import BottomNavigationBarMod from './components/BottomNavigationBar';
import MaxSubjectsModalMod from './components/MaxSubjectsModal';
import SwitchModeModalMod from './components/SwitchModeModal';
import ToastMod from './components/Toast';
import { mockSubjects, mockFilters, mockTaggingModes, translations } from './mockData';
import SettingsPageMod from './components/SettingsPage';
import searchIcon from './icons/Single tagging/Search.svg';
import './index.css'; // Import Tailwind CSS
import './typography.css'; // Import custom typography
import colors from './colors';

console.log('[App.jsx] MODULE LOADING - top of file');

// Resolve default exports (fixes "Element type is invalid: got object" from mixed default/named exports)
const AppHeader = AppHeaderMod?.default ?? AppHeaderMod;
const StatusBar = StatusBarMod?.default ?? StatusBarMod;
const SubjectCard = SubjectCardMod?.default ?? SubjectCardMod;
const SubjectFilterTabs = SubjectFilterTabsMod?.default ?? SubjectFilterTabsMod;
const SubjectList = SubjectListMod?.default ?? SubjectListMod;
const BottomNavigationBar = BottomNavigationBarMod?.default ?? BottomNavigationBarMod;
const MaxSubjectsModal = MaxSubjectsModalMod?.default ?? MaxSubjectsModalMod;
const SwitchModeModal = SwitchModeModalMod?.default ?? SwitchModeModalMod;
const Toast = ToastMod?.default ?? ToastMod;
const SettingsPage = SettingsPageMod?.default ?? SettingsPageMod;

// Debug: log component types to find invalid element (object instead of function)
console.log('[App.jsx] Component types:', {
  AppHeader: typeof AppHeader,
  StatusBar: typeof StatusBar,
  SubjectCard: typeof SubjectCard,
  SubjectFilterTabs: typeof SubjectFilterTabs,
  SubjectList: typeof SubjectList,
  BottomNavigationBar: typeof BottomNavigationBar,
  MaxSubjectsModal: typeof MaxSubjectsModal,
  SwitchModeModal: typeof SwitchModeModal,
  Toast: typeof Toast,
  SettingsPage: typeof SettingsPage,
  searchIcon: typeof searchIcon,
});


const DO_NOT_SHOW_MAX_SUBJECTS_KEY = 'doNotShowMaxSubjectsModal';
const DO_NOT_SHOW_SWITCH_MODE_KEY = 'doNotShowSwitchModeModal';
const LANGUAGE_KEY = 'appLanguage';
const MODE_SWITCH_STYLE_KEY = 'modeSwitchStyle';

function App() {
  console.log('[App.jsx] App() rendering...');

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [taggingMode, setTaggingMode] = useState(mockTaggingModes.single);
  const [activeTab, setActiveTab] = useState('nameList');
  // eslint-disable-next-line no-unused-vars
  const [isTabletView] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem(LANGUAGE_KEY) || 'en');
  const [modeSwitchStyle, setModeSwitchStyle] = useState(localStorage.getItem(MODE_SWITCH_STYLE_KEY) || 'v2');
  const [showMaxSubjectsModal, setShowMaxSubjectsModal] = useState(false);
  const [doNotShowMaxSubjectsModal, setDoNotShowMaxSubjectsModal] = useState(false);
  const [showSwitchModeModal, setShowSwitchModeModal] = useState(false);
  const [doNotShowSwitchModeModal, setDoNotShowSwitchModeModal] = useState(false);
  const [pendingModeSwitch, setPendingModeSwitch] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [doneSubjectIds, setDoneSubjectIds] = useState([]);
  const [headersVisible, setHeadersVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 10;

  useEffect(() => {
    const storedPreference = localStorage.getItem(DO_NOT_SHOW_MAX_SUBJECTS_KEY);
    if (storedPreference === 'true') {
      setDoNotShowMaxSubjectsModal(true);
    }
    const storedSwitchPreference = localStorage.getItem(DO_NOT_SHOW_SWITCH_MODE_KEY);
    if (storedSwitchPreference === 'true') {
      setDoNotShowSwitchModeModal(true);
    }
    const storedModeSwitchStyle = localStorage.getItem(MODE_SWITCH_STYLE_KEY);
    if (storedModeSwitchStyle === 'v1' || storedModeSwitchStyle === 'v2') {
      setModeSwitchStyle(storedModeSwitchStyle);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'nameList') {
      setHeadersVisible(true);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        setHeadersVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
        setHeadersVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const handleModeSwitchStyleChange = (style) => {
    setModeSwitchStyle(style);
    localStorage.setItem(MODE_SWITCH_STYLE_KEY, style);
  };

  const handleFilterChange = (filterId) => {
    if (activeFilter === filterId) {
      setActiveFilter('all');
    } else {
      setActiveFilter(filterId);
    }
  };

  const handleSubjectSelect = (subjectId) => {
    const subject = mockSubjects.find(sub => sub.id === subjectId);
    if (!subject) return;

    if (taggingMode === mockTaggingModes.single) {
      if (!doneSubjectIds.includes(subjectId)) {
        setDoneSubjectIds([...doneSubjectIds, subjectId]);
      }
      setSelectedSubjects(selectedSubjects[0]?.id === subjectId ? [] : [subject]);
    } else if (taggingMode === mockTaggingModes.multi) {
      const isAlreadySelected = selectedSubjects.some(sub => sub.id === subjectId);
      if (isAlreadySelected) {
        setSelectedSubjects(selectedSubjects.filter(sub => sub.id !== subjectId));
      } else if (selectedSubjects.length < 3) {
        if (!doneSubjectIds.includes(subjectId)) {
          setDoneSubjectIds([...doneSubjectIds, subjectId]);
        }
        if (selectedSubjects.length === 2 && !doNotShowMaxSubjectsModal) {
          setShowMaxSubjectsModal(true);
        }
        // Still add the subject even if modal is shown
        setSelectedSubjects([...selectedSubjects, subject]);
      } else if (selectedSubjects.length >= 3) {
        // Show toast when trying to select a 4th subject
        setShowToast(true);
      }
    }
  };

  const handleCloseMaxSubjectsModal = () => {
    setShowMaxSubjectsModal(false);
  };

  const handleDoNotShowAgain = () => {
    setDoNotShowMaxSubjectsModal(true);
    localStorage.setItem(DO_NOT_SHOW_MAX_SUBJECTS_KEY, 'true');
  };

  const removeSubject = (subjectId) => {
    setSelectedSubjects(selectedSubjects.filter(sub => sub.id !== subjectId));
  };

  const clearSelectedSubjects = () => {
    setSelectedSubjects([]);
  };

  const toggleTaggingMode = () => {
    const isCurrentlyMulti = taggingMode === mockTaggingModes.multi;

    if (isCurrentlyMulti) {
      // Switching from multi to single
      if (selectedSubjects.length > 1) {
        if (!doNotShowSwitchModeModal) {
          setPendingModeSwitch(mockTaggingModes.single);
          setShowSwitchModeModal(true);
        } else {
          setTaggingMode(mockTaggingModes.single);
          setSelectedSubjects([]); // Clear them since they bypassed the modal
        }
      } else {
        // 0 or 1 subject selected, switch immediately without clearing
        setTaggingMode(mockTaggingModes.single);
      }
    } else {
      // Switching from single to multi
      setTaggingMode(mockTaggingModes.multi);
    }
  };

  const handleSwitchModeConfirm = () => {
    if (pendingModeSwitch) {
      setTaggingMode(pendingModeSwitch);
      setSelectedSubjects([]);
      setPendingModeSwitch(null);
    }
  };

  const handleSwitchModeCancel = () => {
    setPendingModeSwitch(null);
    setShowSwitchModeModal(false);
  };

  const handleDoNotShowSwitchMode = () => {
    setDoNotShowSwitchModeModal(true);
    localStorage.setItem(DO_NOT_SHOW_SWITCH_MODE_KEY, 'true');
  };


  const filteredSubjects = mockSubjects.filter(subject => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'toDo') return subject.category === 'To do';
    if (activeFilter === 'absentees') return subject.category === 'Absentees';
    if (activeFilter === 'individual') return subject.pictureTypes.includes('Individual');
    if (activeFilter === 'group') return subject.pictureTypes.includes('Group');
    if (activeFilter === 'family') return subject.pictureTypes.includes('Family');
    return true;
  });

  console.log('[App.jsx] About to return JSX, activeTab:', activeTab);

  const headerHeight = 93;

  return (
    <div 
      className={`min-h-screen flex flex-col items-center shadow-elevation-shadow-sm justify-between ${isTabletView ? 'w-tablet' : 'w-phone'}`}
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-transform duration-300 ease-out"
        style={{
          transform: (activeTab === 'settings' || headersVisible) ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="w-full mx-auto bg-white">
          {console.log('[App.jsx] Rendering AppHeader...')}
          <AppHeader currentLanguage={currentLanguage} />
          {activeTab !== 'settings' && (
            <>
              {console.log('[App.jsx] Rendering StatusBar...')}
              <StatusBar name={translations[currentLanguage].statusBarName} />
            </>
          )}
        </div>
      </div>
      {activeTab === 'settings' ? (
        <div className="flex flex-col flex-1 min-h-0 w-full">
          <div style={{ height: 56, flexShrink: 0 }} aria-hidden="true" />
          <SettingsPage 
            currentLanguage={currentLanguage} 
            onLanguageChange={handleLanguageChange}
            modeSwitchStyle={modeSwitchStyle}
            onModeSwitchStyleChange={handleModeSwitchStyleChange}
            onNavigateBack={() => setActiveTab('nameList')}
          />
        </div>
      ) : (
        <>
          <div style={{ height: headerHeight, flexShrink: 0 }} aria-hidden="true" />
          <div 
            className="sticky top-0 z-10 w-full shrink-0"
            style={{ backgroundColor: colors.background.lightGray }}
          >
            {console.log('[App.jsx] Rendering SubjectCard...')}
            <SubjectCard 
              taggingMode={taggingMode} 
              selectedSubjects={selectedSubjects} 
              onToggleTaggingMode={toggleTaggingMode}
              onClearSelected={clearSelectedSubjects}
              onRemoveSubject={removeSubject}
              currentLanguage={currentLanguage}
              modeSwitchStyle={modeSwitchStyle}
            />
          </div>
          <div 
            className="flex flex-col gap-2 h-full items-start overflow-clip p-16 relative w-full flex-1"
            style={{ backgroundColor: colors.background.lightGray }}
          >
            <div 
              className="flex flex-col gap-4 items-start overflow-clip p-16 relative rounded-[16px] w-full"
              style={{ 
                backgroundColor: colors.neutral[0] || colors.main.white,
                border: `1px solid ${colors.neutral[200]}`
              }}
            >
              <div className="flex flex-col gap-2 items-start relative w-full">
                <div className="flex flex-col gap-3 items-start relative w-full">
                  <div className="flex gap-3 items-center justify-between relative w-full">
                    <p 
                      className="font-inter font-semibold text-base leading-[1.4] tracking-[0.1px] whitespace-nowrap"
                      style={{ color: colors.neutral[800] }}
                    >
                      {translations[currentLanguage].subjectsTitle}
                    </p>
                    <div className="flex gap-2 items-center justify-center p-1 relative rounded-[40px] shrink-0 size-8">
                      <div className="relative size-6">
                        <img alt="Search" className="absolute block max-w-none size-full" src={searchIcon} />
                      </div>
                    </div>
                  </div>
                </div>
                <SubjectFilterTabs 
                  filters={mockFilters} 
                  activeFilter={activeFilter} 
                  onFilterChange={handleFilterChange} 
                  currentLanguage={currentLanguage}
                />
              </div>
              {console.log('[App.jsx] Rendering SubjectFilterTabs done, now SubjectList...')}
              <SubjectList 
                subjects={filteredSubjects} 
                activeSubjectId={selectedSubjects[0]?.id} 
                selectedSubjectIds={selectedSubjects.map(sub => sub.id)}
                doneSubjectIds={doneSubjectIds}
                onSubjectSelect={handleSubjectSelect} 
                getSubjectRegistration={(subject) => ({
                  individual: subject.pictureTypes.includes('Individual'),
                  group: subject.pictureTypes.includes('Group'),
                  family: subject.pictureTypes.includes('Family'),
                })}
              />
            </div>
          </div>
        </>
      )}
      {console.log('[App.jsx] Rendering BottomNavigationBar...')}
      <BottomNavigationBar activeItem={activeTab} onNavigate={setActiveTab} currentLanguage={currentLanguage} className="fixed bottom-0"       />
      {console.log('[App.jsx] Rendering MaxSubjectsModal, Toast, SwitchModeModal...')}
      <MaxSubjectsModal 
        isOpen={showMaxSubjectsModal}
        onClose={handleCloseMaxSubjectsModal}
        onDoNotShowAgain={handleDoNotShowAgain}
        currentLanguage={currentLanguage}
      />
      <Toast 
        message={translations[currentLanguage].maxCodesToast}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <SwitchModeModal 
        isOpen={showSwitchModeModal}
        onClose={handleSwitchModeCancel}
        onConfirm={handleSwitchModeConfirm}
        onDoNotShowAgain={handleDoNotShowSwitchMode}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
console.log('[App.jsx] About to export, App type:', typeof App);
export default App;

