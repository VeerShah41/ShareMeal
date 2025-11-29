const express = require('express');
const { auth, requireRole } = require('../../middleware/authorisation');;
const { getVolunteerProfile, getDashboard } = require('./volunteerController');

const router = express.Router();

router.get('/profile', auth, requireRole('volunteer'), getVolunteerProfile);
router.get('/dashboard', auth, requireRole('volunteer'), getDashboard);

module.exports = router;