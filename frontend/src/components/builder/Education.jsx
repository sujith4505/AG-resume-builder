import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function Education() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);
    const education = resumeData.education || [];

    const handleAdd = () => {
        updateResumeData('education', [
            ...education,
            { degree: '', institution: '', date: '', location: '', details: '' }
        ]);
    };

    const handleChange = (index, field, value) => {
        const newEdu = [...education];
        newEdu[index][field] = value;
        updateResumeData('education', newEdu);
    };

    const handleRemove = (index) => {
        const newEdu = education.filter((_, i) => i !== index);
        updateResumeData('education', newEdu);
    };

    return (
        <div className={styles.formStep}>
            <h2>Education</h2>
            <p className={styles.description}>Include your educational background, pertinent coursework, or honors.</p>

            {education.map((edu, index) => (
                <div key={index} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', position: 'relative' }}>
                    <button
                        onClick={() => handleRemove(index)}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Remove
                    </button>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Degree / Certificate</label>
                            <input value={edu.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} placeholder="B.S. in Computer Science" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Institution</label>
                            <input value={edu.institution} onChange={(e) => handleChange(index, 'institution', e.target.value)} placeholder="University Name" />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Graduation Date</label>
                            <input value={edu.date} onChange={(e) => handleChange(index, 'date', e.target.value)} placeholder="MM/YYYY" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Location</label>
                            <input value={edu.location} onChange={(e) => handleChange(index, 'location', e.target.value)} placeholder="City, State" />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Additional Details (GPA, Honors, Coursework)</label>
                        <textarea
                            rows="2"
                            value={edu.details}
                            onChange={(e) => handleChange(index, 'details', e.target.value)}
                            placeholder="GPA: 3.8/4.0 | Dean's List"
                        />
                    </div>
                </div>
            ))}

            <button onClick={handleAdd} style={{ padding: '0.75rem', background: 'var(--surface-color)', color: 'var(--primary-color)', border: '1px dashed var(--primary-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Add Education
            </button>
        </div>
    );
}
