import { Link } from "react-router-dom";
import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import { ROUTES } from "../../../shared/constants/routes";

export default function FriendActivityCard({ items }) {
  return (
    <Card>
      <Card.Header
        title="Friend activity"
        subtitle="What your friends are up to"
        action={<Link to={ROUTES.FRIENDS} style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>View all</Link>}
      />
      <div className="db-friend-list">
        {items.map((a) => (
          <div className="db-friend-row" key={a.id}>
            <Avatar name={a.name} size={32} />
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
