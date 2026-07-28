import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { useCatalogos } from "../hooks/useCatalogos";
import { getEventosProximos } from "../services/eventosService";
import { getFacturas } from "../services/facturasService";
import { getIngresosPorTalento, getHistoricoMensual, getContadores } from "../services/dashboardService";
import { totalesFactura } from "../utils/calculos";
import { formatDate, formatMoney } from "../utils/formato";
import { toISO } from "../utils/fechas";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import SelectFilter from "../components/ui/SelectFilter";
import StatusBadge from "../components/ui/StatusBadge";
import Money from "../components/ui/Money";
import Avatar from "../components/ui/Avatar";
import Loader from "../components/ui/Loader";
import Icon from "../components/ui/Icon";
import EmptyState from "../components/ui/EmptyState";
import IngresosPorTalentoChart from "../components/dashboard/IngresosPorTalentoChart";
import HistoricoMensualChart from "../components/dashboard/HistoricoMensualChart";

function mesActualPrefix() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function calcRango(periodo) {
  const d = new Date();
  if (periodo === "mes") return { desde: toISO(new Date(d.getFullYear(), d.getMonth(), 1)), hasta: toISO(new Date(d.getFullYear(), d.getMonth() + 1, 0)) };
  if (periodo === "anio") return { desde: `${d.getFullYear()}-01-01`, hasta: `${d.getFullYear()}-12-31` };
  return {};
}

export default function InicioPage() {
  const [periodo, setPeriodo] = useState("mes");
  const rango = useMemo(() => calcRango(periodo), [periodo]);

  const { data, loading } = useAsyncData(async () => {
    const [proximos, facturas, historico, contadores] = await Promise.all([
      getEventosProximos(30),
      getFacturas(),
      getHistoricoMensual(6),
      getContadores(),
    ]);
    return { proximos, facturas, historico, contadores };
  }, []);
  const { data: ranking } = useAsyncData(() => getIngresosPorTalento(rango), [rango]);
  const cat = useCatalogos();

  if (loading || !data) return <Loader />;

  const { proximos, facturas, historico, contadores } = data;
  const proximos7 = proximos.filter((e) => e.diasRestantes <= 7);
  const vencidas = facturas.filter((f) => f.estado === "vencida");
  const totalVencido = vencidas.reduce((s, f) => s + totalesFactura(f).total, 0);
  const prefijo = mesActualPrefix();
  const facturadoMes = facturas.filter((f) => (f.fechaEmision || "").startsWith(prefijo)).reduce((s, f) => s + totalesFactura(f).total, 0);

  const masFacturado = (ranking || []).find((r) => r.total > 0) || null;
  const nombreArtista = (id) => cat?.artistaPorId?.[id]?.nombreArtistico || "—";
  const colorArtista = (id) => cat?.artistaPorId?.[id]?.color || "slate";
  const nombreCliente = (id) => cat?.clientePorId?.[id]?.nombre || "—";

  const periodoOpts = [
    { value: "mes", label: "Este mes" },
    { value: "anio", label: "Este año" },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader title="Inicio" subtitle="Panorama general de la operación" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Talentos" value={contadores.numTalentos} icon="artistas" hint="Artistas e influencers" />
        <StatCard label="Eventos próximos (30 días)" value={proximos.length} icon="agenda" hint={`${proximos7.length} en los próximos 7 días`} />
        <StatCard
          label="Facturas vencidas"
          value={vencidas.length}
          icon="alerta"
          iconClass="text-red-500 dark:text-red-400"
          valueClass={vencidas.length ? "text-red-600 dark:text-red-300" : "text-primary"}
          hint={`Monto vencido: ${formatMoney(totalVencido)}`}
        />
        <StatCard label="Facturado del mes" value={<Money value={facturadoMes} />} icon="dinero" />
      </div>

      {/* Analíticas de talento */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="card">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-primary">Talento más facturado</h2>
            <SelectFilter value={periodo} onChange={setPeriodo} allLabel="Histórico" options={periodoOpts} className="w-32" />
          </div>
          {masFacturado ? (
            <div className="flex items-center gap-4">
              <Avatar nombre={masFacturado.nombre} color={masFacturado.color} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-primary">{masFacturado.nombre}</p>
                <p className="mt-1 font-display text-2xl font-bold text-accent">
                  <Money value={masFacturado.total} />
                </p>
                <p className="text-xs text-muted">facturado en el periodo</p>
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted">Sin facturación en el periodo.</p>
          )}
        </section>

        <section className="card lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-primary">Ganancias por talento</h2>
          <IngresosPorTalentoChart data={ranking || []} />
        </section>
      </div>

      {/* Histórico mensual */}
      <div className="mt-6">
        <section className="card">
          <h2 className="mb-3 text-sm font-semibold text-primary">Histórico mensual de ganancias</h2>
          <HistoricoMensualChart data={historico} />
        </section>
      </div>

      {/* Próximos eventos + facturas vencidas */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary">Próximos eventos</h2>
            <Link to="/agenda" className="text-xs font-medium text-accent hover:text-accent-hover">Ver agenda</Link>
          </div>
          {proximos.length === 0 ? (
            <EmptyState icon="agenda" title="Sin eventos próximos" message="No hay eventos en los próximos 30 días." />
          ) : (
            <ul className="divide-y divide-hairline">
              {proximos.slice(0, 6).map((e) => (
                <li key={e.id}>
                  <Link to={`/eventos/${e.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 transition hover:bg-tint">
                    <Avatar nombre={nombreArtista(e.artistaId)} color={colorArtista(e.artistaId)} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-primary">{e.nombre}</p>
                      <p className="truncate text-xs text-muted">{nombreArtista(e.artistaId)} · {e.ciudad}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-secondary">{formatDate(e.fecha)}</p>
                      <p className="text-[11px] text-accent">{e.diasRestantes === 0 ? "Hoy" : `En ${e.diasRestantes} d`}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary">Facturas vencidas</h2>
            <Link to="/facturacion" className="text-xs font-medium text-accent hover:text-accent-hover">Ver finanzas</Link>
          </div>
          {vencidas.length === 0 ? (
            <EmptyState icon="check" title="Todo al día" message="No hay facturas vencidas." />
          ) : (
            <ul className="divide-y divide-hairline">
              {vencidas.map((f) => (
                <li key={f.id}>
                  <Link to={`/facturacion/${f.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 transition hover:bg-tint">
                    <span className="text-red-500 dark:text-red-400"><Icon name="facturacion" size={20} /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-primary">{f.folio}</p>
                      <p className="truncate text-xs text-muted">{nombreCliente(f.clienteId)} · vence {formatDate(f.fechaVencimiento)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Money value={totalesFactura(f).total} className="text-sm font-semibold text-primary" />
                      <StatusBadge tipo="factura" estado={f.estado} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
