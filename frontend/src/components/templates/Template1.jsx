import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';

export default function Template1() {
    const { resumeData } = useContext(ResumeContext);
    const { personalInfo, summary, experience, education, skills, customization } = resumeData;
    const { fontSize = 12, spacing = 1.5 } = customization || {};

    const styles = {
        page: { padding: '40px', fontFamily: '"Inter", sans-serif', color: '#000', lineHeight: spacing, fontSize: `${fontSize}px` },
        header: { textAlign: 'center', marginBottom: `${fontSize * 1.5}px`, borderBottom: '2px solid #000', paddingBottom: '10px' },
        name: { fontSize: `${fontSize * 2}px`, fontWeight: 'bold', margin: 0, textTransform: 'uppercase' },
        contact: { fontSize: '12px', marginTop: '5px' },
        section: { marginTop: '15px' },
        sectionTitle: { fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', textTransform: 'uppercase', marginBottom: '10px' },
        item: { marginBottom: '10px' },
        itemHeader: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' },
        itemSub: { display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '12px', marginBottom: '5px' },
        text: { fontSize: '12px', margin: 0 },
        bulletText: { fontSize: '12px', margin: 0, paddingLeft: '15px', position: 'relative' },
        skillList: { fontSize: '12px', marginTop: '5px' }
    };

    return (
        <div style={styles.page} id="resume-document">
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.name}>{personalInfo.fullName || 'YOUR NAME'}</h1>
                <div style={styles.contact}>
                    {personalInfo.email && <span>{personalInfo.email} | </span>}
                    {personalInfo.phone && <span>{personalInfo.phone} | </span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin} | </span>}
                    {personalInfo.github && <span>{personalInfo.github}</span>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Professional Summary</div>
                    <p style={styles.text}>{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Experience</div>
                    {experience.map((exp, idx) => (
                        <div key={idx} style={styles.item}>
                            <div style={styles.itemHeader}>
                                <span>{exp.title}</span>
                                <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div style={styles.itemSub}>
                                <span>{exp.company}</span>
                                <span>{exp.location}</span>
                            </div>
                            {exp.description && exp.description.split('\n').map((line, i) => (
                                <div key={i} style={styles.bulletText}>• {line.replace(/^- /, '')}</div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Education</div>
                    {education.map((edu, idx) => (
                        <div key={idx} style={styles.item}>
                            <div style={styles.itemHeader}>
                                <span>{edu.degree}</span>
                                <span>{edu.date}</span>
                            </div>
                            <div style={styles.itemSub}>
                                <span>{edu.institution}</span>
                                <span>{edu.location}</span>
                            </div>
                            {edu.details && <p style={styles.text}>{edu.details}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Skills</div>
                    <div style={styles.skillList}>
                        <strong>Technical Skills: </strong> {skills.join(', ')}
                    </div>
                </div>
            )}
        </div>
    );
}
