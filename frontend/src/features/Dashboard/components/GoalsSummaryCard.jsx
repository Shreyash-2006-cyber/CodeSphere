import { Link } from "react-router-dom";
import Card from "../../../shared/components/Card";
import ProgressBar from "../../../shared/components/ProgressBar";
import { ROUTES } from "../../../shared/constants/routes";

export default function GoalsSummaryCard({ goals }) {
  return (
    <Card>
      <Card.Header
        title="Today's goals"
        subtitle="Quick view of your daily targets"
        action={<Link to={ROUTES.GOALS} style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>View all</Link>}
      />
      <div className="db-goals-list">
        {goals.map((g) => (
          <div key={g.id} className="db-goal-row">
            <span>{g.label}</span>
            <ProgressBar value={g.progress} max={g.target} tone={g.progress >= g.target ? "success" : "primary"} />
          </div>
        ))}
      </div>
    </Card>
  );
}
