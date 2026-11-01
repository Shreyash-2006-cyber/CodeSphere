import Card from "../../../shared/components/Card";
import { formatCompactNumber } from "../../../shared/utils/formatNumber";

export default function StatsCard({ profile }) {
  const items = [
    { label: "Problems solved", value: profile.totalSolved },
    { label: "Contest rating", value: profile.contestRating },
    { label: "Global ranking", value: profile.ranking },
  ];
  return (
    <div className="lc-stats-grid">
      {items.map((s) => (
        <Card key={s.label} className="lc-stat">
          <span className="lc-stat-value">{formatCompactNumber(s.value)}</span>
          <span className="lc-stat-label">{s.label}</span>
        </Card>
      ))}
    </div>
  );
}
