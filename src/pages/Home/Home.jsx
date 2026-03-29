import React from 'react';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import CategorySection from '../../components/CategorySection/CategorySection';
import homeSectionsData from '../../data/home_sections.json';
import styles from './Home.module.css';

const heroImageDesktop = '/hero-image.jpg';        // place hero-image.jpg in public/
const heroImageMobile  = '/hero-image-mobile.jpg'; // place hero-image-mobile.jpg in public/

const Hero = () => {
    return (
        <section
            className={styles.heroSection}
            id="hero-section"
        >
            {/* <picture> swaps sources based on screen width — no JS needed */}
            <picture className={styles.heroPicture}>
                {/* Mobile: portrait image below 768px */}
                <source media="(max-width: 767px)" srcSet={heroImageMobile} />
                {/* Desktop/Tablet: landscape image (default) */}
                <img
                    src={heroImageDesktop}
                    alt="Hero Banner"
                    className={styles.heroImage}
                />
            </picture>
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
