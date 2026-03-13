import React from 'react';
import styles from './LanguageSwitch.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

const LanguageSwitch = ({ variant = 'default' }) => {
  const { lang, setLang, t } = useTranslation();

  return (
    <div
      className={`${styles.wrapper} ${variant === 'compact' ? styles.compact : ''}`}
      aria-label="Language switch"
    >
      <button
        type="button"
        className={`${styles.option} ${lang === 'ta' ? styles.active : ''}`}
        onClick={() => setLang('ta')}
      >
        {t('language.tamil')}
      </button>
      <button
        type="button"
        className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => setLang('en')}
      >
        {t('language.english')}
      </button>
    </div>
  );
};

export default LanguageSwitch;
