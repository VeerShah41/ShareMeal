const express = require('express');
const { auth } = require('../../middleware/auth');
const { getMetrics, getDonorStats } = require('./analyticsController');

const router = express.Router();

router.get('/metrics', auth, getMetrics);
router.get('/donor/:donorId', auth, getDonorStats);

module.exports = router;