import React from 'react';
import { motion } from 'framer-motion';
import styles from './DummyPage.module.css';

const DummyPage = ({ title }) => {
    return (
        <div className={styles.dummyPage}>
            <div className="container">
                <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>{title}</h1>
                    <p>
                        This page provides detailed information regarding the {title.toLowerCase()} related to government welfare schemes.
                        Content for this section is currently being updated by the respective departments.
                    </p>
                    <div className={styles.placeholderBox}>
                        <div className="animate-pulse" style={{ height: '20px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '1rem', width: '80%' }}></div>
                        <div className="animate-pulse" style={{ height: '20px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '1rem', width: '90%' }}></div>
                        <div className="animate-pulse" style={{ height: '20px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '1rem', width: '60%' }}></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DummyPage;
