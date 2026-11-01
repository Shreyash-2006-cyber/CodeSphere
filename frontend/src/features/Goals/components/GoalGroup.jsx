import { LuPlus } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import ProgressBar from "../../../shared/components/ProgressBar";

export default function GoalGroup({ title, items, onIncrement, completionRate }) {
  return (
    <Card>
      <Card.Header title={title} subtitle={`${completionRate}% complete`} />
      <div className="gl-list">
        {items.map((g) => {
          const done = g.progress >= g.target;
          return (
            <div className="gl-item" key={g.id}>
              <div className="gl-item-top">
                <span className={done ? "gl-item-done" : ""}>{g.label}</span>
                <button className="gl-increment" disabled={done} onClick={() => onIncrement(g.id)} aria-label="Log progress">
                  <LuPlus />
                </button>
              </div>
              <ProgressBar value={g.progress} max={g.target} tone={done ? "success" : "primary"} />
              <span className="gl-item-count">{g.progress}/{g.target}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
