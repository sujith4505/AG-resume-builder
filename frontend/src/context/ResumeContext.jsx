import { createContext, useState } from 'react';

export const ResumeContext = createContext();

const initialResumeState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    customization: {
        fontSize: 12,
        spacing: 1.5,
    },
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeState);

    const updateResumeData = (section, data) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
            {children}
        </ResumeContext.Provider>
    );
};
