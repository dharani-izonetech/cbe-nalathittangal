import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Sparkles,
    BookOpen,
    Users,
    HeartPulse,
    Tractor,
    Home as HomeIcon,
    Target
} from 'lucide-react';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import CategorySection from '../../components/CategorySection/CategorySection';
import homeSectionsData from '../../data/home_sections.json';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const floatingCardsData = [
    { id: 1, title: 'Education', icon: BookOpen, top: '5%', left: '10%', delay: 0, speed: 1.2 },
    { id: 2, title: 'Women Welfare', icon: Users, top: '25%', left: '60%', delay: 0.2, speed: 0.8 },
    { id: 3, title: 'Healthcare', icon: HeartPulse, top: '50%', left: '5%', delay: 0.4, speed: 1.5 },
    { id: 4, title: 'Agriculture', icon: Tractor, top: '75%', left: '55%', delay: 0.6, speed: 1.1 },
    { id: 5, title: 'Housing', icon: HomeIcon, top: '20%', left: '30%', delay: 0.8, speed: 1.3 },
    { id: 6, title: 'Youth Development', icon: Target, top: '80%', left: '20%', delay: 1, speed: 0.9 },
];

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY, innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 50; // Max 25px movement
            const y = (clientY / innerHeight - 0.5) * 50;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // GSAP Scroll Transition
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        tl.to(contentRef.current, { opacity: 0, y: -50, filter: 'blur(10px)' }, 0)
            .to(visualRef.current, { y: -150 }, 0);

        return () => {
            if (tl) tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section ref={heroRef} className={styles.heroSection}>
            {/* Rich Animated Background */}
            <div className={styles.heroBackground}>
                <div className={styles.animatedGradient}></div>
                <div className={styles.abstractBlob1}></div>
                <div className={styles.abstractBlob2}></div>
                <div className={styles.parallaxGrid}></div>
                {/* Light particles */}
                <div className={styles.particlesContainer}>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={styles.particle} style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}></div>
                    ))}
                </div>
            </div>

            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroLayout}>

                    {/* Left Text Column */}
                    <motion.div
                        ref={contentRef}
                        className={styles.heroContent}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
                        }}
                    >
                        <motion.div variants={textVariants} className={styles.badgeWrapper}>
                            <span className={styles.premiumBadge}>
                                <Sparkles size={14} className={styles.badgeIcon} />
                                Modern Public Services
                            </span>
                        </motion.div>

                        <motion.h1 variants={textVariants} className={styles.title}>
                            Government <span className={styles.highlightGlow}>Welfare</span><br />
                            Schemes Portal
                        </motion.h1>

                        <motion.p variants={textVariants} className={styles.subtitle}>
                            Discover welfare initiatives, development programs, and government support schemes across multiple sectors designed to uplift our communities.
                        </motion.p>

                        <motion.div variants={textVariants} className={styles.ctaGroup}>
                            <button className={`btn-primary ${styles.heroBtn}`}>
                                <span className={styles.btnText}>Explore Schemes</span>
                                <ArrowRight size={20} className={styles.btnIcon} />
                            </button>
                            <button className={styles.secondaryBtn}>
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual Column */}
                    <div ref={visualRef} className={styles.heroVisual}>
                        <div className={styles.floatingCardsWrapper}>
                            {floatingCardsData.map((card, idx) => {
                                const parallaxX = mousePos.x * card.speed;
                                const parallaxY = mousePos.y * card.speed;

                                return (
                                    <motion.div
                                        key={card.id}
                                        className={styles.floatingCard}
                                        style={{
                                            top: card.top,
                                            left: card.left,
                                            x: parallaxX,
                                            y: parallaxY
                                        }}
                                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5 + card.delay,
                                            type: "spring",
                                            stiffness: 100,
                                        }}
                                    >
                                        <div className={styles.cardFloatingAnim} style={{ animationDelay: `${card.delay}s` }}>
                                            <div className={styles.cardIconWrapper}>
                                                <card.icon size={24} className={styles.cardIcon} />
                                            </div>
                                            <span className={styles.cardText}>{card.title}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        {/* Central Glowing Orb Focus */}
                        <div className={styles.centralOrb}></div>
                    </div>
                </div>
            </div>

            {/* Decorative Wave Divider */}
            <div className={styles.waveDivider}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,130.63,197.6,120.94,242.49,114.38,283.69,83.9,321.39,56.44Z" className={styles.shapeFill}></path>
                </svg>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div className={styles.home} style={{ position: 'relative', overflowX: 'hidden' }}>
            <Hero />

            <CategoryGrid />

            <div className={styles.dynamicSectionsContainer}>
                {homeSectionsData.map((section) => (
                    <CategorySection key={section.id} category={section} />
                ))}
            </div>
        </div>
    );
};

export default Home;
