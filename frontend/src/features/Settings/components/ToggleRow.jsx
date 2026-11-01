import "./ToggleRow.css";

export default function ToggleRow({ label, description, enabled, onToggle }) {
  return (
    <div className="tg-row">
      <div>
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
      <button
        className={`tg-switch ${enabled ? "on" : ""}`}
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
      >
        <span className="tg-knob" />
      </button>
    </div>
  );
}
