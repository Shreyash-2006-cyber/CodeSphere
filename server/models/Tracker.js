const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Learning',
      trim: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    goal: {
      type: String,
      default: '',
      trim: true,
    },
    streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#2563eb',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tracker', trackerSchema);
