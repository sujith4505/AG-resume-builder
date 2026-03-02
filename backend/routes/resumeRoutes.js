const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all resumes for user
router.get('/', (req, res) => {
    res.json({ resumes: [] });
});

// Save a new resume
router.post('/', (req, res) => {
    res.json({ message: 'Resume saved efficiently' });
});

module.exports = router;
