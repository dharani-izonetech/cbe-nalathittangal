import React from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import CategorySection from '../../components/CategorySection/CategorySection';
import homeSectionsData from '../../data/home_sections.json';
import styles from './Home.module.css';
import { useTranslation } from '../../i18n/LanguageContext';
import videoDesk from '../../assets/hero-bg-desktop.mp4'
import videoMob from '../../assets/hero-bg-mobile.mp4'

const Hero = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);
    const videoRef = React.useRef(null); // Create a ref for the video

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // slow motion: half speed
        }
    }, [isMobile]); // re-run if video source changes

    const videoSrc = isMobile ? videoMob : videoDesk;

    return (
        <section className={styles.heroSection} id="hero-section">
            <div className={styles.videoBackground}>
                <video
                    ref={videoRef}        // attach the ref
                    autoPlay
                    muted
                    loop
                    playsInline
                    key={videoSrc}        // Force re-render when source changes
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <div className={styles.home} style={{ position: 'relative', overflowX: 'hidden' }}>
            <Hero />

            <CategoryGrid />

            <div id="learn-more-section" className={styles.dynamicSectionsContainer}>
                {homeSectionsData.map((section) => (
                    <CategorySection key={section.id} category={section} />
                ))}
            </div>
        </div>
    );
};

export default Home;
