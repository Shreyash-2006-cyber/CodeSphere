import Card from "../../../shared/components/Card";
import { formatCompactNumber } from "../../../shared/utils/formatNumber";

export default function StatsCard({ stats = [] }) {
  const safeStats = stats || [];
  return (
    <div className="gh-stats-grid">
      {safeStats.map((s) => (
        <Card key={s.label} className="gh-stat">
          <span className="gh-stat-value">{formatCompactNumber(s.value)}</span>
          <span className="gh-stat-label">{s.label}</span>
        </Card>
      ))}
    </div>
  );
}
