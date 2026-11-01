import Table from "../../../shared/components/Table";
import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";
import { LuFlame } from "react-icons/lu";

export default function LeaderboardTable({ users = [] }) {
  const columns = [
    { key: "rank", label: "#", render: (u) => <Badge tone={u.rank <= 3 ? "primary" : "neutral"}>{u.rank}</Badge> },
    { key: "name", label: "User", render: (u) => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={u.name || "User"} size={30} />
        <span>{u.name || "User"}</span>
      </div>
    ) },
    { key: "points", label: "Points", render: (u) => (u.score ?? u.points ?? 0).toLocaleString() },
    { key: "streak", label: "Streak", render: (u) => <span><LuFlame style={{ verticalAlign: -2, color: "var(--color-warning)" }} /> {u.streak || 0}d</span> },
  ];

  return <Table columns={columns} data={users} />;
}
