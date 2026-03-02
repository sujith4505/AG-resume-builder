import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function Customize() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);
    const data = resumeData.customization || { fontSize: 12, spacing: 1.5 };

    const handleChange = (e) => {
        updateResumeData('customization', { ...data, [e.target.name]: parseFloat(e.target.value) });
    };

    return (
        <div className={styles.formStep}>
            <h2>Customize Layout</h2>
            <p className={styles.description}>Adjust the visual density of your resume for ATS parsers and human readers.</p>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>Global Font Size: {data.fontSize}pt</label>
                    <input
                        type="range"
                        name="fontSize"
                        min="10"
                        max="14"
                        step="0.5"
                        value={data.fontSize}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Line Spacing: {data.spacing}</label>
                    <input
                        type="range"
                        name="spacing"
                        min="1.0"
                        max="2.0"
                        step="0.1"
                        value={data.spacing}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    Note: Section reordering logic can be applied globally via drag-and-drop in future updates. ATS parsers prefer Chronological structure.
                </p>
            </div>
        </div>
    );
}
