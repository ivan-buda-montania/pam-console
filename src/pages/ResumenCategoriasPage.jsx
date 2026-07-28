import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { useCatalogos } from "../hooks/useCatalogos";
import { getResumenPorCategoria } from "../services/facturasService";
import { chartColor } from "../utils/estados";
import { useTheme } from "../components/theme/theme-context";
import { toISO } from "../utils/fechas";
import { formatMoney, formatPct } from "../utils/formato";
import PageHeader from "../components/ui/PageHeader";
import FilterBar from "../components/ui/FilterBar";
import SelectFilter from "../components/ui/SelectFilter";
import DateRangeFilter from "../components/ui/DateRangeFilter";
import DataTable from "../components/ui/DataTable";
import Loader from "../components/ui/Loader";
import Icon from "../components/ui/Icon";
import Money from "../components/ui/Money";
import CategoryChart from "../components/facturacion/CategoryChart";

function rangoMesActual() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth();
  return { desde: toISO(new Date(y, m, 1)), hasta: toISO(new Date(y, m + 1, 0)) };
}
function rangoTrimestre() {
  const hasta = toISO(new Date());
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return { desde: toISO(d), hasta };
}

export default function ResumenCategoriasPage() {
  const cat = useCatalogos();
  const { theme } = useTheme();
  const [periodo, setPeriodo] = useState({ desde: "", hasta: "" });
  const [artistaId, setArtistaId] = useState("");

  const { data, loading } = useAsyncData(
    () => getResumenPorCategoria({ desde: periodo.desde, hasta: periodo.hasta, artistaId }),
    [periodo, artistaId]
  );

  // Color estable por posición de la categoría en el catálogo (sigue a la entidad).
  const colorPorId = useMemo(() => {
    const map = {};
    (cat?.categorias || []).forEach((c, i) => (map[c.id] = chartColor(i, theme)));
    return map;
  }, [cat, theme]);

  const filas = data?.filas || [];
  const chartData = filas.map((r) => ({
    nombre: r.categoria.nombre,
    total: r.total,
    porcentaje: r.porcentaje,
    color: colorPorId[r.categoria.id] || "#94a3b8",
  }));

  const activo = periodo.desde || periodo.hasta || artistaId;

  const columns = [
    {
      key: "categoria",
      label: "Categoría",
      render: (r) => (
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: colorPorId[r.categoria.id] || "#94a3b8" }} />
          <span className="font-medium text-primary">{r.categoria.nombre}</span>
        </span>
      ),
    },
    { key: "total", label: "Facturado", align: "right", render: (r) => <Money value={r.total} className="font-semibold text-primary" /> },
    { key: "pct", label: "%", align: "right", render: (r) => <span className="text-secondary num">{formatPct(r.porcentaje, 1)}</span> },
    { key: "lineas", label: "Líneas", align: "right", render: (r) => <span className="text-muted num">{r.numLineas}</span> },
  ];

  return (
    <div className="animate-fade-up">
      <Link to="/facturacion" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-primary">
        <Icon name="chevron-left" size={16} /> Finanzas
      </Link>
      <PageHeader title="Resumen por categoría" subtitle="Distribución de ingresos facturados por concepto" />

      <FilterBar onClear={() => { setPeriodo({ desde: "", hasta: "" }); setArtistaId(""); }} activo={!!activo}>
        <div>
          <span className="label">Periodo rápido</span>
          <div className="flex gap-1">
            <button className="btn-ghost btn-sm" onClick={() => setPeriodo(rangoMesActual())}>Este mes</button>
            <button className="btn-ghost btn-sm" onClick={() => setPeriodo(rangoTrimestre())}>Trimestre</button>
            <button className="btn-ghost btn-sm" onClick={() => setPeriodo({ desde: "", hasta: "" })}>Todo</button>
          </div>
        </div>
        <DateRangeFilter
          label="Emisión (personalizado)"
          desde={periodo.desde}
          hasta={periodo.hasta}
          onChange={({ desde, hasta }) => setPeriodo({ desde, hasta })}
        />
        <SelectFilter
          label="Artista"
          value={artistaId}
          onChange={setArtistaId}
          allLabel="Todos"
          options={(cat?.artistas || []).map((a) => ({ value: a.id, label: a.nombreArtistico }))}
          className="w-44"
        />
      </FilterBar>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="card">
              <p className="text-xs uppercase tracking-wide text-muted">Total facturado</p>
              <p className="mt-2 font-display text-2xl font-bold text-primary">{formatMoney(data?.granTotal || 0)}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-wide text-muted">Facturas en el periodo</p>
              <p className="mt-2 font-display text-2xl font-bold text-primary num">{data?.numFacturas || 0}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-wide text-muted">Categorías con ingresos</p>
              <p className="mt-2 font-display text-2xl font-bold text-primary num">{filas.length}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <CategoryChart data={chartData} />
            <div>
              <h2 className="mb-3 text-sm font-semibold text-primary">Detalle por categoría</h2>
              <DataTable columns={columns} rows={filas} getRowKey={(r) => r.categoria.id} minWidth="380px" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
