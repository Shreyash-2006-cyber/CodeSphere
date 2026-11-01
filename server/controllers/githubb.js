const githubService = require("../services/github");

const getProfile = async (req,res)=>{

    try{

        const { userId, username } = req.body;

        const profile = await githubService.getGithubProfile(userId,username);

        res.status(200).json(profile);

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

module.exports={
    getProfile
};