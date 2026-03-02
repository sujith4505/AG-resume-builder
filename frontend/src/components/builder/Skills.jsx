import { useContext, useState } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import styles from './FormStep.module.css';

export default function Skills() {
    const { resumeData, updateResumeData } = useContext(ResumeContext);
    const skills = resumeData.skills || [];
    const [skillInput, setSkillInput] = useState('');

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            updateResumeData('skills', [...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        updateResumeData('skills', skills.filter(s => s !== skillToRemove));
    };

    return (
        <div className={styles.formStep}>
            <h2>Technical Skills</h2>
            <p className={styles.description}>Add hard skills relevant to the roles you are applying for to maximize ATS keyword scoring.</p>

            <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>Add Skill</label>
                    <input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. React.js, Python, AWS"
                    />
                </div>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: 'var(--bg-color)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Add
                </button>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {skills.map((skill, index) => (
                    <span key={index} style={{ background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 'bold' }}>&times;</button>
                    </span>
                ))}
                {skills.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No skills added yet.</span>}
            </div>
        </div>
    );
}
