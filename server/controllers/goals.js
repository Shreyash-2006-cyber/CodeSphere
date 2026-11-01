const Goal = require('../models/Goal');

// GET /api/goals — user ke saare goals grouped by period
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: 1 });
    const grouped = { daily: [], weekly: [], monthly: [] };
    goals.forEach((g) => {
      if (grouped[g.period]) grouped[g.period].push(g);
    });
    res.status(200).json({ success: true, data: grouped });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/goals — new goal banana
const createGoal = async (req, res) => {
  try {
    const { label, period, target } = req.body;
    if (!label || !period || !target) {
      return res.status(400).json({ success: false, message: 'label, period and target are required' });
    }
    const goal = await Goal.create({ userId: req.user._id, label, period, target, progress: 0 });
    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/goals/:id — progress update ya pura edit
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });

    const { label, period, target, progress } = req.body;
    if (label !== undefined) goal.label = label;
    if (period !== undefined) goal.period = period;
    if (target !== undefined) goal.target = target;
    if (progress !== undefined) goal.progress = Math.min(progress, goal.target);

    await goal.save();
    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/goals/:id
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    res.status(200).json({ success: true, message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
