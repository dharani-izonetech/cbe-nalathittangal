import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import SchemeCard from '../../components/SchemeCard/SchemeCard';
import styles from './Schemes.module.css';

const dummySchemes = [
    {
        id: '1',
        name: 'Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme',
        department: 'Social Welfare',
        description: 'Provides Rs. 1000/month financial assistance to girl students for pursuing higher education.',
        eligibilitySummary: 'Girls who studied in Govt schools from classes 6 to 12.'
    },
    {
        id: '2',
        name: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme',
        department: 'Health and Family Welfare',
        description: 'Provides financial assistance of Rs. 18,000 to poor pregnant women to compensate wage loss during pregnancy.',
        eligibilitySummary: 'Pregnant women age 19 and above below poverty line.'
    },
    {
        id: '3',
        name: 'Chief Minister\'s Comprehensive Health Insurance',
        department: 'Health and Family Welfare',
        description: 'Provides cashless medical assistance up to Rs. 5 Lakhs per family per year.',
        eligibilitySummary: 'Families with annual income less than Rs. 1,20,000.'
    },
    {
        id: '4',
        name: 'Free Supply of Bicycles',
        department: 'School Education',
        description: 'Free bicycles distributed to students studying in class 11 to encourage continued education and reduce dropout rates.',
        eligibilitySummary: 'Students of Class 11 in Govt and Govt-Aided schools.'
    },
    {
        id: '5',
        name: 'Uzhavar Santhai Initiative',
        department: 'Agriculture',
        description: 'Providing direct market access for farmers to sell their produce directly to consumers without intermediaries.',
        eligibilitySummary: 'Registered farmers in the state.'
    },
    {
        id: '6',
        name: 'Pudhumai Penn Scheme',
        department: 'Social Welfare',
        description: 'Financial assistance for female students to pursue undergraduate degrees, diplomas, and ITI courses.',
        eligibilitySummary: 'Female students pursuing higher education.'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const Schemes = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSchemes = dummySchemes.filter(scheme =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.schemesPage}>
            <div className={styles.pageHeader}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.title}
                    >
                        Explore <span className={styles.highlight}>Schemes</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.subtitle}
                    >
                        Browse through hundreds of government schemes tailored for your benefit.
                    </motion.p>
                </div>
            </div>

            <div className="container">
                <div className={styles.controls}>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Search by scheme name or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <button className={styles.filterBtn}>
                        <Filter size={20} /> Filter
                    </button>
                </div>

                <motion.div
                    className={styles.schemesGrid}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSchemes.map(scheme => (
                        <SchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                </motion.div>

                {filteredSchemes.length === 0 && (
                    <div className={styles.noResults}>
                        <h3>No schemes found matching your search.</h3>
                        <p>Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schemes;
