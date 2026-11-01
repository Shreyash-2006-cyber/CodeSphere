import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";

export default function LeaderboardPreviewSection({ items }) {
  return (
    <section className="hm-section" id="leaderboard">
      <div className="container">
        <div className="hm-section-head">
          <h2>Climb the leaderboard</h2>
          <p>See how you stack up globally and against friends.</p>
        </div>
        <div className="hm-leaderboard-preview">
          {items.map((u) => (
            <div className="hm-leaderboard-row" key={u.rank}>
              <Badge tone={u.rank === 1 ? "primary" : "neutral"}>{u.rank}</Badge>
              <Avatar name={u.name} size={36} />
              <span className="hm-leaderboard-name">{u.name}</span>
              <span className="hm-leaderboard-points">{u.points.toLocaleString()} pts</span>
            </div>
          ))}
          <div className="hm-leaderboard-cta">
            <Button as={Link} to={ROUTES.REGISTER} variant="outline">See full leaderboard</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
