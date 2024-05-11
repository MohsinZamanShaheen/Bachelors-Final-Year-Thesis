import React, { useState, createContext } from 'react';

// Create a context for the language
export const LanguageContext = createContext();

// Create a provider component for the language context
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
