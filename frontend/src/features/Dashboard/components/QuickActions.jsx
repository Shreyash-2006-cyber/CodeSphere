import { Link } from "react-router-dom";
import { LuNotebookPen, LuChartLine, LuSwords, LuStickyNote, LuArrowRight } from "react-icons/lu";

const ICONS = {
  "/tracker": LuNotebookPen,
  "/analytics": LuChartLine,
  "/challenges": LuSwords,
  "/notes": LuStickyNote,
};

export default function QuickActions({ actions }) {
  return (
    <div className="db-quick-actions">
      {actions.map((a) => {
        const Icon = ICONS[a.path] || LuArrowRight;
        return (
          <Link to={a.path} key={a.id} className="db-quick-action">
            <Icon />
            <span>{a.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
