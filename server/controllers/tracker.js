const Tracker = require('../models/Tracker');

// GET /api/tracker
const getTrackers = async (req, res) => {
  try {
    const trackers = await Tracker.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: trackers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/tracker
const createTracker = async (req, res) => {
  try {
    const { name, category, progress, goal, streak, notes, color } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'name is required' });
    const tracker = await Tracker.create({
      userId: req.user._id,
      name,
      category: category || 'Learning',
      progress: progress ?? 0,
      goal: goal || '',
      streak: streak ?? 0,
      notes: notes || '',
      color: color || '#2563eb',
    });
    res.status(201).json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/tracker/:id
const updateTracker = async (req, res) => {
  try {
    const tracker = await Tracker.findOne({ _id: req.params.id, userId: req.user._id });
    if (!tracker) return res.status(404).json({ success: false, message: 'Tracker not found' });
    const fields = ['name', 'category', 'progress', 'goal', 'streak', 'notes', 'color'];
    fields.forEach((f) => { if (req.body[f] !== undefined) tracker[f] = req.body[f]; });
    await tracker.save();
    res.status(200).json({ success: true, data: tracker });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/tracker/:id
const deleteTracker = async (req, res) => {
  try {
    const tracker = await Tracker.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!tracker) return res.status(404).json({ success: false, message: 'Tracker not found' });
    res.status(200).json({ success: true, message: 'Tracker deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTrackers, createTracker, updateTracker, deleteTracker };
