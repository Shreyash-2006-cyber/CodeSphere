import Card from "../../../shared/components/Card";
import { BarChart } from "../../../shared/components/Charts";

export default function CompareChart({ data, friendName }) {
  return (
    <Card>
      <Card.Header title="Compare progress" subtitle={`You vs ${friendName}`} />
      <BarChart
        labels={data.labels}
        datasets={[
          { label: "You", data: data.you, color: "#2563eb" },
          { label: friendName, data: data.friend, color: "#94a3b8" },
        ]}
        height={240}
      />
    </Card>
  );
}
