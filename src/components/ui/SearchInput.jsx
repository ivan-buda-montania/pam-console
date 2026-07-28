import Icon from "./Icon";

export default function SearchInput({ value, onChange, placeholder = "Buscar…", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        <Icon name="search" size={16} />
      </span>
      <input
        className="input pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
