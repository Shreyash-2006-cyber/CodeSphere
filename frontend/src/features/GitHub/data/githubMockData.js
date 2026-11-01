export const githubProfile = {
  username: "aditisharma-dev",
  name: "Aditi Sharma",
  avatar: "",
  bio: "Frontend engineer. Building in public. Coffee-powered.",
  followers: 482,
  following: 96,
  publicRepos: 38,
  totalStars: 1240,
  location: "Indore, India",
  joined: "2020-03-14",
};

export const githubLanguages = [
  { name: "JavaScript", value: 42, color: "#f1e05a" },
  { name: "TypeScript", value: 24, color: "#3178c6" },
  { name: "Python", value: 16, color: "#3572A5" },
  { name: "CSS", value: 10, color: "#563d7c" },
  { name: "Other", value: 8, color: "#94a3b8" },
];

// Contribution counts for the last ~18 weeks, Sun-Sat rows for a heatmap-style grid.
export const githubContributions = Array.from({ length: 18 * 7 }, (_, i) => {
  const weekday = i % 7;
  const base = weekday === 0 || weekday === 6 ? 0.4 : 1;
  const value = Math.max(0, Math.round((Math.random() * 6 - 1) * base));
  return value;
});

export const githubWeeklyCommits = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  data: [8, 12, 6, 14, 10, 3, 1],
};

export const githubRepositories = [
  { id: 1, name: "codesphere-frontend", description: "Frontend for a collaborative dev-productivity dashboard.", language: "TypeScript", stars: 312, forks: 41, updated: "2026-07-20" },
  { id: 2, name: "leetcode-tracker-cli", description: "CLI tool to sync LeetCode submissions locally.", language: "Python", stars: 208, forks: 22, updated: "2026-07-14" },
  { id: 3, name: "react-charts-lib", description: "Lightweight chart primitives built on Canvas.", language: "JavaScript", stars: 189, forks: 30, updated: "2026-06-30" },
  { id: 4, name: "design-tokens-kit", description: "Token pipeline for multi-brand design systems.", language: "CSS", stars: 96, forks: 12, updated: "2026-06-18" },
  { id: 5, name: "study-notes-api", description: "Small API for structured note-taking apps.", language: "TypeScript", stars: 74, forks: 9, updated: "2026-05-29" },
  { id: 6, name: "habit-heatmap", description: "SVG habit-tracking heatmap component.", language: "JavaScript", stars: 61, forks: 7, updated: "2026-05-11" },
];

export const githubStats = [
  { label: "Public repos", value: githubProfile.publicRepos },
  { label: "Total stars", value: githubProfile.totalStars },
  { label: "Followers", value: githubProfile.followers },
  { label: "Following", value: githubProfile.following },
];
