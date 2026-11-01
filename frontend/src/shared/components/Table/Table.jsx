import { SkeletonLine } from "../Loader";
import EmptyState from "../EmptyState";
import { LuInbox } from "react-icons/lu";
import "./Table.css";

/**
 * columns: [{ key, label, render?(row), align? }]
 */
export default function Table({ columns, data, loading, emptyLabel = "No records found" }) {
  if (loading) {
    return (
      <div className="table-wrap">
        <table className="cs-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key}>
                    <SkeletonLine height={12} width="70%" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState icon={LuInbox} title={emptyLabel} />;
  }

  return (
    <div className="table-wrap">
      <table className="cs-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align || "left" }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || "left" }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
