import EmptyState from "./EmptyState";

// columns: [{ key, label, render?(row,i), align?: "right", thClass?, tdClass? }]
export default function DataTable({ columns, rows, onRowClick, getRowKey = (r, i) => r.id ?? i, empty, minWidth = "640px" }) {
  if (!rows || rows.length === 0) {
    return empty || <EmptyState title="Sin registros" message="No hay datos para mostrar con los filtros actuales." />;
  }
  return (
    <div className="glass-panel overflow-x-auto rounded-xl">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-hairline bg-tint/60 text-left text-xs uppercase tracking-wide text-muted">
            {columns.map((c) => (
              <th key={c.key} className={`px-4 py-3 font-medium ${c.align === "right" ? "text-right" : ""} ${c.thClass || ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getRowKey(row, i)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-hairline last:border-0 ${onRowClick ? "cursor-pointer transition hover:bg-tint" : ""}`}
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-4 py-3 align-middle ${c.align === "right" ? "text-right" : ""} ${c.tdClass || ""}`}>
                  {c.render ? c.render(row, i) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
