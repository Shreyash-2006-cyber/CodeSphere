function heatColor(v) {
  if (v === 0) return "var(--color-bg-muted)";
  if (v === 1) return "#bbf7d0";
  if (v === 2) return "#4ade80";
  if (v <= 4) return "#16a34a";
  return "#15803d";
}

export default function Heatmap({ values }) {
  const weeks = [];
  for (let i = 0; i < values.length; i += 7) weeks.push(values.slice(i, i + 7));
  return (
    <div className="lc-heatmap">
      {weeks.map((week, wi) => (
        <div className="lc-heatmap-col" key={wi}>
          {week.map((v, di) => (
            <span key={di} className="lc-heatmap-cell" style={{ background: heatColor(v) }} title={`${v} submissions`} />
          ))}
        </div>
      ))}
    </div>
  );
}
