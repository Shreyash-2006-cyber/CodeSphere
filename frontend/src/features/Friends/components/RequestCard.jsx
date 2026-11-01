import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Button from "../../../shared/components/Button";

export default function RequestCard({ request, onAccept, onDecline }) {
  return (
    <Card className="fr-request-card">
      <Avatar name={request.name} size={40} />
      <div className="fr-request-info">
        <strong>{request.name}</strong>
        <span>{request.mutualFriends} mutual friends</span>
      </div>
      <div className="fr-request-actions">
        <Button size="sm" onClick={() => onAccept(request.id)}>Accept</Button>
        <Button size="sm" variant="ghost" onClick={() => onDecline(request.id)}>Decline</Button>
      </div>
    </Card>
  );
}
