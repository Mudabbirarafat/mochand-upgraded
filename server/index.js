require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
const contactRoutes = require('./routes/contact');

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, '..')));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Email backend running on http://localhost:${PORT}`);
});
