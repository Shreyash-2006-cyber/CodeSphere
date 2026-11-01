import { LuFlame, LuMessageCircle } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Avatar from "../../../shared/components/Avatar";
import Button from "../../../shared/components/Button";

export default function FriendCard({ friend }) {
  const safeFriend = friend || {};
  const pts = (safeFriend.score ?? safeFriend.points ?? 0).toLocaleString();
  const streak = safeFriend.streak ?? 0;

  return (
    <Card hoverable className="fr-card">
      <div className="fr-card-top">
        <Avatar name={safeFriend.name || "User"} size={44} status={safeFriend.status || "online"} />
        <div>
          <h4>{safeFriend.name || "User"}</h4>
          <span className="fr-points">{pts} pts</span>
        </div>
      </div>
      <div className="fr-card-meta">
        <span><LuFlame /> {streak}-day streak</span>
        {safeFriend.mutualGoals > 0 && <span>{safeFriend.mutualGoals} shared goals</span>}
      </div>
      <Button variant="outline" size="sm" icon={LuMessageCircle} fullWidth>
        Message
      </Button>
    </Card>
  );
}
