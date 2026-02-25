export const translations = {
  en: {
    // Header
    headerTitle: 'Names List',
    
    // Navigation
    nameList: 'Name list',
    scanCode: 'Scan code',
    devices: 'Devices',
    settings: 'Settings',
    
    // Lists
    entaggedJobs: 'Entagged jobs',
    groups: 'Groups',
    teachers: 'Teachers',
    names: 'Names',
    
    // Currently Chosen
    noSubjectSelected: 'No subject selected',
    active: 'Active',
    toMultiTag: 'To Multi-tag',
    toSingleTag: 'To Single-tag',
    
    // Modals
    limitReached: 'Limit Reached',
    limitReachedMessage: 'You have reached the maximum number of subjects that can be tagged.',
    doNotShowAgain: 'Do not show again',
    ok: 'OK',
    cancel: 'Cancel',
    confirmTurnOffMultiTag: 'You have multiple subjects selected. Are you sure you want to turn off multi-tagging? This will clear all selected subjects.',
    turnOffMultiTagging: 'Turn off multi-tagging',
    
    // Toast
    toastLimitMessage: 'This camera cannot tag more than {max} subjects',
    
    // Settings
    settingsTitle: 'Settings',
    language: 'Language',
    english: 'English',
    german: 'German',
    
    // Aria labels
    ariaBack: 'Back',
    ariaSearch: 'Search',
    ariaAdd: 'Add',
    ariaRemove: 'Remove',
    ariaClose: 'Close',
  },
  de: {
    // Header
    headerTitle: 'Namenliste',
    
    // Navigation
    nameList: 'Namenliste',
    scanCode: 'Code scannen',
    devices: 'Geräte',
    settings: 'Einstellungen',
    
    // Lists
    entaggedJobs: 'Entagged Jobs',
    groups: 'Gruppen',
    teachers: 'Lehrer',
    names: 'Namen',
    
    // Currently Chosen
    noSubjectSelected: 'Kein Person ausgewählt',
    active: 'Aktiv',
    toMultiTag: 'Zu Multi-Tag',
    toSingleTag: 'Zu Einzel-Tag',
    
    // Modals
    limitReached: 'Limit erreicht',
    limitReachedMessage: 'Sie haben die maximale Anzahl der markierbaren Personen erreicht.',
    doNotShowAgain: 'Nicht mehr anzeigen',
    ok: 'OK',
    cancel: 'Abbrechen',
    confirmTurnOffMultiTag: 'Sie haben mehrere Personen ausgewählt. Möchten Sie die Multi-Tagging-Funktion wirklich ausschalten? Dies löscht alle ausgewählten Personen.',
    turnOffMultiTagging: 'Multi-Tagging ausschalten',
    
    // Toast
    toastLimitMessage: 'Diese Kamera kann nicht mehr als {max} Personen markieren',
    
    // Settings
    settingsTitle: 'Einstellungen',
    language: 'Sprache',
    english: 'Englisch',
    german: 'Deutsch',
    
    // Aria labels
    ariaBack: 'Zurück',
    ariaSearch: 'Suchen',
    ariaAdd: 'Hinzufügen',
    ariaRemove: 'Entfernen',
    ariaClose: 'Schließen',
  },
};

export const getTranslation = (key, language = 'en', params = {}) => {
  const translation = translations[language]?.[key] || translations.en[key] || key;
  
  // Replace placeholders like {max} with actual values
  return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
    return params[paramKey] !== undefined ? params[paramKey] : match;
  });
};
