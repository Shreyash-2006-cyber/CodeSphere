export const welcomeStats = [
  { label: "Current streak", value: "21 days" },
  { label: "Problems solved", value: "612" },
  { label: "GitHub contributions", value: "1,240" },
  { label: "Goals completion", value: "84%" },
];

export const weeklyOverview = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  github: [3, 5, 2, 6, 4, 1, 0],
  leetcode: [2, 3, 1, 4, 2, 1, 1],
};

export const recentActivity = [
  { id: 1, text: "Solved 'Merge Intervals' on LeetCode", time: "2h ago" },
  { id: 2, text: "Pushed 4 commits to codesphere-frontend", time: "5h ago" },
  { id: 3, text: "Completed Tries category on NeetCode", time: "1d ago" },
  { id: 4, text: "Logged a gym session", time: "1d ago" },
  { id: 5, text: "Joined the Weekly DP Deep Dive challenge", time: "2d ago" },
];

export const quickActions = [
  { id: 1, label: "Log activity", path: "/tracker" },
  { id: 2, label: "View analytics", path: "/analytics" },
  { id: 3, label: "Join a challenge", path: "/challenges" },
  { id: 4, label: "Write a note", path: "/notes" },
];

export const goalsSummary = [
  { id: 1, label: "Solve 2 LeetCode problems", progress: 1, target: 2 },
  { id: 2, label: "4 gym sessions this week", progress: 2, target: 4 },
  { id: 3, label: "Ship 1 feature", progress: 1, target: 1 },
];

export const friendActivitySummary = [
  { id: 1, name: "Rahul Mehta", action: "solved 3 LeetCode problems", time: "2h ago" },
  { id: 2, name: "Priya Nair", action: "reached a 21-day streak", time: "5h ago" },
  { id: 3, name: "Wei Chen", action: "completed the DP roadmap", time: "1d ago" },
];

export const leaderboardPreview = [
  { rank: 1, name: "Wei Chen", points: 6800 },
  { rank: 2, name: "Rahul Mehta", points: 6120 },
  { rank: 3, name: "Aditi Sharma", points: 5780 },
  { rank: 4, name: "Priya Nair", points: 5410 },
];

export const platformSummaries = [
  { id: "github", label: "GitHub", value: "38 repos", secondary: "1,240 contributions", accent: "#2563eb" },
  { id: "leetcode", label: "LeetCode", value: "612 solved", secondary: "Rank #48,213", accent: "#f59e0b" },
  { id: "neetcode", label: "NeetCode", value: "58% complete", secondary: "88 / 152 problems", accent: "#16a34a" },
  { id: "tracker", label: "Manual Tracker", value: "8 active", secondary: "3 categories", accent: "#4f46e5" },
];
