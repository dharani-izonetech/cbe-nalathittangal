import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileText, Building, Milestone, ShieldCheck, BadgeCheck } from 'lucide-react';
import styles from './SchemeDetails.module.css';

const allSchemes = {
    '1': {
        id: '1',
        name: 'Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme',
        department: 'Social Welfare',
        description: 'Provides Rs. 1000/month financial assistance to girl students for pursuing higher education to recognize their academic efforts and reduce financial burden.',
        benefits: [
            'Rs. 1000 deposited directly into student bank accounts every month.',
            'Applicable until the completion of their undergraduate degree/ITI/Diploma course.',
            'Encourages women empowerment and reduces the dropout rate in higher education.'
        ],
        eligibility: [
            'Must be a girl student.',
            'Must have studied in Government Schools from classes 6 to 12.',
            'Must be pursuing recognized higher education courses in the state.'
        ],
        documents: [
            'Aadhaar Card',
            'Bank Account Passbook (linked to Aadhaar)',
            '10th and 12th Marksheets',
            'Bonafide Certificate from College'
        ],
        applicationProcess: [
            'Students gather necessary documents including Aadhaar and marksheets.',
            'Submit documentation to college nodal officers during admission.',
            'Nodal officers verify and upload details to the centralized state portal.',
            'Funds are approved and disbursed directly to the bank account.'
        ],
        contactInfo: 'socialwelfare.tn.gov.in | Helpline: 181'
    }
};

const SectionCard = ({ title, icon, children, delay }) => {
    const CardIcon = icon;
    return (
        <motion.div
            className={styles.sectionCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className={styles.sectionHeader}>
                <div className={styles.iconBox}>
                    <CardIcon size={24} className={styles.sectionIcon} />
                </div>
                <h2>{title}</h2>
            </div>
            <div className={styles.sectionBody}>
                {children}
            </div>
        </motion.div>
    );
};

const SchemeDetails = () => {
    const { id } = useParams();
    const scheme = allSchemes[id] || allSchemes['1']; // fallback for demo

    return (
        <div className={styles.detailsPage}>
            {/* Hero Header for Details */}
            <div className={styles.pageHeader}>
                <div className="container">
                    <Link to="/schemes" className={styles.backLink}>
                        <ArrowLeft size={18} /> Back to Schemes
                    </Link>
                    <motion.div
                        className={styles.departmentBadge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Building size={14} />
                        {scheme.department}
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {scheme.name}
                    </motion.h1>
                </div>
            </div>

            <div className={`container ${styles.contentContainer}`}>
                <div className={styles.mainContent}>

                    <motion.div
                        className={`glass-panel ${styles.overviewCard}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3>Overview</h3>
                        <p className={styles.description}>{scheme.description}</p>
                    </motion.div>

                    {/* Benefits Highlight Boxes */}
                    <SectionCard title="Benefits & Features" icon={ShieldCheck} delay={0.1}>
                        <div className={styles.benefitsGrid}>
                            {scheme.benefits.map((benefit, idx) => (
                                <div key={idx} className={styles.benefitBox}>
                                    <BadgeCheck size={32} className={styles.benefitIcon} />
                                    <p>{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Icon-based Eligibility List */}
                    <SectionCard title="Eligibility Criteria" icon={CheckCircle2} delay={0.2}>
                        <ul className={styles.eligibilityList}>
                            {scheme.eligibility.map((item, idx) => (
                                <li key={idx}>
                                    <div className={styles.checkCircle}><CheckCircle2 size={16} color="white" /></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </SectionCard>

                    {/* Document Checklist Design */}
                    <SectionCard title="Required Documents" icon={FileText} delay={0.3}>
                        <div className={styles.documentGrid}>
                            {scheme.documents.map((doc, idx) => (
                                <div key={idx} className={styles.documentItem}>
                                    <FileText size={20} className={styles.docIcon} />
                                    <span>{doc}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Step-by-step Process Layout */}
                    <SectionCard title="Application Process" icon={Milestone} delay={0.4}>
                        <div className={styles.processSteps}>
                            {scheme.applicationProcess.map((step, idx) => (
                                <div key={idx} className={styles.step}>
                                    <div className={styles.stepNumber}>0{idx + 1}</div>
                                    <p className={styles.stepText}>{step}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                </div>

                <motion.div
                    className={styles.sidebar}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className={styles.applyCard}>
                        {/* Blob in sidebar card */}
                        <div className={styles.sidebarBlob}></div>

                        <div className={styles.sidebarContent}>
                            <h3>Ready to Apply?</h3>
                            <p>Ensure you have all the necessary documents and meet the eligibility criteria.</p>
                            <button className={`btn-primary ${styles.applyBtn}`}>
                                Proceed to Application
                            </button>

                            <div className={styles.contactInfo}>
                                <h4>Support Center</h4>
                                <p>{scheme.contactInfo}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SchemeDetails;
