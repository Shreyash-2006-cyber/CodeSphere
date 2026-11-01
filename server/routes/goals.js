const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goals');
const { protect } = require('../middleware/authmiddleware');

router.use(protect);
router.get('/', getGoals);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
