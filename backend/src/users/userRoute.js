const express = require('express');
const { auth } = require('../../middleware/authorisation');;
const { getProfile, updateProfile } = require('./userController');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;