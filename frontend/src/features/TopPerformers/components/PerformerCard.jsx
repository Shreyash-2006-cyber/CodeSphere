import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";

export default function PerformerCard({ performer }) {
  const Icon = performer.icon;
  return (
    <Card hoverable className="tp-card">
      <div className="tp-icon-wrap" data-tone={performer.tone}>
        <Icon />
      </div>
      <Badge tone={performer.tone}>{performer.title}</Badge>
      <div className="tp-user">
        <Avatar name={performer.name} size={40} />
        <div>
          <strong>{performer.name}</strong>
          <p>{performer.stat}</p>
        </div>
      </div>
    </Card>
  );
}
