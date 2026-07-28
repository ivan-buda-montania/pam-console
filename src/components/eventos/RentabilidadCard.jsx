import { rentabilidad } from "../../utils/calculos";
import { formatPct } from "../../utils/formato";
import Money from "../ui/Money";

export default function RentabilidadCard({ evento }) {
  const r = rentabilidad(evento);
  const costoPct = r.precioFinal > 0 ? Math.min(100, (r.costos / r.precioFinal) * 100) : 0;
  const utilPct = Math.max(0, 100 - costoPct);
  const margenColor =
    r.margenPct >= 20
      ? "text-emerald-600 dark:text-emerald-300"
      : r.margenPct >= 5
        ? "text-amber-600 dark:text-amber-300"
        : "text-red-600 dark:text-red-300";

  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold text-primary">Rentabilidad</h2>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">Margen</p>
          <p className={`font-display text-3xl font-bold ${margenColor}`}>{formatPct(r.margenPct)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Utilidad</p>
          <Money value={r.utilidad} className="font-display text-xl font-bold text-primary" />
        </div>
      </div>

      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-elevated">
        <div className="bg-slate-500" style={{ width: `${costoPct}%` }} />
        <div className="bg-emerald-500" style={{ width: `${utilPct}%` }} />
      </div>

      <div className="mt-3 flex justify-between text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-500" /> Costo <Money value={r.costos} className="text-secondary" />
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Venta <Money value={r.precioFinal} className="text-secondary" />
        </span>
      </div>
    </section>
  );
}
