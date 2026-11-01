import { useLeetCode } from "./hooks/useLeetCode";
import StatsCard from "./components/StatsCard";
import DifficultyChart from "./components/DifficultyChart";
import Heatmap from "./components/Heatmap";
import SubmissionsTable from "./components/SubmissionsTable";
import Card from "../../shared/components/Card";
import { LineChart } from "../../shared/components/Charts";
import { SkeletonCard } from "../../shared/components/Loader";
import "./styles/LeetCode.css";

export default function LeetCode() {
  const { profile, difficulty, trend, heatmap, submissions, loading } = useLeetCode();

  if (loading || !profile) {
    return (
      <div className="lc-page">
        <div className="grid grid-3"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
      </div>
    );
  }

  return (
    <div className="lc-page fade-in">
      <div className="page-heading">
        <h2>LeetCode</h2>
        <p>Problem-solving progress, streaks, and recent submissions.</p>
      </div>

      <StatsCard profile={profile} />

      <div className="lc-grid-mid">
        <DifficultyChart difficulty={difficulty} />
        <Card>
          <Card.Header title={trend.title || "Submission trend"} subtitle={trend.subtitle || "Problems solved per month"} />
          <LineChart
            labels={trend.labels}
            datasets={[{ label: trend.label || "Solved", data: trend.data, color: trend.color || "#2563eb" }]}
            height={220}
          />
        </Card>
      </div>

      <div className="page-section">
        <Card>
          <Card.Header title="Submission heatmap" subtitle="Last 14 weeks" />
          <Heatmap values={heatmap} />
        </Card>
      </div>

      <div className="page-section">
        <h3>Recent submissions</h3>
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
}
