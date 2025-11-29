const express = require('express');
const { auth, requireRole } = require('../../middleware/auth');
const { createDonation, getDonations, acceptDonation, completeDonation } = require('./donationController');

const router = express.Router();

router.post('/', auth, requireRole('donor'), createDonation);
router.get('/', auth, getDonations);
router.post('/:id/accept', auth, requireRole('volunteer'), acceptDonation);
router.post('/:id/complete', auth, requireRole('volunteer'), completeDonation);

module.exports = router;