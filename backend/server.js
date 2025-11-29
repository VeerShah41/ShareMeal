const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./src/auth/authRoutes');
const userRoutes = require('./src/users/userRoutes');
const volunteerRoutes = require('./src/volunteers/volunteerRoutes');
const donorRoutes = require('./src/donors/donorRoutes');

const donationRoutes = require('./src/donations/donationRoutes');
const analyticsRoutes = require('./src/analytics/analyticsRoutes');
const matchingRoutes = require('./src/matching/matchingRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/volunteers', volunteerRoutes);
app.use('/api/v1/donors', donorRoutes);

app.use('/api/v1/donations', donationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/matching', matchingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;