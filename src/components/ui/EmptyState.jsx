import Icon from "./Icon";

export default function EmptyState({ icon = "search", title = "Sin resultados", message, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline bg-surface/10 px-6 py-14 text-center backdrop-blur-xl">
      <span className="mb-3 text-muted">
        <Icon name={icon} size={32} />
      </span>
      <p className="font-medium text-secondary">{title}</p>
      {message && <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
