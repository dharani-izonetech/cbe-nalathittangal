import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import categoriesData from '../../data/categories.json';
import styles from './CategoryGrid.module.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

const CategoryGrid = () => {
    const navigate = useNavigate();

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
        <section className="section">
            <div className={`container ${styles.gridContainer}`}>
                <h2 className="section-title">Explore by Category</h2>
                <p className="section-subtitle">Select a sector to view active departments, data, and government welfare initiatives.</p>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {categoriesData.map((category) => {
                        const IconComponent = Icons[category.icon] || Icons.HelpCircle;

                        return (
                            <motion.div
                                key={category.id}
                                className={styles.card}
                                variants={cardVariants}
                                whileHover="hover"
                                onClick={(e) => createRipple(e, category.id)}
                            >
                                <div className={styles.iconWrapper}>
                                    <IconComponent size={20} className={styles.icon} />
                                </div>

                                <h3 className={styles.title}>{category.title}</h3>
                                <Icons.ChevronRight size={18} className={styles.arrowIcon} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryGrid;
