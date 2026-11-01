import { cx } from "../../utils/classNames";
import "./Avatar.css";

const COLORS = ["#2563eb", "#4f46e5", "#0ea5e9", "#16a34a", "#f59e0b", "#ef4444"];

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function colorFor(name = "") {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COLORS[sum % COLORS.length];
}

export default function Avatar({ name, src, size = 36, status, className }) {
  return (
    <span className={cx("avatar", className)} style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span
          className="avatar-fallback"
          style={{ background: colorFor(name), fontSize: size * 0.4 }}
        >
          {initials(name)}
        </span>
      )}
      {status && <span className={`avatar-status status-${status}`} />}
    </span>
  );
}
