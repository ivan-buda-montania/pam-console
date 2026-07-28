import Icon from "./Icon";

export default function FilterBar({ children, onClear, activo = false }) {
  return (
    <div className="card mb-5 p-4">
      <div className="flex flex-wrap items-end gap-3">
        {children}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            disabled={!activo}
            className="btn-subtle btn-sm ml-auto self-end disabled:opacity-40"
          >
            <Icon name="close" size={14} /> Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
