import { Link } from 'react-router-dom';
import styles from './Templates.module.css';

export default function Templates() {
    const templates = [
        {
            id: 'template1',
            name: 'ATS Standard',
            description: 'A traditional, single-column design mathematically optimized for 100% Applicant Tracking System parsability.',
            image: '📝'
        },
        {
            id: 'template2',
            name: 'Modern Minimal (Coming Soon)',
            description: 'Sleek and clean layout focused on typography and white space for creative roles.',
            image: '✨'
        },
        {
            id: 'template3',
            name: 'Executive (Coming Soon)',
            description: 'A refined template suited for senior management and C-level positions.',
            image: '👔'
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Basic Templates</h1>
            <p className={styles.description}>
                Select from our enterprise-grade, ATS-friendly templates. All layouts are programmatically designed to bypass robot filters.
            </p>

            <div className={styles.grid}>
                {templates.map(template => (
                    <div key={template.id} className={`${styles.card} ${template.id !== 'template1' ? styles.disabledCard : ''}`}>
                        <div className={styles.cardImage}>{template.image}</div>
                        <h3 className={styles.cardTitle}>{template.name}</h3>
                        <p className={styles.cardDesc}>{template.description}</p>
                        {template.id === 'template1' ? (
                            <Link to="/build" className={styles.btnPrimary}>Use Template</Link>
                        ) : (
                            <button disabled className={styles.btnDisabled}>In Development</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
