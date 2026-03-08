import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, GraduationCap, HeartPulse, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './FeaturedSchemes.module.css';

const featuredData = [
    {
        id: '1',
        title: 'Pudhumai Penn Scheme',
        desc: 'Financial assistance for female students to pursue undergraduate degrees.',
        highlight: '₹1000 / month',
        icon: GraduationCap,
        gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
        id: '2',
        title: 'Comprehensive Health Insurance',
        desc: 'Cashless medical assistance up to ₹5 Lakhs per family per year.',
        highlight: '₹5L Coverage',
        icon: HeartPulse,
        gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)'
    },
    {
        id: '3',
        title: 'Women Entrepreneur Setup',
        desc: 'Special financial assistance and subsidies for rural artisans and women.',
        highlight: 'Up to 50% Subsidy',
        icon: ShieldCheck,
        gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    }
];

const FeaturedSchemes = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="section" ref={ref} style={{ backgroundColor: 'var(--color-bg-alt)', position: 'relative' }}>

            {/* Decorative Blob */}
            <div className={styles.bgBlob}></div>

            <div className="container">
                <div className={styles.header}>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className={styles.title}
                    >
                        Priority <span style={{ color: 'var(--color-primary-dark)' }}>Initiatives</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/schemes" className={styles.viewAll}>View All Schemes <ArrowUpRight size={18} /></Link>
                    </motion.div>
                </div>

                <div className={styles.cardsScrollWrapper}>
                    <div className={styles.cardsContainer}>
                        {featuredData.map((scheme, idx) => (
                            <motion.div
                                key={scheme.id}
                                className={styles.featureCard}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                <div className={styles.cardHighlight} style={{ background: scheme.gradient }}>
                                    <scheme.icon size={32} color="white" />
                                    <span className={styles.highlightBadge}>{scheme.highlight}</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{scheme.title}</h3>
                                    <p>{scheme.desc}</p>
                                </div>
                                <div className={styles.cardFooter}>
                                    <Link to={`/schemes/${scheme.id}`} className={styles.exploreLink}>
                                        Explore Scheme <ArrowUpRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSchemes;
