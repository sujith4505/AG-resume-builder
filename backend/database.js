const { createClient } = require('@libsql/client');

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize tables on startup
async function initDB() {
    await db.execute(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT UNIQUE,
        theme_preference TEXT DEFAULT 'white',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.execute(`CREATE TABLE IF NOT EXISTS resumes (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT,
        data_payload TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
    await db.execute(`CREATE TABLE IF NOT EXISTS scores (
        id TEXT PRIMARY KEY,
        resume_id TEXT,
        score INTEGER,
        feedback_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(resume_id) REFERENCES resumes(id)
    )`);
    console.log('Turso DB initialized successfully.');
}

initDB().catch(err => console.error('DB init error:', err));

module.exports = db;
