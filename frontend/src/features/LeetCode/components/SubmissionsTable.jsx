import Table from "../../../shared/components/Table";
import Badge from "../../../shared/components/Badge";
import { formatDate } from "../../../shared/utils/formatDate";

const DIFF_TONE = { Easy: "easy", Medium: "medium", Hard: "hard" };

export default function SubmissionsTable({ submissions, loading }) {
  const columns = [
    { key: "title", label: "Problem" },
    { key: "difficulty", label: "Difficulty", render: (r) => <Badge tone={DIFF_TONE[r.difficulty]}>{r.difficulty}</Badge> },
    { key: "status", label: "Status", render: (r) => (
      <Badge tone={r.status === "Accepted" ? "success" : "danger"}>{r.status}</Badge>
    ) },
    { key: "language", label: "Language" },
    { key: "date", label: "Date", render: (r) => formatDate(r.date) },
  ];

  return <Table columns={columns} data={submissions} loading={loading} emptyLabel="No submissions yet" />;
}
