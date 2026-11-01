const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Routes
const authRoutes    = require("./routes/authRoutes");
const githubRoutes  = require("./routes/github");
const leetcodeRoutes = require("./routes/leetcode");
const goalsRoutes   = require("./routes/goals");
const notesRoutes   = require("./routes/notes");
const trackerRoutes = require("./routes/tracker");
const profileRoutes = require("./routes/profile");
const communityRoutes = require("./routes/community");

app.use("/api/auth",     authRoutes);
app.use("/api/github",   githubRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/goals",    goalsRoutes);
app.use("/api/notes",    notesRoutes);
app.use("/api/tracker",  trackerRoutes);
app.use("/api/profile",  profileRoutes);
app.use("/api/community", communityRoutes);

module.exports = app;