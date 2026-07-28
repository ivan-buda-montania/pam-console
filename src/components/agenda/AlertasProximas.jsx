import { diasHasta } from "../../utils/fechas";
import { formatDate } from "../../utils/formato";
import Icon from "../ui/Icon";

function urgencia(d) {
  if (d <= 7) return { label: "≤ 7 días", cls: "border-red-500/20 bg-red-500/10" };
  if (d <= 15) return { label: "≤ 15 días", cls: "border-amber-500/20 bg-amber-500/10" };
  return { label: "≤ 30 días", cls: "border-hairline bg-tint" };
}

export default function AlertasProximas({ eventos, onSelect }) {
  const proximos = eventos
    .filter((e) => e.estado !== "cancelado")
    .map((e) => ({ ...e, d: diasHasta(e.fecha) }))
    .filter((e) => e.d >= 0 && e.d <= 30)
    .sort((a, b) => a.d - b.d);

  if (proximos.length === 0) return null;

  return (
    <div className="card mb-5">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
        <span className="text-accent">
          <Icon name="alerta" size={16} />
        </span>
        Alertas de eventos próximos
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {proximos.map((e) => {
          const u = urgencia(e.d);
          return (
            <button
              key={e.id}
              onClick={() => onSelect(e.id)}
              className={`w-52 shrink-0 rounded-lg border p-3 text-left transition hover:brightness-110 ${u.cls}`}
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-secondary">
                <span>{u.label}</span>
                <span>{e.d === 0 ? "Hoy" : `${e.d} d`}</span>
              </div>
              <p className="mt-1 truncate text-sm font-semibold text-primary">{e.nombre}</p>
              <p className="truncate text-xs text-muted">
                {formatDate(e.fecha)} · {e.ciudad}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
