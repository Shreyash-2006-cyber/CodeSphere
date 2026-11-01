const express = require("express");

const router = express.Router();

const githubController = require("../controllers/githubb");

router.post("/sync",githubController.getProfile);

module.exports=router;