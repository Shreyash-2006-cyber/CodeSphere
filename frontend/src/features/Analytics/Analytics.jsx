import { useState } from "react";
import StatSummary from "./components/StatSummary";
import {
  weeklyActivity,
  monthlyActivity,
  languageBreakdown,
  difficultyBreakdown,
  overallActivity,
} from "./data/analyticsMockData";
import Card from "../../shared/components/Card";
import Dropdown from "../../shared/components/Dropdown";
import { BarChart, LineChart, DoughnutChart } from "../../shared/components/Charts";
import "./styles/Analytics.css";

const SUMMARY = [
  { label: "Hours logged this week", value: "17.2h", trend: "up", delta: "+12% vs last week" },
  { label: "Problems solved this month", value: "83", trend: "up", delta: "+9 vs last month" },
  { label: "Current streak", value: "21 days", trend: "up", delta: "personal best" },
  { label: "Avg. daily focus time", value: "2.4h", trend: "down", delta: "-8% vs last week" },
];

export default function Analytics() {
  const [range, setRange] = useState("weekly");
  const activity = range === "weekly" ? weeklyActivity : monthlyActivity;

  return (
    <div className="an-page fade-in">
      <div className="page-heading an-heading">
        <div>
          <h2>Analytics</h2>
          <p>A closer look at your activity across every platform.</p>
        </div>
        <Dropdown
          label="Range"
          value={range}
          onChange={setRange}
          options={[{ value: "weekly", label: "Weekly" }, { value: "monthly", label: "Monthly" }]}
        />
      </div>

      <StatSummary items={SUMMARY} />

      <div className="an-grid-mid">
        <Card>
          <Card.Header title={range === "weekly" ? "Weekly activity" : "Monthly activity"} subtitle="Hours spent studying / coding" />
          <BarChart
            labels={activity.labels}
            datasets={[{ label: "Hours", data: activity.hours, color: "#2563eb" }]}
            height={260}
          />
        </Card>
        <Card>
          <Card.Header title="Language breakdown" subtitle="Across GitHub & LeetCode" />
          <DoughnutChart
            labels={languageBreakdown.map((l) => l.name)}
            values={languageBreakdown.map((l) => l.value)}
            colors={languageBreakdown.map((l) => l.color)}
            height={240}
          />
        </Card>
      </div>

      <div className="an-grid-mid">
        <Card>
          <Card.Header title="Difficulty distribution" subtitle="Overall problems solved" />
          <DoughnutChart
            labels={difficultyBreakdown.map((d) => d.name)}
            values={difficultyBreakdown.map((d) => d.value)}
            colors={difficultyBreakdown.map((d) => d.color)}
            height={240}
          />
        </Card>
        <Card>
          <Card.Header title="Overall activity" subtitle="GitHub vs LeetCode vs Study time" />
          <LineChart
            labels={overallActivity.labels}
            datasets={[
              { label: "GitHub", data: overallActivity.github, color: "#2563eb" },
              { label: "LeetCode", data: overallActivity.leetcode, color: "#f59e0b" },
              { label: "Study", data: overallActivity.study, color: "#16a34a" },
            ]}
            height={260}
          />
        </Card>
      </div>
    </div>
  );
}
