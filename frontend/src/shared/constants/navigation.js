import {
  LuLayoutDashboard,
  LuGithub,
  LuCode,
  LuListChecks,
  LuNotebookPen,
  LuUsers,
  LuTrophy,
  LuMedal,
  LuSwords,
  LuTarget,
  LuStickyNote,
  LuChartLine,
  LuCircleUserRound,
  LuSettings,
} from "react-icons/lu";
import { ROUTES } from "./routes";

// Sidebar navigation, grouped so the Sidebar component can render
// section headings without hardcoding content.
export const SIDEBAR_SECTIONS = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", path: ROUTES.DASHBOARD, icon: LuLayoutDashboard }],
  },
  {
    label: "Trackers",
    items: [
      { label: "GitHub", path: ROUTES.GITHUB, icon: LuGithub },
      { label: "LeetCode", path: ROUTES.LEETCODE, icon: LuCode },
      { label: "NeetCode", path: ROUTES.NEETCODE, icon: LuListChecks },
      { label: "Manual Tracker", path: ROUTES.MANUAL_TRACKER, icon: LuNotebookPen },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Friends", path: ROUTES.FRIENDS, icon: LuUsers },
      { label: "Leaderboard", path: ROUTES.LEADERBOARD, icon: LuTrophy },
      { label: "Top Performers", path: ROUTES.TOP_PERFORMERS, icon: LuMedal },
      { label: "Challenges", path: ROUTES.CHALLENGES, icon: LuSwords },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Goals", path: ROUTES.GOALS, icon: LuTarget },
      { label: "Notes", path: ROUTES.NOTES, icon: LuStickyNote },
      { label: "Analytics", path: ROUTES.ANALYTICS, icon: LuChartLine },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", path: ROUTES.PROFILE, icon: LuCircleUserRound },
      { label: "Settings", path: ROUTES.SETTINGS, icon: LuSettings },
    ],
  },
];
