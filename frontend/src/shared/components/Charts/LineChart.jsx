import { Line } from "react-chartjs-2";
import "./chartSetup";
import { baseOptions, CHART_COLORS } from "./chartSetup";

export default function LineChart({ labels, datasets, height = 260 }) {
  const data = {
    labels,
    datasets: datasets.map((ds, i) => ({
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      fill: true,
      backgroundColor: (ctx) => {
        const { chart } = ctx;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return "transparent";
        const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        const color = ds.color || CHART_COLORS.primary;
        gradient.addColorStop(0, `${color}33`);
        gradient.addColorStop(1, `${color}00`);
        return gradient;
      },
      borderColor: ds.color || CHART_COLORS.primary,
      ...ds,
    })),
  };

  return (
    <div style={{ height }}>
      <Line
        data={data}
        options={{
          ...baseOptions,
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: "#eef2f7" }, ticks: { font: { size: 11 } } },
          },
        }}
      />
    </div>
  );
}
