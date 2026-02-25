import React, { useState, useRef } from 'react';
import { TaggingProvider, useTagging } from './context/TaggingContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/Header';
import TopBar from './components/TopBar';
import JobsList from './components/JobsList';
import BottomNavigation from './components/BottomNavigation';
import GroupsList from './components/GroupsList';
import TeachersList from './components/TeachersList';
import NamesList from './components/NamesList';
import Settings from './components/Settings';
import ConfirmModal from './components/ConfirmModal';
import { namesData, organizeByHierarchy } from './data/names';
import { getTranslation } from './translations/translations';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('jobs'); // 'jobs', 'groups', 'teachers', 'names', 'settings'
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  // Store previous navigation state when going to settings
  const previousStateRef = useRef({
    view: 'jobs',
    job: null,
    group: null,
    teacher: null
  });
  
  const organizedData = organizeByHierarchy(namesData);
  const { showConfirmModal, handleConfirmTurnOff, handleCancelTurnOff } = useTagging();
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);
  
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setCurrentView('groups');
    // Update previous state when navigating within name list pages
    previousStateRef.current = {
      view: 'groups',
      job: job,
      group: null,
      teacher: null
    };
  };
  
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setCurrentView('teachers');
    // Update previous state when navigating within name list pages
    previousStateRef.current = {
      view: 'teachers',
      job: selectedJob,
      group: group,
      teacher: null
    };
  };
  
  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentView('names');
    // Update previous state when navigating within name list pages
    previousStateRef.current = {
      view: 'names',
      job: selectedJob,
      group: selectedGroup,
      teacher: teacher
    };
  };
  
  const handleBack = () => {
    if (currentView === 'names') {
      setCurrentView('teachers');
      setSelectedTeacher(null);
      // Update previous state when going back
      previousStateRef.current = {
        view: 'teachers',
        job: selectedJob,
        group: selectedGroup,
        teacher: null
      };
    } else if (currentView === 'teachers') {
      setCurrentView('groups');
      setSelectedGroup(null);
      // Update previous state when going back
      previousStateRef.current = {
        view: 'groups',
        job: selectedJob,
        group: null,
        teacher: null
      };
    } else if (currentView === 'groups') {
      setCurrentView('jobs');
      setSelectedJob(null);
      // Update previous state when going back
      previousStateRef.current = {
        view: 'jobs',
        job: null,
        group: null,
        teacher: null
      };
    } else if (currentView === 'settings') {
      // Restore previous state when going back from settings
      const previous = previousStateRef.current;
      setCurrentView(previous.view);
      setSelectedJob(previous.job);
      setSelectedGroup(previous.group);
      setSelectedTeacher(previous.teacher);
    }
  };

  const handleSettingsClick = () => {
    // Store current state before navigating to settings
    if (currentView !== 'settings') {
      previousStateRef.current = {
        view: currentView,
        job: selectedJob,
        group: selectedGroup,
        teacher: selectedTeacher
      };
    }
    setCurrentView('settings');
  };

  const handleNameListClick = () => {
    // Restore previous state when clicking Name list tab
    const previous = previousStateRef.current;
    setCurrentView(previous.view);
    setSelectedJob(previous.job);
    setSelectedGroup(previous.group);
    setSelectedTeacher(previous.teacher);
  };
  
  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <Settings onBack={handleBack} />;
      case 'groups':
        return (
          <GroupsList
            groups={selectedJob ? Object.keys(organizedData[selectedJob] || {}) : []}
            onGroupClick={handleGroupClick}
            onBack={handleBack}
            job={selectedJob}
          />
        );
      case 'teachers':
        return (
          <TeachersList
            teachers={selectedJob && selectedGroup 
              ? Object.keys(organizedData[selectedJob]?.[selectedGroup] || {}) 
              : []}
            onTeacherClick={handleTeacherClick}
            onBack={handleBack}
            job={selectedJob}
            group={selectedGroup}
          />
        );
      case 'names':
        return (
          <NamesList
            names={selectedJob && selectedGroup && selectedTeacher
              ? organizedData[selectedJob]?.[selectedGroup]?.[selectedTeacher] || []
              : []}
            onBack={handleBack}
            job={selectedJob}
            group={selectedGroup}
            teacher={selectedTeacher}
          />
        );
      default:
        return (
          <JobsList
            jobs={Object.keys(organizedData)}
            onJobClick={handleJobClick}
          />
        );
    }
  };

  return (
    <>
      <div className="app">
        <div className="app-container">
          <Header currentView={currentView} />
          <TopBar />
          <div className="body-section">
            {renderContent()}
          </div>
          <BottomNavigation 
            onSettingsClick={handleSettingsClick} 
            onNameListClick={handleNameListClick}
            currentView={currentView} 
          />
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          message={t('confirmTurnOffMultiTag')}
          confirmText={t('turnOffMultiTagging')}
          cancelText={t('cancel')}
          onConfirm={handleConfirmTurnOff}
          onCancel={handleCancelTurnOff}
        />
      )}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TaggingProvider>
        <AppContent />
      </TaggingProvider>
    </LanguageProvider>
  );
}

export default App;
