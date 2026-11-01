export const trackerCategories = [
  "All",
  "Fitness",
  "Exam Prep",
  "Development",
  "Wellness",
  "Learning",
];

export const trackers = [
  { id: 1, name: "Gym", category: "Fitness", progress: 68, goal: "4 sessions / week", streak: 12, notes: "Push/pull/legs split, tracking PRs.", color: "#2563eb" },
  { id: 2, name: "JEE Main Prep", category: "Exam Prep", progress: 42, goal: "6 hrs / day", streak: 5, notes: "Focusing on Physics mechanics this week.", color: "#4f46e5" },
  { id: 3, name: "Web Development", category: "Development", progress: 81, goal: "Ship 1 feature / week", streak: 21, notes: "Building the CodeSphere dashboard.", color: "#0ea5e9" },
  { id: 4, name: "Meditation", category: "Wellness", progress: 55, goal: "10 min / day", streak: 8, notes: "Morning sessions before work.", color: "#16a34a" },
  { id: 5, name: "Machine Learning", category: "Learning", progress: 34, goal: "3 modules / week", streak: 3, notes: "Working through Andrew Ng's course.", color: "#f59e0b" },
  { id: 6, name: "Running", category: "Fitness", progress: 60, goal: "20 km / week", streak: 9, notes: "Building up to a 10k race.", color: "#ef4444" },
  { id: 7, name: "UPSC Prelims", category: "Exam Prep", progress: 25, goal: "5 hrs / day", streak: 2, notes: "Current affairs + NCERT revision.", color: "#7c3aed" },
  { id: 8, name: "Spanish Learning", category: "Learning", progress: 47, goal: "20 min / day", streak: 15, notes: "Duolingo + conversation practice.", color: "#0891b2" },
];

export const trackerCalendar = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  done: Math.random() > 0.35,
}));
