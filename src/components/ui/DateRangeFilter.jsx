export default function DateRangeFilter({ label, desde, hasta, onChange, className = "" }) {
  return (
    <div className={className}>
      {label && <span className="label">{label}</span>}
      <div className="flex items-center gap-2">
        <input
          type="date"
          className="input"
          value={desde || ""}
          onChange={(e) => onChange({ desde: e.target.value, hasta })}
        />
        <span className="text-muted">–</span>
        <input
          type="date"
          className="input"
          value={hasta || ""}
          onChange={(e) => onChange({ desde, hasta: e.target.value })}
        />
      </div>
    </div>
  );
}
