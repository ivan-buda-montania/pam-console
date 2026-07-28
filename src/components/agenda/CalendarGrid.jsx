import { buildMonthGrid, NOMBRES_MES, DIAS_SEMANA, hoyISO } from "../../utils/fechas";
import EventChip from "./EventChip";
import Icon from "../ui/Icon";

export default function CalendarGrid({ anio, mes, eventos, onPrev, onNext, onHoy, onSelectEvento }) {
  const celdas = buildMonthGrid(anio, mes);
  const hoy = hoyISO();

  const porDia = {};
  for (const e of eventos) (porDia[e.fecha] ||= []).push(e);

  return (
    <div className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-primary">
          {NOMBRES_MES[mes]} {anio}
        </h2>
        <div className="flex items-center gap-1">
          <button className="btn-subtle btn-sm" onClick={onPrev} aria-label="Mes anterior">
            <Icon name="chevron-left" size={18} />
          </button>
          <button className="btn-ghost btn-sm" onClick={onHoy}>
            Hoy
          </button>
          <button className="btn-subtle btn-sm" onClick={onNext} aria-label="Mes siguiente">
            <Icon name="chevron-right" size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="px-1 py-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted">
            {d}
          </div>
        ))}
        {celdas.map((c) => {
          const evs = porDia[c.iso] || [];
          const esHoy = c.iso === hoy;
          return (
            <div
              key={c.iso}
              className={`min-h-[6rem] rounded-lg border p-1.5 ${
                c.mesActual ? "border-hairline bg-elevated/40" : "border-transparent opacity-40"
              } ${esHoy ? "ring-1 ring-accent/60" : ""}`}
            >
              <div className={`mb-1 text-right text-xs ${esHoy ? "font-bold text-accent" : "text-muted"}`}>{c.dia}</div>
              <div className="space-y-1">
                {evs.slice(0, 3).map((e) => (
                  <EventChip key={e.id} evento={e} onClick={() => onSelectEvento(e.id)} />
                ))}
                {evs.length > 3 && <div className="px-1 text-[10px] text-muted">+{evs.length - 3} más</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
