import "./Loader.css";

export function Spinner({ size = 22 }) {
  return (
    <span
      className="cs-spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SkeletonLine({ width = "100%", height = 14 }) {
  return <div className="skeleton" style={{ width, height, borderRadius: 6 }} />;
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <SkeletonLine width="40%" height={12} />
      <SkeletonLine width="70%" height={22} />
      <SkeletonLine width="90%" height={12} />
    </div>
  );
}

export default function Loader({ label = "Loading…" }) {
  return (
    <div className="cs-loader">
      <Spinner />
      <span>{label}</span>
    </div>
  );
}
