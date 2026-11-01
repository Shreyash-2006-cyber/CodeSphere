import { cx } from "../../utils/classNames";
import "./Card.css";

export default function Card({ children, className, padded = true, hoverable = false, ...rest }) {
  return (
    <div
      className={cx("card", padded && "card-padded", hoverable && "card-hoverable", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ title, subtitle, action }) {
  return (
    <div className="card-header">
      <div>
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
};
