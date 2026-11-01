import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// Shared palette so every chart in the app reads as one family.
export const CHART_COLORS = {
  primary: "#2563eb",
  secondary: "#4f46e5",
  sky: "#0ea5e9",
  green: "#16a34a",
  amber: "#f59e0b",
  red: "#ef4444",
  slate: "#94a3b8",
};

export const CHART_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.sky,
  CHART_COLORS.green,
  CHART_COLORS.amber,
  CHART_COLORS.red,
];

export const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: { usePointStyle: true, boxWidth: 8, font: { family: "Inter", size: 11 } },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleFont: { family: "Inter", size: 12 },
      bodyFont: { family: "Inter", size: 12 },
      padding: 10,
      cornerRadius: 8,
    },
  },
};
