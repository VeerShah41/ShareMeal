const express = require('express');
const { auth, requireRole } = require('../../middleware/authorisation');;
const { getDonorProfile, createRating } = require('./donorController');

const router = express.Router();

router.get('/profile', auth, requireRole('donor'), getDonorProfile);
router.post('/ratings', auth, requireRole('donor'), createRating);

module.exports = router;