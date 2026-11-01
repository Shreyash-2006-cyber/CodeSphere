import { Doughnut } from "react-chartjs-2";
import "./chartSetup";
import { baseOptions, CHART_PALETTE } from "./chartSetup";

export default function DoughnutChart({ labels, values, colors, height = 240, cutout = "68%" }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || CHART_PALETTE,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div style={{ height }}>
      <Doughnut data={data} options={{ ...baseOptions, cutout }} />
    </div>
  );
}
