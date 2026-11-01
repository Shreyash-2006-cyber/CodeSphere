import Card from "../../../shared/components/Card";
import { formatDate } from "../../../shared/utils/formatDate";

export default function ActivityTimeline({ items }) {
  return (
    <Card>
      <Card.Header title="Activity timeline" subtitle="Your recent milestones" />
      <div className="pf-timeline">
        {items.map((item) => (
          <div className="pf-timeline-item" key={item.id}>
            <span className="pf-timeline-dot" />
            <div>
              <p>{item.label}</p>
              <span>{formatDate(item.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
