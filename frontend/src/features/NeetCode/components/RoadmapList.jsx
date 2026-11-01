import Card from "../../../shared/components/Card";
import ProgressBar from "../../../shared/components/ProgressBar";

export default function RoadmapList({ categories }) {
  return (
    <Card>
      <Card.Header title="Roadmap categories" subtitle="Completion by topic" />
      <div className="nc-roadmap-list">
        {categories.map((c) => (
          <div key={c.name} className="nc-roadmap-row">
            <div className="nc-roadmap-row-top">
              <span>{c.name}</span>
              <span className="nc-roadmap-count">{c.completed}/{c.total}</span>
            </div>
            <ProgressBar value={c.completed} max={c.total} tone={c.completed === c.total ? "success" : "primary"} />
          </div>
        ))}
      </div>
    </Card>
  );
}
