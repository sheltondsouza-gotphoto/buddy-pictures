import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import StatusBar from './components/StatusBar';
import SubjectCard from './components/SubjectCard';
import SubjectFilterTabs from './components/SubjectFilterTabs';
import SubjectList from './components/SubjectList';
import BottomNavigationBar from './components/BottomNavigationBar';
import MaxSubjectsModal from './components/MaxSubjectsModal';
import SwitchModeModal from './components/SwitchModeModal';
import Toast from './components/Toast';
import { mockSubjects, mockFilters, mockTaggingModes, translations } from './mockData';
import SettingsPage from './components/SettingsPage';
import searchIcon from './icons/Single tagging/Search.svg';
import './index.css'; // Import Tailwind CSS
import './typography.css'; // Import custom typography
import colors from './colors';

const DO_NOT_SHOW_MAX_SUBJECTS_KEY = 'doNotShowMaxSubjectsModal';
const DO_NOT_SHOW_SWITCH_MODE_KEY = 'doNotShowSwitchModeModal';
const LANGUAGE_KEY = 'appLanguage';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [taggingMode, setTaggingMode] = useState(mockTaggingModes.single);
  const [activeTab, setActiveTab] = useState('nameList');
  // eslint-disable-next-line no-unused-vars
  const [isTabletView] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem(LANGUAGE_KEY) || 'en');
  const [showMaxSubjectsModal, setShowMaxSubjectsModal] = useState(false);
  const [doNotShowMaxSubjectsModal, setDoNotShowMaxSubjectsModal] = useState(false);
  const [showSwitchModeModal, setShowSwitchModeModal] = useState(false);
  const [doNotShowSwitchModeModal, setDoNotShowSwitchModeModal] = useState(false);
  const [pendingModeSwitch, setPendingModeSwitch] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem(DO_NOT_SHOW_MAX_SUBJECTS_KEY);
    if (storedPreference === 'true') {
      setDoNotShowMaxSubjectsModal(true);
    }
    const storedSwitchPreference = localStorage.getItem(DO_NOT_SHOW_SWITCH_MODE_KEY);
    if (storedSwitchPreference === 'true') {
      setDoNotShowSwitchModeModal(true);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
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
      setSelectedSubjects(selectedSubjects[0]?.id === subjectId ? [] : [subject]);
    } else if (taggingMode === mockTaggingModes.multi) {
      const isAlreadySelected = selectedSubjects.some(sub => sub.id === subjectId);
      if (isAlreadySelected) {
        setSelectedSubjects(selectedSubjects.filter(sub => sub.id !== subjectId));
      } else if (selectedSubjects.length < 3) {
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
    const isSwitchingToSingle = isCurrentlyMulti;
    const hasSelectedSubjects = selectedSubjects.length > 0;

    // If switching from multi to single and there are selected subjects, show modal
    if (isSwitchingToSingle && hasSelectedSubjects && !doNotShowSwitchModeModal) {
      setPendingModeSwitch(mockTaggingModes.single);
      setShowSwitchModeModal(true);
    } else {
      // Switch mode immediately
      const newMode = isCurrentlyMulti ? mockTaggingModes.single : mockTaggingModes.multi;
      setTaggingMode(newMode);
      // Clear selected subjects when switching to single mode
      if (newMode === mockTaggingModes.single) {
        setSelectedSubjects([]);
      }
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

  return (
    <div 
      className={`min-h-screen flex flex-col items-center shadow-elevation-shadow-sm justify-between ${isTabletView ? 'w-tablet' : 'w-phone'}`}
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <AppHeader currentLanguage={currentLanguage} />
      {activeTab === 'settings' ? (
        <SettingsPage 
          currentLanguage={currentLanguage} 
          onLanguageChange={handleLanguageChange} 
          onNavigateBack={() => setActiveTab('nameList')}
        />
      ) : (
        <>
          <StatusBar name={translations[currentLanguage].statusBarName} />
          <div 
            className="flex flex-col gap-2 h-full items-start overflow-clip p-16 relative w-full flex-1"
            style={{ backgroundColor: colors.background.lightGray }}
          >
            <SubjectCard 
              taggingMode={taggingMode} 
              selectedSubjects={selectedSubjects} 
              onToggleTaggingMode={toggleTaggingMode}
              onClearSelected={clearSelectedSubjects}
              onRemoveSubject={removeSubject}
              currentLanguage={currentLanguage}
            />
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
              <SubjectList 
                subjects={filteredSubjects} 
                activeSubjectId={selectedSubjects[0]?.id} 
                selectedSubjectIds={selectedSubjects.map(sub => sub.id)}
                onSubjectSelect={handleSubjectSelect} 
              />
            </div>
          </div>
        </>
      )}
      <BottomNavigationBar activeItem={activeTab} onNavigate={setActiveTab} currentLanguage={currentLanguage} className="fixed bottom-0" />
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

export default App;
