const express = require('express');
const { auth, requireRole } = require('../../middleware/authorisation');;
const { getMatchedDonations, suggestVolunteer } = require('./matchingController');

const router = express.Router();

router.get('/donations', auth, requireRole('volunteer'), getMatchedDonations);
router.post('/suggest', auth, requireRole('donor'), suggestVolunteer);

module.exports = router;