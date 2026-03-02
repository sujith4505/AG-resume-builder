const express = require('express');
const router = express.Router();
const db = require('../database');

// Dummy login/auth route
router.post('/login', (req, res) => {
    // Implement Google OAuth payload verification later
    res.json({ message: 'User authenticated' });
});

router.get('/profile', (req, res) => {
    res.json({ message: 'User profile fetched' });
});

module.exports = router;
