import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Building, Users, Coins } from 'lucide-react';
import styles from './Statistics.module.css';

const stats = [
    { id: 1, title: 'Total Schemes', value: 420, max: 500, suffix: '+', icon: FileText },
    { id: 2, title: 'Departments', value: 45, max: 100, suffix: '', icon: Building },
    { id: 3, title: 'Beneficiaries', value: 2.5, max: 5, suffix: 'M+', icon: Users },
    { id: 4, title: 'Budget Allocation', value: 15, max: 20, suffix: 'k Cr', icon: Coins }
];

const CircularProgress = ({ value, max, isVisible }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    // Calculate percentage, maxing at 100
    const percent = Math.min((value / max) * 100, 100);
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <svg width="150" height="150" className={styles.progressRing}>
            <circle
                className={styles.progressRingCircleBg}
                strokeWidth="8"
                fill="transparent"
                r={radius}
                cx="75"
                cy="75"
            />
            <motion.circle
                className={styles.progressRingCircle}
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx="75"
                cy="75"
                initial={{ strokeDashoffset: circumference }}
                animate={isVisible ? { strokeDashoffset } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ strokeDasharray: circumference }}
            />
        </svg>
    );
};

const Counter = ({ value, suffix, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp = null;
        const duration = 2000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const currentVal = progress * value;
            if (value % 1 !== 0) {
                setCount(parseFloat(currentVal.toFixed(1)));
            } else {
                setCount(Math.floor(currentVal));
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(value);
            }
        };

        window.requestAnimationFrame(step);
    }, [value, isVisible]);

    return <span>{count}{suffix}</span>;
};

const Statistics = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section className={`section ${styles.statsSection}`} ref={ref}>
            <div className="container">
                <div className={styles.statsHeader}>
                    <h2 className="section-title" style={{ color: 'white' }}>Impact at a Glance</h2>
                    <p className={styles.statsSubtitle}>Visualizing the massive scale of public welfare delivery across the state.</p>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.id}
                            className={styles.statCard}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                        >
                            <div className={styles.chartContainer}>
                                <CircularProgress value={stat.value} max={stat.max} isVisible={isInView} />
                                <div className={styles.iconCenter}>
                                    <stat.icon size={32} className={styles.icon} />
                                </div>
                            </div>

                            <h3 className={styles.counter}>
                                <Counter value={stat.value} suffix={stat.suffix} isVisible={isInView} />
                            </h3>
                            <p className={styles.title}>{stat.title}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
