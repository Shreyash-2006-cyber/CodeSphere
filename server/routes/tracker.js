const express = require('express');
const router = express.Router();
const { getTrackers, createTracker, updateTracker, deleteTracker } = require('../controllers/tracker');
const { protect } = require('../middleware/authmiddleware');

router.use(protect);
router.get('/', getTrackers);
router.post('/', createTracker);
router.put('/:id', updateTracker);
router.delete('/:id', deleteTracker);

module.exports = router;
