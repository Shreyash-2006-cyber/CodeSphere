import { Link } from "react-router-dom";
import Card from "../../../shared/components/Card";
import { ROUTES } from "../../../shared/constants/routes";

const ROUTE_MAP = {
  github: ROUTES.GITHUB,
  leetcode: ROUTES.LEETCODE,
  neetcode: ROUTES.NEETCODE,
  tracker: ROUTES.MANUAL_TRACKER,
};

export default function PlatformSummaryCards({ items }) {
  return (
    <div className="db-platform-grid">
      {items.map((p) => (
        <Link to={ROUTE_MAP[p.id]} key={p.id} style={{ textDecoration: "none" }}>
          <Card hoverable className="db-platform-card">
            <span className="db-platform-accent" style={{ background: p.accent }} />
            <strong>{p.label}</strong>
            <span className="db-platform-value">{p.value}</span>
            <span className="db-platform-secondary">{p.secondary}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
