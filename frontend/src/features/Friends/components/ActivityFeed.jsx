import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";

export default function ActivityFeed({ activity }) {
  return (
    <Card>
      <Card.Header title="Friend activity" subtitle="What your friends are up to" />
      <div className="fr-feed">
        {activity.map((a) => (
          <div className="fr-feed-item" key={a.id}>
            <Avatar name={a.name} size={34} />
            <div>
              <p><strong>{a.name}</strong> {a.action}</p>
              <span>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
