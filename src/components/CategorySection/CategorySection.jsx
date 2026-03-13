import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import styles from './CategorySection.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

const TableView = ({ headers, data }) => {
    if (!headers || !data) return null;
    return (
        <div className={styles.tableResponsive}>
            <table className={styles.dataTable}>
                <thead>
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => {
                        const isTotal = row[row.length - 1] === 'total';
                        const displayRow = isTotal ? row.slice(0, -1) : row;
                        return (
                            <tr key={idx} className={isTotal ? styles.totalRow : ''}>
                                {displayRow.map((cell, cellIdx) => (
                                    <td
                                        key={cellIdx}
                                        data-label={headers[cellIdx]}
                                        className={cellIdx === 1 ? styles.highlightText : ''}
                                        dangerouslySetInnerHTML={{ __html: cell }}
                                    />
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const CategorySection = ({ category }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (category && category.subheadings && category.subheadings.length > 0) {
            setActiveTab(category.subheadings[0].id);
        }
    }, [category]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const selectTab = (id) => {
        setActiveTab(id);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    const toggleAccordion = (id) => {
        setActiveTab(activeTab === id ? '' : id);
    };

    if (!category || !category.subheadings) return null;

    return (
        <section className={styles.categorySection}>
            <div className={`container ${styles.contentContainer}`}>
                <h2 className={styles.sectionHeading}>{category.title}</h2>

                <div className={styles.layoutWrapper}>
                    {isMobile ? (
                        /* Mobile Accordion Layout */
                        <div className={styles.accordionContainer}>
                            {category.subheadings.map((sub) => (
                                <div key={sub.id} className={styles.accordionItem}>
                                    <button
                                        className={`${styles.accordionHeader} ${activeTab === sub.id ? styles.active : ''}`}
                                        onClick={() => toggleAccordion(sub.id)}
                                    >
                                        <span>{sub.title}</span>
                                        <motion.div
                                            animate={{ rotate: activeTab === sub.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {activeTab === sub.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={styles.accordionContentWrapper}
                                            >
                                                <div className={styles.accordionContent}>
                                                    {(sub.content || '').split('\n').filter(p => p.trim()).map((paragraph, i) => (
                                                        <p key={i}>{paragraph}</p>
                                                    ))}
                                                    {sub.customTable && (
                                                        <TableView 
                                                            headers={sub.customHeaders} 
                                                            data={sub.customTable} 
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Desktop Split Layout */
                        <div className={styles.splitLayout}>
                            <div className={styles.sidebarNav}>
                                <h3 className={styles.sidebarTitle}>{t('categorySection.topics')}</h3>
                                <ul className={styles.navList}>
                                    {category.subheadings.map((sub) => (
                                        <li key={sub.id}>
                                            <button
                                                className={`${styles.navItem} ${activeTab === sub.id ? styles.activeTab : ''}`}
                                                onClick={() => selectTab(sub.id)}
                                            >
                                                <span>{sub.title}</span>
                                                <ChevronRight size={18} className={styles.navIcon} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.mainContent} ref={contentRef}>
                                <AnimatePresence mode="wait">
                                    {category.subheadings.map((sub) => (
                                        sub.id === activeTab && (
                                            <motion.div
                                                key={sub.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className={styles.tabContent}
                                            >
                                                <h2>{sub.title}</h2>
                                                <div className={styles.htmlContent}>
                                                    {(sub.content || '').split('\n').filter(p => p.trim()).map((paragraph, i) => (
                                                        <p key={i}>{paragraph}</p>
                                                    ))}
                                                    {sub.customTable && (
                                                        <TableView 
                                                            headers={sub.customHeaders} 
                                                            data={sub.customTable} 
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
