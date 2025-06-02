import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../utils/i18n';

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  languageOptions: { value: Language; label: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const languageOptions = [
    { value: 'en' as Language, label: 'English' },
    { value: 'es' as Language, label: 'Español' },
    { value: 'fr' as Language, label: 'Français' },
    { value: 'de' as Language, label: 'Deutsch' },
    { value: 'zh' as Language, label: '中文' },
  ];

  useEffect(() => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};