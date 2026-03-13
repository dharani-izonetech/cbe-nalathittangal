import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import styles from './CategoryGrid.module.css';
import { useTranslation } from '../../i18n/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const cardPalettes = [
    '#1f5c62',
    '#97234f',
    '#6c6b3d',
    '#c88a0c',
    '#7a4b09',
    '#263b7a',
    '#5b2c86',
    '#6a4b0a',
    '#6a7f1b',
];

const extraCategoryBoxes = [
    'தமிழ்ப் புதல்வன்',
    'முதலமைச்சர் கோப்பை',
    'முதல்வரின் முகவரி',
];

const CategoryGrid = () => {
    const navigate = useNavigate();
    const { t, lang } = useTranslation();
    const defaultImage = '/category-placeholder.svg';

    const createRipple = (event, id) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add(styles.ripple);

        // remove existing ripples
        const ripple = button.getElementsByClassName(styles.ripple)[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);

        // Navigate after short delay for ripple effect
        setTimeout(() => {
            navigate(`/category/${id}`);
        }, 300);
    };

    return (
        <section id="schemes-section" className={`section ${styles.categorySection}`}>
            <div className={`container ${styles.gridContainer}`}>
                <h2
                    className={`section-title ${styles.sectionTitleTa}`}
                    lang={lang}
                >
                    {t('categoryGrid.title')}
                </h2>
                <p className={styles.sectionSubtitle}>{t('categoryGrid.subtitle')}</p>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {categoriesData.map((category, index) => {
                        const cardBg = category.cardBg || cardPalettes[index % cardPalettes.length];
                        const cardImage = category.cardImage || defaultImage;
                        const cardStat = category.cardStat || category.cardSubtitle || category.description;

                        return (
                            <motion.div
                                key={category.id}
                                className={styles.card}
                                style={{ backgroundColor: cardBg }}
                                variants={cardVariants}
                                whileHover="hover"
                                onClick={(e) => createRipple(e, category.id)}
                            >
                                <div className={styles.cardContent}>
                                    <h3 className={styles.title}>{category.title}</h3>
                                    {cardStat && <p className={styles.cardStat}>{cardStat}</p>}
                                </div>
                                <div className={styles.cardImageWrap}>
                                    <img
                                        src={cardImage}
                                        alt=""
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = defaultImage;
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryGrid;
