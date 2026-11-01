import { LuPencil, LuTrash2 } from "react-icons/lu";
import Card from "../../../shared/components/Card";
import Badge from "../../../shared/components/Badge";
import { formatDate } from "../../../shared/utils/formatDate";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <Card hoverable className="nt-card">
      <div className="nt-card-top">
        <Badge tone="primary">{note.category}</Badge>
        <div className="nt-card-actions">
          <button onClick={() => onEdit(note)} aria-label="Edit note"><LuPencil /></button>
          <button onClick={() => onDelete(note.id)} aria-label="Delete note"><LuTrash2 /></button>
        </div>
      </div>
      <h4>{note.title}</h4>
      <p className="nt-card-content">{note.content}</p>
      <div className="nt-card-tags">
        {note.tags.map((t) => (
          <span key={t} className="nt-tag">#{t}</span>
        ))}
      </div>
      <span className="nt-card-date">Updated {formatDate(note.updated)}</span>
    </Card>
  );
}
