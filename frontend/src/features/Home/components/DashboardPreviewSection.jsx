import { BarChart } from "../../../shared/components/Charts";

export default function DashboardPreviewSection() {
  return (
    <section className="hm-section" id="dashboard-preview">
      <div className="container">
        <div className="hm-section-head">
          <h2>A dashboard that shows what matters</h2>
          <p>Weekly activity, goals, and progress — at a glance.</p>
        </div>
        <div className="hm-preview-card">
          <div className="hm-preview-top">
            <span>Weekly overview</span>
            <span className="hm-preview-tag">Live preview</span>
          </div>
          <BarChart
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            datasets={[
              { label: "GitHub", data: [3, 5, 2, 6, 4, 1, 0], color: "#2563eb" },
              { label: "LeetCode", data: [2, 3, 1, 4, 2, 1, 1], color: "#f59e0b" },
            ]}
            height={240}
          />
        </div>
      </div>
    </section>
  );
}
