import { LuStar, LuGitFork } from "react-icons/lu";
import Table from "../../../shared/components/Table";
import Badge from "../../../shared/components/Badge";
import { formatDate } from "../../../shared/utils/formatDate";

export default function RepositoryTable({ repositories = [], loading }) {
  const columns = [
    { key: "name", label: "Repository", render: (r) => (
      <div>
        <strong>{r.name}</strong>
        <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginTop: 2, maxWidth: 340 }}>
          {r.description}
        </p>
      </div>
    ) },
    { key: "language", label: "Language", render: (r) => <Badge tone="primary">{r.language}</Badge> },
    { key: "stars", label: "Stars", render: (r) => <span><LuStar style={{ verticalAlign: -2 }} /> {r.stars}</span> },
    { key: "forks", label: "Forks", render: (r) => <span><LuGitFork style={{ verticalAlign: -2 }} /> {r.forks}</span> },
    { key: "updated", label: "Updated", render: (r) => formatDate(r.updated) },
  ];

  return <Table columns={columns} data={repositories || []} loading={loading} emptyLabel="No repositories found" />;
}
