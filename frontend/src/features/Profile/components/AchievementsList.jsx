import { LuAward } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";

export default function AchievementsList({ achievements }) {
  return (
    <Card>
      <Card.Header title="Achievements" subtitle="Milestones you've unlocked" />
      <div className="pf-achievements">
        {achievements.map((a) => (
          <div className={`pf-achievement ${a.earned ? "" : "locked"}`} key={a.id}>
            <div className="pf-achievement-icon"><LuAward /></div>
            <div className="pf-achievement-info">
              <strong>{a.title}</strong>
              <p>{a.description}</p>
            </div>
            {a.earned && <Badge tone="success">Earned</Badge>}
          </div>
        ))}
      </div>
    </Card>
  );
}
