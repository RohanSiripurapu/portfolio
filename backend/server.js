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
// CORS: allow localhost (dev) + Render frontend URL (prod)
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:3000',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // In dev, allow anything; in prod, log the rejected origin
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      console.warn('❌ CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

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
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});