import { cx } from "../../utils/classNames";
import "./Badge.css";

// tone: neutral | primary | success | warning | danger | easy | medium | hard
export default function Badge({ children, tone = "neutral", className }) {
  return <span className={cx("badge", `badge-${tone}`, className)}>{children}</span>;
}
