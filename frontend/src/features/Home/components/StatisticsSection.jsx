export default function StatisticsSection({ statistics }) {
  return (
    <section className="hm-stats-section">
      <div className="container hm-stats-grid">
        {statistics.map((s) => (
          <div key={s.label} className="hm-stats-item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
