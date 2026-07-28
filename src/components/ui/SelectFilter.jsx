export default function SelectFilter({ label, value, onChange, options, allLabel = "Todos", className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="label">{label}</span>}
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
