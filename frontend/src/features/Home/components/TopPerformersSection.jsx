import Avatar from "../../../shared/components/Avatar";
import Badge from "../../../shared/components/Badge";

export default function TopPerformersSection({ items }) {
  return (
    <section className="hm-section" id="top-performers">
      <div className="container">
        <div className="hm-section-head">
          <h2>Top performers this month</h2>
          <p>Recognizing the most consistent members of the community.</p>
        </div>
        <div className="hm-performers-grid">
          {items.map((p) => (
            <div className="hm-performer-card" key={p.id}>
              <Avatar name={p.name} size={52} />
              <Badge tone="primary">{p.tag}</Badge>
              <strong>{p.name}</strong>
              <span>{p.stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
