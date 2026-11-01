import { cx } from "../../utils/classNames";
import "./ProgressBar.css";

export default function ProgressBar({ value = 0, max = 100, tone = "primary", label, showValue = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-wrap">
      {(label || showValue) && (
        <div className="progress-labels">
          {label && <span>{label}</span>}
          {showValue && <span>{pct}%</span>}
        </div>
      )}
      <div className="progress-track">
        <div
          className={cx("progress-fill", `progress-${tone}`)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
