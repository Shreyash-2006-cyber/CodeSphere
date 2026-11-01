import Card from "../../../shared/components/Card";
import { DoughnutChart } from "../../../shared/components/Charts";

export default function LanguageChart({ languages = [] }) {
  const safeLangs = languages || [];
  return (
    <Card>
      <Card.Header title="Top languages" subtitle="Share of code by language" />
      <DoughnutChart
        labels={safeLangs.map((l) => l.name)}
        values={safeLangs.map((l) => l.value)}
        colors={safeLangs.map((l) => l.color)}
        height={220}
      />
    </Card>
  );
}
