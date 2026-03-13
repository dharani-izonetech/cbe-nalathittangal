import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.schemes', path: '/schemes' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, path) => {
        if (path === '/schemes') {
            e.preventDefault();
            if (location.pathname !== '/') {
                // If not on home page, navigate to home then scroll
                window.location.href = '/#schemes-section';
            } else {
                // If on home page, smoothly scroll to element
                const element = document.getElementById('schemes-section');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            setIsMobileOpen(false);
        } else if (path === '/') {
            if (location.pathname === '/') {
                // If already on home page, smoothly scroll to top
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileOpen(false);
            }
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.navLeadersImage}>
                    <img src="/nav-portraits.png" alt="Leaders trio" />
                </div>

                <Link to="/" className={styles.logo} onClick={(e) => handleNavClick(e, '/')}>
                    <div className={styles.logoText}>
                        <span className={styles.titlePrimary}>கோயம்புத்தூர்</span>
                        <span className={styles.titleSecondary}>மாவட்ட திட்டங்கள்</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.rightArea}>
                    <div className={styles.desktopMenu}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                to={link.path}
                                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                                onClick={(e) => handleNavClick(e, link.path)}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.key}
                                    to={link.path}
                                    className={styles.mobileNavLink}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
