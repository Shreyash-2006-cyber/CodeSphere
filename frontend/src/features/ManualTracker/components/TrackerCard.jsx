import { LuFlame, LuPencil, LuTrash2 } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";
import ProgressBar from "../../../shared/components/ProgressBar";

export default function TrackerCard({ tracker, onEdit, onDelete }) {
  return (
    <Card hoverable className="tr-card">
      <div className="tr-card-top">
        <div>
          <h4>{tracker.name}</h4>
          <Badge tone="neutral">{tracker.category}</Badge>
        </div>
        <div className="tr-card-actions">
          <button onClick={() => onEdit(tracker)} aria-label="Edit tracker"><LuPencil /></button>
          <button onClick={() => onDelete(tracker.id)} aria-label="Delete tracker"><LuTrash2 /></button>
        </div>
      </div>

      <p className="tr-card-notes">{tracker.notes}</p>

      <ProgressBar value={tracker.progress} max={100} showValue tone="primary" />

      <div className="tr-card-footer">
        <span className="tr-card-goal">Goal: {tracker.goal}</span>
        <span className="tr-card-streak"><LuFlame /> {tracker.streak} day streak</span>
      </div>
    </Card>
  );
}
