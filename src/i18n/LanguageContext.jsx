import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const lang = 'ta';
  const setLang = () => {};

  useEffect(() => {
    document.documentElement.lang = 'ta';
  }, [lang]);

  const t = useMemo(() => {
    return (key) => {
      const parts = String(key).split('.');
      const from = (obj) => parts.reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);

      const value = from(translations.ta);
      return typeof value === 'string' ? value : key;
    };
  }, []);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used inside LanguageProvider');
  }
  return ctx;
};
