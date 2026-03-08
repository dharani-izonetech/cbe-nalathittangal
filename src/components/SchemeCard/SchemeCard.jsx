import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Users, ArrowRight } from 'lucide-react';
import styles from './SchemeCard.module.css';

const SchemeCard = ({ scheme }) => {
    return (
        <motion.div
            className={styles.card}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            whileHover="hover"
        >
            <div className={styles.cardHeader}>
                <div className={styles.departmentBadge}>
                    <Building2 size={14} />
                    {scheme.department}
                </div>
                <h3 className={styles.title}>{scheme.name}</h3>
            </div>

            <div className={styles.cardBody}>
                <p className={styles.description}>{scheme.description}</p>

                <div className={styles.eligibilityBlock}>
                    <h4 className={styles.eligibilityTitle}>
                        <Users size={16} /> Key Eligibility
                    </h4>
                    <p className={styles.eligibilityText}>{scheme.eligibilitySummary}</p>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <Link to={`/schemes/${scheme.id}`} className={styles.viewDetailsBtn}>
                    View Details
                    <motion.span
                        variants={{
                            hover: { x: 5, transition: { type: "spring", stiffness: 300 } }
                        }}
                        className={styles.arrowIcon}
                    >
                        <ArrowRight size={18} />
                    </motion.span>
                </Link>
            </div>
        </motion.div>
    );
};

export default SchemeCard;
