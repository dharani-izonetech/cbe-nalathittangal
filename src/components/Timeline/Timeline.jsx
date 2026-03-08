import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import styles from './Timeline.module.css';

const timelineEvents = [
    {
        year: '2020',
        title: 'Digital Health Initiative',
        description: 'Launch of state-wide digital health records for seamless patient care across government hospitals.',
    },
    {
        year: '2021',
        title: 'Women Empowerment Setup',
        description: 'Special financial assistance schemes rolled out for women entrepreneurs and rural artisans.',
    },
    {
        year: '2022',
        title: 'Agri-Tech Advancements',
        description: 'Subsidies and modern farming equipment provided to over 1 million farmers to boost productivity.',
    },
    {
        year: '2023',
        title: 'Smart Learning Classrooms',
        description: 'Integration of smart boards and digital learning materials in all government higher secondary schools.',
    },
    {
        year: '2024',
        title: 'Universal Housing Project',
        description: 'Initiation of the comprehensive rural housing scheme to ensure a concrete roof for every family.',
    }
];

const TimelineItem = ({ event, index }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div className={styles.timelineItem} ref={ref}>
            <div className={`${styles.timelineContent} ${isEven ? styles.leftSide : styles.rightSide}`}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className={styles.year}>{event.year}</span>
                    <h3 className={styles.title}>{event.title}</h3>
                    <p className={styles.description}>{event.description}</p>
                </motion.div>
            </div>

            <motion.div
                className={styles.timelineDot}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
            />
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="section" ref={containerRef}>
            <div className="container">
                <h2 className="section-title">Initiatives Timeline</h2>

                <div className={styles.timelineWrapper}>
                    <motion.div
                        className={styles.timelineLine}
                        style={{ scaleY }}
                    />

                    <div className={styles.eventsContainer}>
                        {timelineEvents.map((event, idx) => (
                            <TimelineItem key={idx} event={event} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
