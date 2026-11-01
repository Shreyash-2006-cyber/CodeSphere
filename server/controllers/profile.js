const User = require('../models/User');
const Goal = require('../models/Goal');
const Note = require('../models/Note');
const Tracker = require('../models/Tracker');

// GET /api/profile — aggregated profile data
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const [goalCount, noteCount, trackerCount] = await Promise.all([
      Goal.countDocuments({ userId: user._id }),
      Note.countDocuments({ userId: user._id }),
      Tracker.countDocuments({ userId: user._id }),
    ]);

    // Goals completion stats
    const goals = await Goal.find({ userId: user._id });
    const completedGoals = goals.filter((g) => g.progress >= g.target).length;

    const connectedPlatforms = [];
    if (user.githubUsername) connectedPlatforms.push({ name: 'GitHub', username: user.githubUsername, connected: true });
    if (user.leetcodeUsername) connectedPlatforms.push({ name: 'LeetCode', username: user.leetcodeUsername, connected: true });
    if (user.neetcodeUsername) connectedPlatforms.push({ name: 'NeetCode', username: user.neetcodeUsername, connected: true });

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        githubUsername: user.githubUsername || '',
        leetcodeUsername: user.leetcodeUsername || '',
        neetcodeUsername: user.neetcodeUsername || '',
        joinedAt: user.createdAt,
        stats: [
          { label: 'Goals created', value: goalCount },
          { label: 'Goals completed', value: completedGoals },
          { label: 'Notes', value: noteCount },
          { label: 'Trackers', value: trackerCount },
        ],
        connectedPlatforms,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProfile };
