import { Bar } from "react-chartjs-2";
import "./chartSetup";
import { baseOptions, CHART_PALETTE } from "./chartSetup";

export default function BarChart({ labels, datasets, height = 260, horizontal = false, stacked = false }) {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      borderRadius: 6,
      maxBarThickness: 34,
      backgroundColor: ds.color || CHART_PALETTE[i % CHART_PALETTE.length],
      ...ds,
    })),
  };

  return (
    <div style={{ height }}>
      <Bar
        data={data}
        options={{
          ...baseOptions,
          indexAxis: horizontal ? "y" : "x",
          scales: {
            x: { grid: { display: !horizontal ? false : true, color: "#eef2f7" }, stacked, ticks: { font: { size: 11 } } },
            y: { grid: { display: horizontal ? false : true, color: "#eef2f7" }, stacked, ticks: { font: { size: 11 } } },
          },
        }}
      />
    </div>
  );
}
