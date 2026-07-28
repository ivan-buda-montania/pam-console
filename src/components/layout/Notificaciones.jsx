import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getEventosProximos } from "../../services/eventosService";
import { getFacturas } from "../../services/facturasService";
import { formatDate } from "../../utils/formato";
import Icon from "../ui/Icon";

export default function Notificaciones() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { data } = useAsyncData(async () => {
    const [proximos, vencidas] = await Promise.all([getEventosProximos(7), getFacturas({ estado: "vencida" })]);
    return { proximos, vencidas };
  }, []);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const proximos = data?.proximos || [];
  const vencidas = data?.vencidas || [];
  const total = proximos.length + vencidas.length;

  return (
    <div className="relative" ref={ref}>
      <button className="btn-ghost btn-sm relative !px-2" onClick={() => setOpen((o) => !o)} aria-label="Notificaciones">
        <Icon name="campana" size={17} />
        {total > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {total}
          </span>
        )}
      </button>
      {open && (
        <div className="glass absolute right-0 z-40 mt-2 w-80 rounded-xl p-2">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted">Notificaciones</p>
          {total === 0 && <p className="px-2 py-3 text-sm text-muted">Todo al día.</p>}
          {vencidas.map((f) => (
            <Link key={f.id} to={`/facturacion/${f.id}`} onClick={() => setOpen(false)} className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-tint">
              <span className="mt-0.5 text-red-500 dark:text-red-400">
                <Icon name="alerta" size={15} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-primary">Factura vencida · {f.folio}</span>
                <span className="block text-xs text-muted">Vence {formatDate(f.fechaVencimiento)}</span>
              </span>
            </Link>
          ))}
          {proximos.map((e) => (
            <Link key={e.id} to={`/eventos/${e.id}`} onClick={() => setOpen(false)} className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-tint">
              <span className="mt-0.5 text-accent">
                <Icon name="agenda" size={15} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-primary">{e.nombre}</span>
                <span className="block text-xs text-muted">
                  {e.diasRestantes === 0 ? "Hoy" : `En ${e.diasRestantes} días`} · {formatDate(e.fecha)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
