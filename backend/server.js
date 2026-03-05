const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const scoreRoutes = require('./routes/scoreRoutes');


app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://ag-resume-builder-2je4.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AG Resume Builder API is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/score', scoreRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
