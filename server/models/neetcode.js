const mongoose = require("mongoose");

const neetcodeSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    totalSolved: {
        type: Number,
        default: 0,
    },

    roadmapProgress: {
        type: Number,
        default: 0,
    },

    completedTopics: [{
        type: String,
    }],

    lastUpdated: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("NeetCode", neetcodeSchema);