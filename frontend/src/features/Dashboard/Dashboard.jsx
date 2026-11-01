import WelcomeBanner from "./components/WelcomeBanner";
import StatCards from "./components/StatCards";
import PlatformSummaryCards from "./components/PlatformSummaryCards";
import QuickActions from "./components/QuickActions";
import GoalsSummaryCard from "./components/GoalsSummaryCard";
import RecentActivityCard from "./components/RecentActivityCard";
import FriendActivityCard from "./components/FriendActivityCard";
import LeaderboardPreviewCard from "./components/LeaderboardPreviewCard";
import Card from "../../shared/components/Card";
import { BarChart } from "../../shared/components/Charts";
import { SkeletonCard } from "../../shared/components/Loader";
import { useDashboard } from "./hooks/useDashboard";
import {
  recentActivity,
  quickActions,
  goalsSummary,
  friendActivitySummary,
  leaderboardPreview,
} from "./data/dashboardMockData";
import "./styles/Dashboard.css";

export default function Dashboard() {
  const { platformSummaries, welcomeStats, weeklyOverview, loading, userName } = useDashboard();

  return (
    <div className="db-page fade-in">
      <WelcomeBanner name={userName} />
      {loading ? (
        <div className="db-stats-grid">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      ) : (
        <StatCards stats={welcomeStats} />
      )}
      <QuickActions actions={quickActions} />

      <div className="page-section">
        <h3>Your trackers</h3>
        {loading ? (
          <div className="db-platform-grid">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : (
          <PlatformSummaryCards items={platformSummaries} />
        )}
      </div>

      <div className="db-grid-mid page-section">
        <Card>
          <Card.Header title="Weekly overview" subtitle="GitHub commits vs LeetCode submissions" />
          <BarChart
            labels={weeklyOverview.labels}
            datasets={[
              { label: "GitHub", data: weeklyOverview.github, color: "#2563eb" },
              { label: "LeetCode", data: weeklyOverview.leetcode, color: "#f59e0b" },
            ]}
            height={260}
          />
        </Card>
        <GoalsSummaryCard goals={goalsSummary} />
      </div>

      <div className="db-grid-bottom page-section">
        <RecentActivityCard items={recentActivity} />
        <FriendActivityCard items={friendActivitySummary} />
        <LeaderboardPreviewCard items={leaderboardPreview} />
      </div>
    </div>
  );
}
