import { LuCrown } from "react-icons/lu";
import Avatar from "../../../shared/components/Avatar";

export default function TopThree({ users = [] }) {
  const safeUsers = Array.isArray(users) ? users : [];
  const [first, second, third] = safeUsers;
  return (
    <div className="lb-podium">
      {second && (
        <div className="lb-podium-item lb-podium-second">
          <Avatar name={second.name || "User"} size={56} />
          <strong>{second.name || "User"}</strong>
          <span>{(second.score ?? second.points ?? 0).toLocaleString()} pts</span>
          <div className="lb-podium-bar">2</div>
        </div>
      )}
      {first && (
        <div className="lb-podium-item lb-podium-first">
          <LuCrown className="lb-crown" />
          <Avatar name={first.name || "User"} size={68} />
          <strong>{first.name || "User"}</strong>
          <span>{(first.score ?? first.points ?? 0).toLocaleString()} pts</span>
          <div className="lb-podium-bar">1</div>
        </div>
      )}
      {third && (
        <div className="lb-podium-item lb-podium-third">
          <Avatar name={third.name || "User"} size={52} />
          <strong>{third.name || "User"}</strong>
          <span>{(third.score ?? third.points ?? 0).toLocaleString()} pts</span>
          <div className="lb-podium-bar">3</div>
        </div>
      )}
    </div>
  );
}
