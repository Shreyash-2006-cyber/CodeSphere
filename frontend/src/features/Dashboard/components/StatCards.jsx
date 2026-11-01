import Card from "../../../shared/components/Card";

export default function StatCards({ stats }) {
  return (
    <div className="db-stats-grid">
      {stats.map((s) => (
        <Card key={s.label} className="db-stat">
          <span className="db-stat-value">{s.value}</span>
          <span className="db-stat-label">{s.label}</span>
        </Card>
      ))}
    </div>
  );
}
