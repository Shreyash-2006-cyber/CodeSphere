const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profile');
const { protect } = require('../middleware/authmiddleware');

router.get('/', protect, getProfile);

module.exports = router;
