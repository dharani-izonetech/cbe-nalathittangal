import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Landmark } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Departments', path: '/departments' },
    { name: 'Beneficiaries', path: '/beneficiaries' },
    { name: 'Statistics', path: '/statistics' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

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

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link to="/" className={styles.logo}>
                    <Landmark className={styles.logoIcon} size={28} />
                    <div className={styles.logoText}>
                        <span className={styles.titlePrimary}>GovWelfare</span>
                        <span className={styles.titleSecondary}>Portal</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
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
                                    key={link.name}
                                    to={link.path}
                                    className={styles.mobileNavLink}
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    {link.name}
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
