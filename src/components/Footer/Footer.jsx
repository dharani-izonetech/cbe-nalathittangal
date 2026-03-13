import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className={styles.footer}>
            <div className={styles.footerBgBlob}></div>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.footerBrand}>
                    <div className={styles.footerLogo}>
                        <h3 className={styles.footerTitlePrimary}>{t('nav.titlePrimary')}</h3>
                        <h4 className={styles.footerTitleSecondary}>{t('nav.titleSecondary')}</h4>
                    </div>
                    <p className={styles.brandText}>
                        {t('footer.brandText')}
                    </p>
                </div>

                <div className={styles.footerLinks}>
                    <h4 className={styles.linkTitle}>{t('footer.quickLinks')}</h4>
                    <ul>
                        <li>
                            <Link 
                                to="/" 
                                onClick={(e) => {
                                    if (window.location.pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li><a href="/#schemes-section">{t('footer.allSchemes')}</a></li>
                    </ul>
                </div>


            </div>
            <div className={styles.footerBottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
