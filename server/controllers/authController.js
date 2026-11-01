const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Helper: generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Helper: build safe user payload (no password)
const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar || "",
  githubUsername: user.githubUsername || "",
  leetcodeUsername: user.leetcodeUsername || "",
  neetcodeUsername: user.neetcodeUsername || "",
});

// @route  POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, githubUsername, leetcodeUsername, neetcodeUsername } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      githubUsername: githubUsername || "",
      leetcodeUsername: leetcodeUsername || "",
      neetcodeUsername: neetcodeUsername || "",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: userPayload(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userPayload(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: userPayload(req.user),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/auth/update  (protected)
const updateProfile = async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const { name, email, githubUsername, leetcodeUsername, neetcodeUsername, avatar } = req.body;
    if (name !== undefined) user.name = name.trim();
    if (email !== undefined) user.email = email.trim().toLowerCase();
    if (githubUsername !== undefined) user.githubUsername = githubUsername.trim();
    if (leetcodeUsername !== undefined) user.leetcodeUsername = leetcodeUsername.trim();
    if (neetcodeUsername !== undefined) user.neetcodeUsername = neetcodeUsername.trim();
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    const token = generateToken(user._id);
    res.status(200).json({ success: true, token, user: userPayload(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe, updateProfile };


