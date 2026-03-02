const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const db = require('../database');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/check', (req, res) => {
    const { resumeData } = req.body;

    if (!resumeData) {
        return res.status(400).json({ error: 'No resume data provided' });
    }

    let score = 0;
    const feedback = [];

    // 1. Completeness Check (Max 40 points)
    const { personalInfo, summary, experience, education, skills } = resumeData;

    if (personalInfo?.fullName && personalInfo?.email && personalInfo?.phone) {
        score += 15;
    } else {
        feedback.push('Missing critical contact information (Name, Email, or Phone).');
    }

    if (summary && summary.length > 50) {
        score += 5;
    } else {
        feedback.push('Professional summary is missing or too short. Aim for at least 2 sentences.');
    }

    if (experience && experience.length > 0) {
        score += 10;
    } else {
        feedback.push('No work experience defined. Include relevant projects if no formal experience.');
    }

    if (education && education.length > 0) {
        score += 5;
    } else {
        feedback.push('Education details are missing.');
    }

    if (skills && skills.length >= 5) {
        score += 5;
    } else {
        feedback.push('Add at least 5 hard technical skills to improve ATS keyword hits.');
    }

    // 2. Formatting & Keyword Logic (Max 60 points)
    const actionVerbs = ['developed', 'designed', 'optimized', 'managed', 'led', 'created', 'implemented', 'reduced', 'increased', 'engineered'];
    let strongVerbsFound = 0;
    let bulletFormatGood = true;

    if (experience) {
        experience.forEach(exp => {
            if (exp.description) {
                const descLower = exp.description.toLowerCase();
                actionVerbs.forEach(verb => {
                    if (descLower.includes(verb)) strongVerbsFound++;
                });

                // Check basic bullet format
                if (exp.description.length < 20) bulletFormatGood = false;
            }
        });
    }

    if (strongVerbsFound >= 3) {
        score += 40;
    } else {
        score += (strongVerbsFound * 10);
        feedback.push(`Use more strong action verbs (e.g., Developed, Optimized, Led). Found ${strongVerbsFound}.`);
    }

    if (bulletFormatGood) {
        score += 20;
    } else {
        score += 5;
        feedback.push('Ensure your experience descriptions use descriptive bullet points detailing your achievements.');
    }

    // Ensure max 100
    score = Math.min(score, 100);

    res.json({
        score,
        feedback,
        status: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'
    });
});

// New Route: Upload PDF and Score Text
router.post('/upload', upload.single('resumePdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const text = pdfData.text.toLowerCase();

        let score = 0;
        const feedback = [];

        // 1. Completeness Checks on Raw Text (Max 40 points)
        const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
        const hasPhone = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/.test(text);

        if (hasEmail && hasPhone) {
            score += 15;
        } else {
            feedback.push('Missing critical contact information (Email or Phone number not detected).');
        }

        const keywords = ['experience', 'education', 'skills', 'summary', 'projects'];
        let sectionsFound = 0;
        keywords.forEach(kw => {
            if (text.includes(kw)) sectionsFound++;
        });

        if (sectionsFound >= 3) {
            score += 25;
        } else {
            score += (sectionsFound * 5);
            feedback.push('Standard sections (Experience, Education, Skills) are missing or improperly labelled.');
        }

        // 2. Keyword & Action Verb Logic (Max 60 points)
        const actionVerbs = ['developed', 'designed', 'optimized', 'managed', 'led', 'created', 'implemented', 'reduced', 'increased', 'engineered', 'analyzed', 'resolved'];
        let strongVerbsFound = 0;

        actionVerbs.forEach(verb => {
            // Count occurrences crudely
            const regex = new RegExp(verb, 'g');
            const matches = text.match(regex);
            if (matches) strongVerbsFound += matches.length;
        });

        if (strongVerbsFound >= 5) {
            score += 60;
        } else {
            score += (strongVerbsFound * 10);
            feedback.push(`Use more strong action verbs (e.g., Developed, Optimized, Led). Only detected ${strongVerbsFound}.`);
        }

        score = Math.min(score, 100);

        res.json({
            score,
            feedback,
            status: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work',
            parsedTextSnippet: text.substring(0, 200) + '...'
        });

    } catch (error) {
        console.error('Error parsing PDF:', error);
        res.status(500).json({ error: 'Failed to parse PDF document' });
    }
});

module.exports = router;
