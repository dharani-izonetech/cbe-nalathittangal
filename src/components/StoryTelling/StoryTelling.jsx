import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './StoryTelling.module.css';

const stories = [
    {
        id: 1,
        title: 'Transforming Education Infrastructure',
        description: 'Over 5,000 smart classrooms deployed across rural schools, bringing interactive digital learning to students who previously lacked access. Subsidies ensure retention rates have skyrocketed by 40%.',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
        color: '#3b82f6'
    },
    {
        id: 2,
        title: 'Empowering Women Entrepreneurs',
        description: 'The state has disbursed over ₹2000 Crores in micro-loans, enabling 50,000+ women to start their own businesses. This initiative is reshaping the local economy from the grassroots up.',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
        color: '#10b981'
    },
    {
        id: 3,
        title: 'Sustainable Agriculture Revolution',
        description: 'Introducing modern farming equipment via heavy subsidies. 1 Million farmers trained in organic and water-saving techniques, preserving groundwater and boosting yields.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800',
        color: '#c2412d'
    }
];

const StoryBlock = ({ story, index }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const isInView = useInView(textRef, { once: true, margin: "-10%" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const isEven = index % 2 === 0;

    return (
        <div ref={containerRef} className={`${styles.storyBlock} ${isEven ? styles.even : styles.odd}`}>
            <div className={styles.imageCol}>
                <div className={styles.imageWrapper}>
                    <motion.img
                        style={{ y: yImage }}
                        src={story.image}
                        alt={story.title}
                        className={styles.parallaxImg}
                    />
                    <div className={styles.imageOverlay} style={{ background: `linear-gradient(to top, ${story.color}40, transparent)` }}></div>
                </div>
            </div>

            <div className={styles.textCol} ref={textRef}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.textContent}
                >
                    <span className={styles.storyIndex} style={{ color: story.color }}>0{index + 1}</span>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storyDesc}>{story.description}</p>
                    <div className={styles.decorativeLine} style={{ backgroundColor: story.color }}></div>
                </motion.div>
            </div>
        </div>
    );
};

const StoryTelling = () => {
    return (
        <section className={styles.storySection}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.mainTitle}>Impact <span className={styles.highlight}>Stories</span></h2>
                    <p className={styles.mainSubtitle}>Witness the real-world transformations brought about by active governance and citizen-focused welfares.</p>
                </div>

                <div className={styles.storiesContainer}>
                    {stories.map((story, idx) => (
                        <StoryBlock key={story.id} story={story} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoryTelling;
