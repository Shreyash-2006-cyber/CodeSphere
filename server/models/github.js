const mongoose = require("mongoose");

const githubSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    username:String,

    followers:Number,

    following:Number,

    publicRepos:Number,

    avatar:String,

    bio:String,

    location:String,

    profileUrl:String,

    totalStars:{
        type:Number,
        default:0
    },

    repositories:[{
        id:Number,
        name:String,
        description:String,
        language:String,
        stars:Number,
        forks:Number,
        updated:String,
        htmlUrl:String
    }],

    languages:[{
        name:String,
        value:Number,
        color:String
    }],

    contributions: [Number],

    weeklyCommits: {
        labels: [String],
        data: [Number]
    },

    lastUpdated:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
});

module.exports = mongoose.model("GitHub",githubSchema);