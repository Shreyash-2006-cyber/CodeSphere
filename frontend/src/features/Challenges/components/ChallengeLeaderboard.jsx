import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";

export default function ChallengeLeaderboard({ leaderboard }) {
  return (
    <Card>
      <Card.Header title="Challenge leaderboard" subtitle="Top scorers this cycle" />
      <div className="ch-leaderboard">
        {leaderboard.map((u, i) => (
          <div className="ch-leaderboard-row" key={u.id}>
            <Badge tone={i < 3 ? "primary" : "neutral"}>{i + 1}</Badge>
            <Avatar name={u.name} size={30} />
            <span className="ch-leaderboard-name">{u.name}</span>
            <span className="ch-leaderboard-score">{u.score} pts</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
