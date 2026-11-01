import { LuUsers, LuClock } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";

const DIFF_TONE = { Easy: "easy", Medium: "medium", Hard: "hard" };

export default function ChallengeCard({ challenge, onToggleJoin }) {
  return (
    <Card hoverable className="ch-card">
      <div className="ch-card-top">
        <Badge tone="neutral">{challenge.type}</Badge>
        <Badge tone={DIFF_TONE[challenge.difficulty]}>{challenge.difficulty}</Badge>
      </div>
      <h4>{challenge.title}</h4>
      <div className="ch-card-meta">
        <span><LuUsers /> {challenge.participants.toLocaleString()} joined</span>
        <span><LuClock /> ends in {challenge.endsIn}</span>
      </div>
      {challenge.completed ? (
        <Button size="sm" variant="outline" fullWidth disabled>Completed</Button>
      ) : (
        <Button
          size="sm"
          variant={challenge.joined ? "outline" : "primary"}
          fullWidth
          onClick={() => onToggleJoin(challenge.id)}
        >
          {challenge.joined ? "Leave challenge" : "Join challenge"}
        </Button>
      )}
    </Card>
  );
}
