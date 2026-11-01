import "./EmptyState.css";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state fade-in">
      {Icon && (
        <div className="empty-icon">
          <Icon />
        </div>
      )}
      <h4>{title}</h4>
      {description && <p>{description}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}
