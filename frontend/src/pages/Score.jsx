import { useState, useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import styles from './Score.module.css';

export default function Score() {
    const { resumeData } = useContext(ResumeContext);
    const [scoreResult, setScoreResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCheckScore = async () => {
        setLoading(true);
        try {
            let response;

            if (selectedFile) {
                // Handle file upload check
                const formData = new FormData();
                formData.append('resumePdf', selectedFile);
                response = await fetch('http://localhost:5000/api/score/upload', {
                    method: 'POST',
                    body: formData
                });
            } else {
                // Handle JSON builder data check
                response = await fetch('http://localhost:5000/api/score/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resumeData })
                });
            }

            const data = await response.json();

            if (response.ok) {
                setScoreResult(data);
            } else {
                alert(data.error || 'Failed to process document');
            }
        } catch (error) {
            console.error('Failed to get score:', error);
            alert('Failed to connect to the scoring API. Ensure the backend server is running on port 5000.');
        }
        setLoading(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    return (
        <div className={styles.scoreContainer}>
            <h1 className={styles.title}>ATS Resume Score Checker</h1>
            <p className={styles.description}>
                Our intelligent algorithm evaluates your resume against industry-standard Application Tracking Systems to ensure maximum visibility and keyword density.
            </p>

            {!scoreResult && (
                <div className={styles.inputMethods}>
                    <div className={styles.uploadSection}>
                        <h3>Option 1: Analyze Built Resume</h3>
                        <p className={styles.subtext}>Scan the resume you are currently generating in the builder.</p>
                        <button onClick={handleCheckScore} disabled={loading || selectedFile} className={styles.checkBtn}>
                            {loading && !selectedFile ? 'Analyzing...' : 'Analyze Builder Data'}
                        </button>
                    </div>

                    <div className={styles.uploadSection}>
                        <h3>Option 2: Upload External PDF</h3>
                        <p className={styles.subtext}>Check an existing PDF resume against ATS logic.</p>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                            id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className={styles.uploadLabel}>
                            {selectedFile ? selectedFile.name : 'Select PDF File'}
                        </label>
                        {selectedFile && (
                            <button onClick={handleCheckScore} disabled={loading} className={styles.checkBtn} style={{ marginTop: '1rem' }}>
                                {loading && selectedFile ? 'Uploading & Analyzing...' : 'Analyze Uploaded PDF'}
                            </button>
                        )}
                        {selectedFile && (
                            <button onClick={() => setSelectedFile(null)} disabled={loading} className={styles.clearBtn} style={{ marginTop: '0.5rem' }}>
                                Clear File
                            </button>
                        )}
                    </div>
                </div>
            )}

            {scoreResult && (
                <div className={styles.resultsPanel}>
                    <div className={styles.scoreCircle}>
                        <span className={styles.scoreNumber}>{scoreResult.score}</span>
                        <span className={styles.scoreText}>/ 100</span>
                    </div>
                    <h2 className={styles.statusLabel}>Rating: {scoreResult.status}</h2>

                    <div className={styles.feedbackSection}>
                        <h3>AI Feedback & Improvements</h3>
                        {scoreResult.feedback.length > 0 ? (
                            <ul className={styles.feedbackList}>
                                {scoreResult.feedback.map((item, idx) => (
                                    <li key={idx} className={styles.feedbackItem}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.perfectScore}>Your resume structure is perfect! No formatting improvements needed.</p>
                        )}
                    </div>

                    <button onClick={() => { setScoreResult(null); setSelectedFile(null); }} className={styles.recheckBtn}>
                        Re-evaluate
                    </button>
                </div>
            )}
        </div>
    );
}
