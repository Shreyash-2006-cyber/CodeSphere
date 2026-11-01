const express = require('express');
const router = express.Router();
const leetcodeController = require('../controllers/leetcode');

router.get('/', leetcodeController.getStats);

module.exports = router;