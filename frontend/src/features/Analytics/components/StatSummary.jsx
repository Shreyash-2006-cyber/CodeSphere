import Card from "../../../shared/components/Card";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

export default function StatSummary({ items }) {
  return (
    <div className="an-summary-grid">
      {items.map((item) => (
        <Card key={item.label} className="an-summary-card">
          <span className="an-summary-label">{item.label}</span>
          <span className="an-summary-value">{item.value}</span>
          <span className={`an-summary-delta ${item.trend === "up" ? "up" : "down"}`}>
            {item.trend === "up" ? <LuTrendingUp /> : <LuTrendingDown />} {item.delta}
          </span>
        </Card>
      ))}
    </div>
  );
}
