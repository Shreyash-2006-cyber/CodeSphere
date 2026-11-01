import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./Pagination.css";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <LuChevronLeft />
      </button>
      {pages.map((p, idx) => (
        <span key={p} style={{ display: "flex", alignItems: "center" }}>
          {idx > 0 && p - pages[idx - 1] > 1 && <span className="pagination-ellipsis">…</span>}
          <button className={p === page ? "active" : ""} onClick={() => onChange(p)}>
            {p}
          </button>
        </span>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <LuChevronRight />
      </button>
    </div>
  );
}
