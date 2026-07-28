import Icon from "./Icon";

export default function StatCard({ label, value, icon, hint, valueClass = "text-primary", iconClass = "text-accent" }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
        {icon && (
          <span className={iconClass}>
            <Icon name={icon} size={20} />
          </span>
        )}
      </div>
      <p className={`mt-3 font-display text-3xl font-bold num ${valueClass}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
