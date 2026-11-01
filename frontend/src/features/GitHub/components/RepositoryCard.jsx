import { LuStar, LuGitFork } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";

export default function RepositoryCard({ repo }) {
  return (
    <Card hoverable>
      <h4 style={{ fontSize: "0.95rem", marginBottom: 6 }}>{repo.name}</h4>
      <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginBottom: 14, minHeight: 36 }}>
        {repo.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Badge tone="primary">{repo.language}</Badge>
        <div style={{ display: "flex", gap: 12, fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
          <span><LuStar style={{ verticalAlign: -2 }} /> {repo.stars}</span>
          <span><LuGitFork style={{ verticalAlign: -2 }} /> {repo.forks}</span>
        </div>
      </div>
    </Card>
  );
}
