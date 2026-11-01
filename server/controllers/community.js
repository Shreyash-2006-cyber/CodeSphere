const User = require('../models/User');
const GitHub = require('../models/github');
const LeetCode = require('../models/leetcode');
const Tracker = require('../models/Tracker');
const FriendRequest = require('../models/FriendRequest');

// GET /api/community/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}).select('name email avatar githubUsername leetcodeUsername createdAt');

    const leaderboard = await Promise.all(
      users.map(async (u, idx) => {
        let ghData = null;
        let lcData = null;
        if (u.githubUsername) ghData = await GitHub.findOne({ userId: u._id });
        if (u.leetcodeUsername) lcData = await LeetCode.findOne({ userId: u._id });

        const trackers = await Tracker.find({ userId: u._id });
        const maxStreak = trackers.length > 0 ? Math.max(...trackers.map((t) => t.streak || 0), 0) : 0;
        const totalSolved = lcData?.totalSolved || (lcData?.easySolved || 0) + (lcData?.mediumSolved || 0) + (lcData?.hardSolved || 0);
        const ghStars = ghData?.totalStars || 0;
        const ghRepos = ghData?.publicRepos || 0;

        const score = totalSolved * 10 + ghStars * 15 + ghRepos * 5 + maxStreak * 20;

        return {
          id: u._id,
          rank: idx + 1,
          name: u.name,
          username: u.githubUsername || u.leetcodeUsername || u.name.toLowerCase().replace(/\s+/g, ''),
          avatar: u.avatar || '',
          score,
          streak: maxStreak,
          solved: totalSolved,
          githubStars: ghStars,
          repos: ghRepos,
          joined: u.createdAt,
        };
      })
    );

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.forEach((item, index) => {
      item.rank = index + 1;
    });

    res.status(200).json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/community/friends
const getFriends = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId).populate('friends', 'name email avatar githubUsername leetcodeUsername createdAt');
    
    // Explicitly accepted friends
    const friendsList = await Promise.all(
      (currentUser.friends || []).map(async (u) => {
        let ghData = null;
        let lcData = null;
        if (u.githubUsername) ghData = await GitHub.findOne({ userId: u._id });
        if (u.leetcodeUsername) lcData = await LeetCode.findOne({ userId: u._id });

        const trackers = await Tracker.find({ userId: u._id });
        const maxStreak = trackers.length > 0 ? Math.max(...trackers.map((t) => t.streak || 0), 0) : 0;
        const totalSolved = lcData?.totalSolved || (lcData?.easySolved || 0) + (lcData?.mediumSolved || 0) + (lcData?.hardSolved || 0);

        return {
          id: u._id,
          name: u.name,
          username: u.githubUsername || u.leetcodeUsername || u.name.toLowerCase().replace(/\s+/g, ''),
          avatar: u.avatar || '',
          status: 'online',
          streak: maxStreak,
          problemsSolved: totalSolved,
          repos: ghData?.publicRepos || 0,
          joined: u.createdAt,
          isFriend: true,
        };
      })
    );

    // Also fetch other registered users not yet friends
    const otherUsers = await User.find({
      _id: { $ne: currentUserId, $nin: currentUser.friends || [] },
    }).select('name email avatar githubUsername leetcodeUsername createdAt');

    // Check request status for other users
    const pendingSent = await FriendRequest.find({ sender: currentUserId, status: 'pending' });
    const pendingSentIds = new Set(pendingSent.map((r) => r.receiver.toString()));

    const suggestedUsers = await Promise.all(
      otherUsers.map(async (u) => {
        let ghData = null;
        let lcData = null;
        if (u.githubUsername) ghData = await GitHub.findOne({ userId: u._id });
        if (u.leetcodeUsername) lcData = await LeetCode.findOne({ userId: u._id });

        const trackers = await Tracker.find({ userId: u._id });
        const maxStreak = trackers.length > 0 ? Math.max(...trackers.map((t) => t.streak || 0), 0) : 0;
        const totalSolved = lcData?.totalSolved || (lcData?.easySolved || 0) + (lcData?.mediumSolved || 0) + (lcData?.hardSolved || 0);

        return {
          id: u._id,
          name: u.name,
          username: u.githubUsername || u.leetcodeUsername || u.name.toLowerCase().replace(/\s+/g, ''),
          avatar: u.avatar || '',
          status: 'offline',
          streak: maxStreak,
          problemsSolved: totalSolved,
          repos: ghData?.publicRepos || 0,
          joined: u.createdAt,
          isFriend: false,
          requestPending: pendingSentIds.has(u._id.toString()),
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        friends: friendsList,
        suggested: suggestedUsers,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/community/friend-requests
const getFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ receiver: req.user._id, status: 'pending' })
      .populate('sender', 'name avatar email githubUsername leetcodeUsername')
      .sort({ createdAt: -1 });

    const formatted = requests.map((r) => ({
      id: r._id,
      senderId: r.sender._id,
      name: r.sender.name,
      avatar: r.sender.avatar || '',
      mutualFriends: 0,
      createdAt: r.createdAt,
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/community/friend-request/send
const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    if (!receiverId) return res.status(400).json({ success: false, message: 'receiverId is required' });
    if (receiverId.toString() === senderId.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot send request to yourself' });
    }

    const existing = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existing) {
      if (existing.status === 'pending') {
        return res.status(400).json({ success: false, message: 'Friend request already pending' });
      }
      if (existing.status === 'accepted') {
        return res.status(400).json({ success: false, message: 'Already friends' });
      }
      existing.sender = senderId;
      existing.receiver = receiverId;
      existing.status = 'pending';
      await existing.save();
      return res.status(200).json({ success: true, message: 'Friend request sent', data: existing });
    }

    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Friend request sent', data: request });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/community/friend-request/respond
const respondFriendRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body; // action: 'accept' | 'decline'
    const userId = req.user._id;

    const request = await FriendRequest.findOne({ _id: requestId, receiver: userId });
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    if (action === 'accept') {
      request.status = 'accepted';
      await request.save();

      // Add each user to other's friends array
      await User.findByIdAndUpdate(userId, { $addToSet: { friends: request.sender } });
      await User.findByIdAndUpdate(request.sender, { $addToSet: { friends: userId } });

      return res.status(200).json({ success: true, message: 'Friend request accepted' });
    } else {
      request.status = 'declined';
      await request.save();
      return res.status(200).json({ success: true, message: 'Friend request declined' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/community/top-performers
const getTopPerformers = async (req, res) => {
  try {
    const users = await User.find({}).select('name email avatar githubUsername leetcodeUsername');

    const aggregated = await Promise.all(
      users.map(async (u) => {
        let ghData = null;
        let lcData = null;
        if (u.githubUsername) ghData = await GitHub.findOne({ userId: u._id });
        if (u.leetcodeUsername) lcData = await LeetCode.findOne({ userId: u._id });

        const trackers = await Tracker.find({ userId: u._id });
        const maxStreak = trackers.length > 0 ? Math.max(...trackers.map((t) => t.streak || 0), 0) : 0;
        const totalSolved = lcData?.totalSolved || (lcData?.easySolved || 0) + (lcData?.mediumSolved || 0) + (lcData?.hardSolved || 0);
        const ghStars = ghData?.totalStars || 0;
        const ghRepos = ghData?.publicRepos || 0;

        return {
          id: u._id,
          name: u.name,
          avatar: u.avatar || '',
          streak: maxStreak,
          solved: totalSolved,
          stars: ghStars,
          repos: ghRepos,
          score: totalSolved * 10 + ghStars * 15 + ghRepos * 5 + maxStreak * 20,
        };
      })
    );

    const overall = [...aggregated].sort((a, b) => b.score - a.score).slice(0, 3);
    const leetcode = [...aggregated].sort((a, b) => b.solved - a.solved).slice(0, 3);
    const github = [...aggregated].sort((a, b) => b.stars - a.stars).slice(0, 3);
    const streak = [...aggregated].sort((a, b) => b.streak - a.streak).slice(0, 3);

    res.status(200).json({
      success: true,
      data: {
        overall,
        leetcode,
        github,
        streak,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getLeaderboard,
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  respondFriendRequest,
  getTopPerformers,
};
