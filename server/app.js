const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Determine allowed CORS origins dynamically to support Vercel deployments and credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, server-to-server)
      if (!origin) return callback(null, true);

      if (process.env.CLIENT_URL && process.env.CLIENT_URL !== "*") {
        const allowed = process.env.CLIENT_URL.split(",").map((url) => url.trim());
        if (allowed.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
          return callback(null, true);
        }
      }

      // Default: reflect origin so credentials: true works seamlessly
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint for deployment monitoring and orchestrators
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const githubRoutes = require("./routes/github");
const leetcodeRoutes = require("./routes/leetcode");
const goalsRoutes = require("./routes/goals");
const notesRoutes = require("./routes/notes");
const trackerRoutes = require("./routes/tracker");
const profileRoutes = require("./routes/profile");
const communityRoutes = require("./routes/community");

app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/community", communityRoutes);

// Catch unmatched /api routes
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Serve frontend static build if available (unified fullstack deployment)
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  // SPA fallback for non-API client routes
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(frontendDistPath, "index.html"));
    }
    next();
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
