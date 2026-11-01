import Card from "../../../shared/components/Card";

export default function RecentActivityCard({ items }) {
  return (
    <Card>
      <Card.Header title="Recent activity" subtitle="Your latest actions" />
      <div className="db-activity-list">
        {items.map((a) => (
          <div className="db-activity-row" key={a.id}>
            <span className="db-activity-dot" />
            <p>{a.text}</p>
            <span className="db-activity-time">{a.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
