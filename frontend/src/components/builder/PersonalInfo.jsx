import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function PersonalInfo() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);
    const data = resumeData.personalInfo;

    const handleChange = (e) => {
        updateResumeData('personalInfo', { ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.formStep}>
            <h2>Personal Information</h2>
            <p className={styles.description}>Enter your contact details to help recruiters reach you.</p>

            <div className={styles.formGroup}>
                <label>Full Name</label>
                <input name="fullName" value={data.fullName} onChange={handleChange} placeholder="John Doe" />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>Email ID</label>
                    <input name="email" type="email" value={data.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div className={styles.formGroup}>
                    <label>Phone Number</label>
                    <input name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>LinkedIn URL</label>
                    <input name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className={styles.formGroup}>
                    <label>GitHub/Portfolio URL (Optional)</label>
                    <input name="github" value={data.github} onChange={handleChange} placeholder="github.com/johndoe" />
                </div>
            </div>
        </div>
    );
}
