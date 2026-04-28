const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'jain6604',
    database: process.env.DB_NAME || 'NovaCrestDB'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL Database (NovaCrestDB)');
});

// --- API Endpoints ---

// Get all students
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get all staff
app.get('/api/staff', (req, res) => {
    db.query('SELECT * FROM Staff', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get attendance report (Join)
app.get('/api/attendance', (req, res) => {
    const q = `
        SELECT s.FirstName, s.LastName, a.Date, a.Status 
        FROM Students s 
        JOIN Attendance a ON s.StudentID = a.StudentID
        ORDER BY a.Date DESC`;
    db.query(q, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get analytics (Aggregation)
app.get('/api/analytics/marks', (req, res) => {
    const q = 'SELECT Subject, AVG(Score) as AverageScore FROM Marks GROUP BY Subject';
    db.query(q, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get Fees report (Join)
app.get('/api/fees', (req, res) => {
    const q = `
        SELECT s.FirstName, s.LastName, f.Amount, f.Status, f.PaymentDate 
        FROM Students s 
        JOIN Fees f ON s.StudentID = f.StudentID`;
    db.query(q, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get All Marks
app.get('/api/marks', (req, res) => {
    const q = `
        SELECT s.FirstName, s.LastName, m.Subject, m.Score, m.ExamDate 
        FROM Students s 
        JOIN Marks m ON s.StudentID = m.StudentID`;
    db.query(q, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

const PORT = process.env.PORT || 5104;
app.listen(PORT, () => {
    console.log(`🚀 Bridge Server running on http://localhost:${PORT}`);
});
