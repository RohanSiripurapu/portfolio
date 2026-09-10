// ---------- IMPORTS ----------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ---------- ROUTES ----------
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// ---------- APP SETUP ----------
const app = express();
const PORT = process.env.PORT || 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// ---------- ROOT TEST ROUTE ----------
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '🚀 Portfolio API is running successfully!',
    endpoints: {
      projects: '/api/projects',
      contact: '/api/contact',
    },
    timestamp: new Date().toISOString(),
  });
});

// ---------- MONGODB CONNECTION ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});