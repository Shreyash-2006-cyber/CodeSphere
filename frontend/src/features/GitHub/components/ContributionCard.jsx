import Card from "../../../shared/components/Card";
import { BarChart } from "../../../shared/components/Charts";

function heatColor(v) {
  if (v === 0) return "var(--color-bg-muted)";
  if (v <= 2) return "#bfdbfe";
  if (v <= 4) return "#60a5fa";
  if (v <= 6) return "#2563eb";
  return "#1e3a8a";
}

export function ContributionHeatmap({ contributions = [] }) {
  const safeContribs = contributions || [];
  const weeks = [];
  for (let i = 0; i < safeContribs.length; i += 7) {
    weeks.push(safeContribs.slice(i, i + 7));
  }
  return (
    <div className="gh-heatmap">
      {weeks.map((week, wi) => (
        <div className="gh-heatmap-col" key={wi}>
          {week.map((v, di) => (
            <span key={di} className="gh-heatmap-cell" style={{ background: heatColor(v) }} title={`${v} contributions`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ContributionCard({ contributions = [], weeklyCommits = { labels: [], data: [] } }) {
  const safeWeekly = weeklyCommits || { labels: [], data: [] };
  return (
    <Card>
      <Card.Header title="Contribution activity" subtitle="Last 18 weeks" />
      <ContributionHeatmap contributions={contributions} />
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginBottom: 10 }}>
          Commits by weekday
        </p>
        <BarChart
          labels={safeWeekly.labels || []}
          datasets={[{ label: "Commits", data: safeWeekly.data || [], color: "#2563eb" }]}
          height={180}
        />
      </div>
    </Card>
  );
}
