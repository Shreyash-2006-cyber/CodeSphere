import { LuGithub, LuCode, LuFlame, LuSwords, LuActivity, LuBrainCircuit } from "react-icons/lu";

export const topPerformers = [
  { id: 1, title: "Top GitHub Contributor", name: "Wei Chen", stat: "412 contributions", icon: LuGithub, tone: "primary" },
  { id: 2, title: "Top LeetCode Solver", name: "Aditi Sharma", stat: "612 problems solved", icon: LuCode, tone: "secondary" },
  { id: 3, title: "Longest Streak", name: "Grace Adeyemi", stat: "94-day streak", icon: LuFlame, tone: "warning" },
  { id: 4, title: "Challenge Winner", name: "Mateo Rossi", stat: "Won Weekly Challenge #18", icon: LuSwords, tone: "danger" },
  { id: 5, title: "Most Active User", name: "Priya Nair", stat: "38 hrs logged this week", icon: LuActivity, tone: "success" },
  { id: 6, title: "Most Consistent Learner", name: "Noah Kim", stat: "100% goal completion, 6 weeks", icon: LuBrainCircuit, tone: "primary" },
];
