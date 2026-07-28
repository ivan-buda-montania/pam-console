import { ESTADOS_EVENTO, ESTADOS_FACTURA, ESTADOS_CUENTA } from "../../utils/estados";

const MAPS = {
  evento: ESTADOS_EVENTO,
  factura: ESTADOS_FACTURA,
  cuenta: ESTADOS_CUENTA,
};

// tipo: "evento" | "factura" | "cuenta"
export default function StatusBadge({ tipo = "evento", estado, className = "" }) {
  const map = MAPS[tipo] || ESTADOS_EVENTO;
  const cfg = map[estado] || { label: estado, chip: "bg-slate-500/15 text-slate-600 dark:text-slate-300", dot: "bg-slate-500" };
  return (
    <span className={`chip ${cfg.chip} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
