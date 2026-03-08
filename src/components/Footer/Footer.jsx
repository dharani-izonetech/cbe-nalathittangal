import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerBgBlob}></div>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.footerBrand}>
                    <div className={styles.logo}>
                        <Landmark className={styles.logoIcon} size={32} />
                        <div className={styles.logoText}>
                            <span className={styles.titlePrimary}>GovWelfare</span>
                            <span className={styles.titleSecondary}>Portal</span>
                        </div>
                    </div>
                    <p className={styles.brandText}>
                        Dedicated to providing transparent access to government development programs and public benefit schemes for all citizens.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
                    </div>
                </div>

                <div className={styles.footerLinks}>
                    <h4 className={styles.linkTitle}>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/schemes">All Schemes</Link></li>
                        <li><Link to="/departments">Departments</Link></li>
                        <li><Link to="/beneficiaries">Beneficiaries</Link></li>
                        <li><Link to="/statistics">Statistics</Link></li>
                    </ul>
                </div>

                <div className={styles.footerLinks}>
                    <h4 className={styles.linkTitle}>Announcements</h4>
                    <ul>
                        <li><Link to="#">New Women's Welfare Setup</Link></li>
                        <li><Link to="#">Education Scholarship Extended</Link></li>
                        <li><Link to="#">Housing Subsidies Update</Link></li>
                        <li><Link to="#">Agriculture Tech Grants</Link></li>
                    </ul>
                </div>

                <div className={styles.footerContact}>
                    <h4 className={styles.linkTitle}>Contact Us</h4>
                    <div className={styles.contactItem}>
                        <MapPin size={18} className={styles.contactIcon} />
                        <span>Government Secretariat, Chennai, Tamil Nadu, India</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Phone size={18} className={styles.contactIcon} />
                        <span>1800-425-XXXX (Toll Free)</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Mail size={18} className={styles.contactIcon} />
                        <span>support@govwelfare.in</span>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Government Welfare Schemes Portal. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
