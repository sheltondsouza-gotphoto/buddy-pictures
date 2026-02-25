import React, { useState } from 'react';
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
  
  const organizedData = organizeByHierarchy(namesData);
  const { showConfirmModal, handleConfirmTurnOff, handleCancelTurnOff } = useTagging();
  const { language } = useLanguage();
  const t = (key, params) => getTranslation(key, language, params);
  
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setCurrentView('groups');
  };
  
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setCurrentView('teachers');
  };
  
  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentView('names');
  };
  
  const handleBack = () => {
    if (currentView === 'names') {
      setCurrentView('teachers');
      setSelectedTeacher(null);
    } else if (currentView === 'teachers') {
      setCurrentView('groups');
      setSelectedGroup(null);
    } else if (currentView === 'groups') {
      setCurrentView('jobs');
      setSelectedJob(null);
    } else if (currentView === 'settings') {
      setCurrentView('jobs');
    }
  };

  const handleSettingsClick = () => {
    setCurrentView('settings');
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
          <Header />
          <TopBar />
          <div className="body-section">
            {renderContent()}
          </div>
          <BottomNavigation onSettingsClick={handleSettingsClick} currentView={currentView} />
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
