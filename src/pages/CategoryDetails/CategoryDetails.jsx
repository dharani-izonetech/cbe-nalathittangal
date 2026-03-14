import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion,  AnimatePresence   } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import styles from './CategoryDetails.module.css';

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const category = useMemo(() => {
        const normalizedId = (categoryId || '').trim();
        return categoriesData.find(c => c.id.trim() === normalizedId) || null;
    }, [categoryId]);

    useEffect(() => {
        if (!category) {
            navigate('/');
        }
    }, [category, navigate]);

    if (!category) return null;

    return (
        <div className={styles.detailsPage}>
            {/* Header Section */}
            <div className={styles.pageHeader}>
                <div className="container">
                    <button onClick={() => navigate(-1)} className={styles.backLink} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>
                        <ArrowLeft size={18} /> Back
                    </button>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {category.title}
                    </motion.h1>
                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {category.description}
                    </motion.p>
                </div>
            </div>

            <div className={`container ${styles.contentContainer}`}>

                {/* Standard Data Table Section */}
                {category.tableData && category.tableData.length > 0 && (
                    <motion.div
                        className={styles.tableSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className={styles.sectionTitle}>Key Initiatives & Data</h2>
                        <div className={styles.tableResponsive}>
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th>Scheme Name</th>
                                        <th>Benefit</th>
                                        <th>Eligibility</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.tableData.map((row, idx) => (
                                        <tr key={idx}>
                                            <td data-label="Scheme Name">{row.scheme}</td>
                                            <td data-label="Benefit" className={styles.highlightText}>{row.benefit}</td>
                                            <td data-label="Eligibility">{row.eligibility}</td>
                                            <td data-label="Status">
                                                <span className={`${styles.statusBadge} ${styles[row.status.toLowerCase().replace(' ', '')] || styles.defaultStatus}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Custom Data Table Section */}
                {category.customTable && category.customTable.length > 0 && (
                    <motion.div
                        className={styles.tableSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className={styles.sectionTitle}></h2>
                        <div className={styles.tableResponsive}>
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        {category.customHeaders.map((header, idx) => (
                                            <th key={idx}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.customTable.map((row, idx) => (
                                        <tr key={idx}>
                                            {row.map((cell, cellIdx) => (
                                                <td 
                                                    key={cellIdx} 
                                                    data-label={category.customHeaders[cellIdx]}
                                                    className={cellIdx === 1 ? styles.highlightText : ''}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
