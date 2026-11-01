const express = require('express');
const router = express.Router();
const {
  getLeaderboard,
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  respondFriendRequest,
  getTopPerformers,
} = require('../controllers/community');
const { protect } = require('../middleware/authmiddleware');

router.get('/leaderboard', protect, getLeaderboard);
router.get('/friends', protect, getFriends);
router.get('/friend-requests', protect, getFriendRequests);
router.post('/friend-request/send', protect, sendFriendRequest);
router.post('/friend-request/respond', protect, respondFriendRequest);
router.get('/top-performers', protect, getTopPerformers);

module.exports = router;
