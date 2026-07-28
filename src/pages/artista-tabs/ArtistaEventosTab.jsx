import { useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getEventos } from "../../services/eventosService";
import { anioDe } from "../../utils/fechas";
import { TIPOS_EVENTO, ESTADOS_EVENTO } from "../../utils/estados";
import { formatDate } from "../../utils/formato";
import FilterBar from "../../components/ui/FilterBar";
import SelectFilter from "../../components/ui/SelectFilter";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Money from "../../components/ui/Money";
import Loader from "../../components/ui/Loader";

export default function ArtistaEventosTab() {
  const artista = useOutletContext();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [anio, setAnio] = useState("");

  const { data: eventos, loading } = useAsyncData(() => getEventos({ artistaId: artista.id }), [artista.id]);

  const anios = useMemo(
    () => [...new Set((eventos || []).map((e) => anioDe(e.fecha)))].sort((a, b) => b - a),
    [eventos]
  );

  const filtrados = useMemo(
    () =>
      (eventos || []).filter(
        (e) =>
          (!estado || e.estado === estado) &&
          (!tipo || e.tipo === tipo) &&
          (!anio || String(anioDe(e.fecha)) === anio)
      ),
    [eventos, estado, tipo, anio]
  );

  const activo = estado || tipo || anio;

  const columns = [
    { key: "fecha", label: "Fecha", render: (e) => <span className="whitespace-nowrap text-secondary">{formatDate(e.fecha)}</span> },
    { key: "nombre", label: "Evento", render: (e) => <span className="font-medium text-primary">{e.nombre}</span> },
    { key: "ciudad", label: "Ciudad", render: (e) => <span className="text-muted">{e.ciudad}</span> },
    { key: "tipo", label: "Tipo", render: (e) => <span className="text-muted">{TIPOS_EVENTO[e.tipo]}</span> },
    { key: "estado", label: "Estado", render: (e) => <StatusBadge tipo="evento" estado={e.estado} /> },
    { key: "venta", label: "Precio venta", align: "right", render: (e) => <Money value={e.precioVenta.precioFinal} className="font-semibold text-primary" /> },
  ];

  if (loading) return <Loader />;

  return (
    <div>
      <FilterBar onClear={() => { setEstado(""); setTipo(""); setAnio(""); }} activo={!!activo}>
        <SelectFilter
          label="Año"
          value={anio}
          onChange={setAnio}
          allLabel="Todos"
          options={anios.map((a) => ({ value: String(a), label: String(a) }))}
          className="w-32"
        />
        <SelectFilter
          label="Estado"
          value={estado}
          onChange={setEstado}
          allLabel="Todos"
          options={Object.entries(ESTADOS_EVENTO).map(([v, c]) => ({ value: v, label: c.label }))}
          className="w-40"
        />
        <SelectFilter
          label="Tipo"
          value={tipo}
          onChange={setTipo}
          allLabel="Todos"
          options={Object.entries(TIPOS_EVENTO).map(([v, label]) => ({ value: v, label }))}
          className="w-44"
        />
      </FilterBar>

      <DataTable columns={columns} rows={filtrados} onRowClick={(e) => navigate(`/eventos/${e.id}`)} />
    </div>
  );
}
