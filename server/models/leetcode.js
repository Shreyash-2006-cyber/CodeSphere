const mongoose = require('mongoose');

const leetcodeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  totalSolved: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
  ranking: { type: Number, default: 0 },
  contestRating: { type: Number, default: 0 },
  acceptanceRate: { type: Number, default: 0.0 },
  recentSubmissions: [
    {
      title: String,
      status: String,
      language: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  contestHistory: [
    {
      contestTitle: String,
      rating: Number,
    }
  ],
  submissionHeatmap: [Number],
  lastSynced: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LeetCode', leetcodeSchema);