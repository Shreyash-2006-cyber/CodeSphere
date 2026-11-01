import { useGoals } from "./hooks/useGoals";
import GoalGroup from "./components/GoalGroup";
import { goalsCompletionTrend } from "./data/goalsMockData";
import Card from "../../shared/components/Card";
import { LineChart } from "../../shared/components/Charts";
import "./styles/Goals.css";

export default function Goals() {
  const { goals, increment, completionRate } = useGoals();

  return (
    <div className="gl-page fade-in">
      <div className="page-heading">
        <h2>Goals</h2>
        <p>Daily, weekly, and monthly goals to keep your progress on track.</p>
      </div>

      <div className="gl-grid">
        <GoalGroup
          title="Daily goals"
          items={goals.daily}
          onIncrement={(id) => increment("daily", id)}
          completionRate={completionRate("daily")}
        />
        <GoalGroup
          title="Weekly goals"
          items={goals.weekly}
          onIncrement={(id) => increment("weekly", id)}
          completionRate={completionRate("weekly")}
        />
        <GoalGroup
          title="Monthly goals"
          items={goals.monthly}
          onIncrement={(id) => increment("monthly", id)}
          completionRate={completionRate("monthly")}
        />
      </div>

      <div className="page-section">
        <Card>
          <Card.Header title="Completion rate" subtitle="Weekly goal completion over the last month" />
          <LineChart
            labels={goalsCompletionTrend.labels}
            datasets={[{ label: "Completion %", data: goalsCompletionTrend.data, color: "#4f46e5" }]}
            height={220}
          />
        </Card>
      </div>
    </div>
  );
}
