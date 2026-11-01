import { Link } from "react-router-dom";
import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import { ROUTES } from "../../../shared/constants/routes";

export default function LeaderboardPreviewCard({ items }) {
  return (
    <Card>
      <Card.Header
        title="Leaderboard"
        subtitle="Top performers this week"
        action={<Link to={ROUTES.LEADERBOARD} style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>View all</Link>}
      />
      <div className="db-leaderboard-list">
        {items.map((u) => (
          <div className="db-leaderboard-row" key={u.rank}>
            <Badge tone={u.rank <= 3 ? "primary" : "neutral"}>{u.rank}</Badge>
            <Avatar name={u.name} size={28} />
            <span className="db-leaderboard-name">{u.name}</span>
            <span className="db-leaderboard-points">{u.points.toLocaleString()} pts</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
