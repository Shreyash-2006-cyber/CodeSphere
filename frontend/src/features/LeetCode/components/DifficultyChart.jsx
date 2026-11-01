import Card from "../../../shared/components/Card";
import ProgressBar from "../../../shared/components/ProgressBar";

const TONE = { Easy: "success", Medium: "warning", Hard: "danger" };

export default function DifficultyChart({ difficulty }) {
  return (
    <Card>
      <Card.Header title="Difficulty distribution" subtitle="Problems solved by difficulty" />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {difficulty.map((d) => (
          <div key={d.name}>
            <ProgressBar
              tone={TONE[d.name]}
              value={d.solved}
              max={d.total}
              label={d.name}
              showValue={false}
            />
            <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginTop: 5 }}>
              {d.solved} / {d.total} solved
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
