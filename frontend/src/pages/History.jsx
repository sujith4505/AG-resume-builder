import { useEffect, useState } from 'react';
import styles from './History.module.css';

export default function History() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated fetch from DB
        const fetchResumes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes`);
                const data = await response.json();
                setResumes(data.resumes || []);
            } catch (err) {
                console.error('Failed to fetch resumes:', err);
            }
            setLoading(false);
        };

        fetchResumes();
    }, []);

    return (
        <div className={styles.historyContainer}>
            <h1 className={styles.title}>Resume History Dashboard</h1>
            <p className={styles.description}>Manage your saved resumes. Edit, download, or duplicate them here.</p>

            {loading ? (
                <p>Loading your resumes...</p>
            ) : resumes.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No resumes found.</p>
                    <a href="/build" className={styles.btnPrimary}>Create Your First Resume</a>
                </div>
            ) : (
                <div className={styles.grid}>
                    {resumes.map(resume => (
                        <div key={resume.id} className={styles.card}>
                            <h3 className={styles.cardTitle}>{resume.title}</h3>
                            <p className={styles.cardDate}>Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                            <div className={styles.actions}>
                                <button className={styles.btnSecondary}>Edit</button>
                                <button className={styles.btnSecondary}>Download PDF</button>
                                <button className={styles.btnDanger}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
