const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'ag_resume.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the AG SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT UNIQUE,
        theme_preference TEXT DEFAULT 'white',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS resumes (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT,
        data_payload TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
        db.run(`CREATE TABLE IF NOT EXISTS scores (
        id TEXT PRIMARY KEY,
        resume_id TEXT,
        score INTEGER,
        feedback_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(resume_id) REFERENCES resumes(id)
    )`);
    }
});

module.exports = db;
