import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function WorkExperience() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);
    const experience = resumeData.experience || [];

    const handleAdd = () => {
        updateResumeData('experience', [
            ...experience,
            { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
        ]);
    };

    const handleChange = (index, field, value) => {
        const newExp = [...experience];
        newExp[index][field] = value;
        updateResumeData('experience', newExp);
    };

    const handleRemove = (index) => {
        const newExp = experience.filter((_, i) => i !== index);
        updateResumeData('experience', newExp);
    };

    return (
        <div className={styles.formStep}>
            <h2>Work Experience</h2>
            <p className={styles.description}>List your relevant work history. Use strong action verbs and metrics-driven achievements.</p>

            {experience.map((exp, index) => (
                <div key={index} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', position: 'relative' }}>
                    <button
                        onClick={() => handleRemove(index)}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Remove
                    </button>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Job Title</label>
                            <input value={exp.title} onChange={(e) => handleChange(index, 'title', e.target.value)} placeholder="Software Engineer" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Company</label>
                            <input value={exp.company} onChange={(e) => handleChange(index, 'company', e.target.value)} placeholder="Acme Corp" />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Start Date</label>
                            <input value={exp.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>End Date</label>
                            <input value={exp.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} placeholder="MM/YYYY or Present" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Location</label>
                            <input value={exp.location} onChange={(e) => handleChange(index, 'location', e.target.value)} placeholder="City, State" />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Achievements/Responsibilities (Bullet Points)</label>
                        <textarea
                            rows="4"
                            value={exp.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            placeholder="- Developed a scalable microservice that increased throughput by 40%..."
                        />
                    </div>
                </div>
            ))}

            <button onClick={handleAdd} style={{ padding: '0.75rem', background: 'var(--surface-color)', color: 'var(--primary-color)', border: '1px dashed var(--primary-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Add Work Experience
            </button>
        </div>
    );
}
