import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function ProfessionalSummary() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);

    return (
        <div className={styles.formStep}>
            <h2>Professional Summary</h2>
            <p className={styles.description}>Write a brief pitch highlighting your key achievements and goals. Keep it under 4 lines for optimal ATS parsing.</p>

            <div className={styles.formGroup}>
                <label>Summary Statement</label>
                <textarea
                    rows="6"
                    value={resumeData.summary}
                    onChange={(e) => updateResumeData('summary', e.target.value)}
                    placeholder="Dynamic Full-Stack Engineer with 5+ years of experience in..."
                />
            </div>
        </div>
    );
}
