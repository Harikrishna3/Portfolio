const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 1. Get entire portfolio data
app.get('/api/portfolio', (req, res) => {
    fs.readFile(DB_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

// 2. Update entire portfolio data
app.post('/api/portfolio', (req, res) => {
    const newData = req.body;
    
    if (typeof newData !== 'object') {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save data file' });
        }
        res.json({ success: true, message: 'Portfolio updated successfully' });
    });
});

// 3. Login
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin123') {
        res.json({ success: true, token: 'mock-jwt-token-' + Date.now() });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio Backend Live!`);
    console.log(`🔗 Interface: http://localhost:${PORT}`);
    console.log(`📁 Database: ${DB_PATH}\n`);
});
