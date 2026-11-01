import { useNeetCode } from "./hooks/useNeetCode";
import RoadmapList from "./components/RoadmapList";
import Card from "../../shared/components/Card";
import { DoughnutChart } from "../../shared/components/Charts";
import { SkeletonCard } from "../../shared/components/Loader";
import "./styles/NeetCode.css";

export default function NeetCode() {
  const { categories, totals, loading } = useNeetCode();
  const pct = Math.round((totals.completed / totals.total) * 100);

  if (loading) {
    return <div className="grid grid-2"><SkeletonCard /><SkeletonCard /></div>;
  }

  return (
    <div className="nc-page fade-in">
      <div className="page-heading">
        <h2>NeetCode Roadmap</h2>
        <p>Structured problem roadmap progress across every core topic.</p>
      </div>

      <div className="nc-grid">
        <RoadmapList categories={categories} />
        <Card>
          <Card.Header title="Overall completion" subtitle={`${totals.completed} of ${totals.total} problems`} />
          <div className="nc-donut-wrap">
            <DoughnutChart
              labels={["Completed", "Remaining"]}
              values={[totals.completed, totals.total - totals.completed]}
              colors={["#2563eb", "#e2e8f0"]}
              height={200}
            />
            <div className="nc-donut-center">
              <span className="nc-donut-pct">{pct}%</span>
              <span className="nc-donut-label">complete</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
