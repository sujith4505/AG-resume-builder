import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import PersonalInfo from '../components/builder/PersonalInfo';
import ProfessionalSummary from '../components/builder/ProfessionalSummary';
import WorkExperience from '../components/builder/WorkExperience';
import Education from '../components/builder/Education';
import Skills from '../components/builder/Skills';
import Customize from '../components/builder/Customize';
import ATSPreview from '../components/preview/ATSPreview';
import styles from './Build.module.css';

const steps = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfo },
    { id: 'summary', label: 'Summary', component: ProfessionalSummary },
    { id: 'experience', label: 'Experience', component: WorkExperience },
    { id: 'education', label: 'Education', component: Education },
    { id: 'skills', label: 'Skills', component: Skills },
    { id: 'customize', label: 'Customize', component: Customize },
];

export default function Build() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

    const handleDownloadPDF = () => {
        const element = document.getElementById('resume-document');
        if (!element) return;

        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Disable scaling during print to ensure proper A4/Letter size
        element.style.transform = 'none';

        html2pdf().set(opt).from(element).save().then(() => {
            // Restore scaling if needed
        });
    };

    const ActiveComponent = steps[currentStep].component;

    return (
        <div className={styles.buildLayout}>
            <div className={styles.editorPane}>
                <div className={styles.stepper}>
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`${styles.stepIndicator} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                        >
                            {step.label}
                        </div>
                    ))}
                </div>

                <div className={styles.formContainer}>
                    <ActiveComponent />
                </div>

                <div className={styles.navigationButtons}>
                    <button onClick={prevStep} disabled={currentStep === 0} className={styles.btnSecondary}>
                        Back
                    </button>
                    <button
                        onClick={currentStep === steps.length - 1 ? handleDownloadPDF : nextStep}
                        className={styles.btnPrimary}
                    >
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>

            <div className={styles.previewPane}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className={styles.previewHeader} style={{ margin: 0 }}>Live Preview</h3>
                    <button onClick={handleDownloadPDF} style={{ background: '#10B981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Download PDF
                    </button>
                </div>
                <div className={styles.previewWrapper}>
                    <ATSPreview />
                </div>
            </div>
        </div>
    );
}
