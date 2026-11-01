import { cx } from "../../utils/classNames";
import "./Button.css";

/**
 * Generic button. variant: primary | secondary | outline | ghost | danger
 * size: sm | md | lg
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  as: Component = "button",
  className,
  ...rest
}) {
  return (
    <Component
      className={cx(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && "btn-full",
        className
      )}
      {...rest}
    >
      {Icon && iconPosition === "left" && <Icon className="btn-icon" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="btn-icon" />}
    </Component>
  );
}
