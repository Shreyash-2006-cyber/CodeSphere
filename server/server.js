require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`🚀 CodeSphere Server running on port ${PORT}`);
});

// Graceful shutdown handling for container orchestrators and cloud providers
const handleShutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
