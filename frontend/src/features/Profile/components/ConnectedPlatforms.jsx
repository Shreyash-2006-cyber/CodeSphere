import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";

export default function ConnectedPlatforms({ platforms }) {
  return (
    <Card>
      <Card.Header title="Connected platforms" subtitle="Linked accounts powering your trackers" />
      <div className="pf-platforms">
        {platforms.map((p) => (
          <div className="pf-platform-row" key={p.id}>
            <div>
              <strong>{p.name}</strong>
              {p.connected && <p>@{p.username}</p>}
            </div>
            {p.connected ? (
              <Badge tone="success">Connected</Badge>
            ) : (
              <Button variant="outline" size="sm">Connect</Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
