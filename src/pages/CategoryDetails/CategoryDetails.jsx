import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import styles from './CategoryDetails.module.css';

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const foundCategory = categoriesData.find(c => c.id === categoryId);
        if (foundCategory) {
            setCategory(foundCategory);
        } else {
            // Redirect if not found
            navigate('/');
        }
    }, [categoryId, navigate]);

    if (!category) return null;

    return (
        <div className={styles.detailsPage}>
            {/* Header Section */}
            <div className={styles.pageHeader}>
                <div className="container">
                    <Link to="/" className={styles.backLink}>
                        <ArrowLeft size={18} /> Back to Home
                    </Link>

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

                {/* Data Table Section */}
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
            </div>
        </div>
    );
};

export default CategoryDetails;
