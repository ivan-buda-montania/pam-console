import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { getEntidades, getResumenCuentas } from "../services/entidadesService";
import { TIPOS_ENTIDAD } from "../utils/estados";
import { formatMoney } from "../utils/formato";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import FilterBar from "../components/ui/FilterBar";
import SelectFilter from "../components/ui/SelectFilter";
import DataTable from "../components/ui/DataTable";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Money from "../components/ui/Money";
import EntidadDrawer from "../components/aliados/EntidadDrawer";

function saldoPendiente(entidad) {
  return (entidad.cuentas || []).filter((c) => c.estado !== "pagado").reduce((s, c) => s + c.monto, 0);
}

export default function AliadosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tipo, setTipo] = useState("");
  const seleccionada = searchParams.get("entidad");

  const { data: entidades, loading } = useAsyncData(() => getEntidades(tipo ? { tipo } : {}), [tipo]);
  const { data: resumen } = useAsyncData(() => getResumenCuentas(), []);

  const activa = useMemo(() => (entidades || []).find((e) => e.id === seleccionada) || null, [entidades, seleccionada]);

  function abrir(id) {
    const next = new URLSearchParams(searchParams);
    next.set("entidad", id);
    setSearchParams(next);
  }
  function cerrar() {
    const next = new URLSearchParams(searchParams);
    next.delete("entidad");
    setSearchParams(next, { replace: true });
  }

  const columns = [
    { key: "razon", label: "Razón social", render: (e) => <span className="font-medium text-primary">{e.razonSocial}</span> },
    {
      key: "tipo",
      label: "Tipo",
      render: (e) => {
        const t = TIPOS_ENTIDAD[e.tipo] || TIPOS_ENTIDAD.proveedor;
        return (
          <span className={`chip ${t.chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
            {t.label}
          </span>
        );
      },
    },
    { key: "rubro", label: "Rubro", render: (e) => <span className="text-muted">{e.rubro}</span> },
    { key: "contacto", label: "Contacto", render: (e) => <span className="text-secondary">{e.contacto.nombre}</span> },
    {
      key: "saldo",
      label: "Saldo pendiente",
      align: "right",
      render: (e) => {
        const s = saldoPendiente(e);
        return s > 0 ? <Money value={s} className="font-semibold text-primary" /> : <span className="text-muted">—</span>;
      },
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader title="Aliados" subtitle="Proveedores, patrocinadores y alianzas" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Por pagar a proveedores"
          value={<Money value={resumen?.porPagar || 0} />}
          icon="maletin"
          hint={resumen?.vencidoPagar ? `Vencido: ${formatMoney(resumen.vencidoPagar)}` : "Al corriente"}
        />
        <StatCard
          label="Por cobrar a patrocinadores"
          value={<Money value={resumen?.porCobrar || 0} />}
          icon="dinero"
          hint={resumen?.vencidoCobrar ? `Vencido: ${formatMoney(resumen.vencidoCobrar)}` : "Al corriente"}
        />
        <StatCard label="Aliados registrados" value={(entidades || []).length} icon="artistas" hint="Con el filtro actual" />
      </div>

      <FilterBar onClear={() => setTipo("")} activo={!!tipo}>
        <SelectFilter
          label="Tipo"
          value={tipo}
          onChange={setTipo}
          allLabel="Todos"
          options={Object.entries(TIPOS_ENTIDAD).map(([v, c]) => ({ value: v, label: c.label }))}
          className="w-48"
        />
      </FilterBar>

      {loading ? (
        <Loader />
      ) : (entidades || []).length === 0 ? (
        <EmptyState icon="maletin" title="Sin aliados" message="No hay registros con el filtro actual." />
      ) : (
        <DataTable columns={columns} rows={entidades} onRowClick={(e) => abrir(e.id)} minWidth="720px" />
      )}

      <EntidadDrawer entidad={activa} open={!!activa} onClose={cerrar} />
    </div>
  );
}
