export const leetcodeProfile = {
  username: "aditi_codes",
  ranking: 48213,
  contestRating: 1842,
  totalSolved: 612,
  totalProblems: 3412,
};

export const leetcodeDifficulty = [
  { name: "Easy", solved: 312, total: 850, color: "#16a34a" },
  { name: "Medium", solved: 251, total: 1780, color: "#f59e0b" },
  { name: "Hard", solved: 49, total: 782, color: "#ef4444" },
];

export const leetcodeSubmissionTrend = {
  labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  data: [38, 52, 44, 61, 58, 70],
};

// Weeks x days heatmap values (submissions per day for ~14 weeks)
export const leetcodeHeatmap = Array.from({ length: 14 * 7 }, () =>
  Math.random() > 0.35 ? Math.round(Math.random() * 5) : 0
);

export const leetcodeRecentSubmissions = [
  { id: 1, title: "Merge Intervals", difficulty: "Medium", status: "Accepted", language: "JavaScript", date: "2026-07-26" },
  { id: 2, title: "Word Search II", difficulty: "Hard", status: "Accepted", language: "Python", date: "2026-07-25" },
  { id: 3, title: "Two Sum", difficulty: "Easy", status: "Accepted", language: "JavaScript", date: "2026-07-24" },
  { id: 4, title: "Course Schedule", difficulty: "Medium", status: "Wrong Answer", language: "Python", date: "2026-07-24" },
  { id: 5, title: "LRU Cache", difficulty: "Medium", status: "Accepted", language: "TypeScript", date: "2026-07-22" },
  { id: 6, title: "Sliding Window Maximum", difficulty: "Hard", status: "Accepted", language: "JavaScript", date: "2026-07-21" },
  { id: 7, title: "Valid Parentheses", difficulty: "Easy", status: "Accepted", language: "Python", date: "2026-07-20" },
];
