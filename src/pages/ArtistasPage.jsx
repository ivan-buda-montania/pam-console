import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { getTalentoConMetricas } from "../services/artistasService";
import { TIPOS_TALENTO } from "../utils/estados";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import ArtistCard from "../components/artistas/ArtistCard";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import Avatar from "../components/ui/Avatar";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import Money from "../components/ui/Money";

export default function ArtistasPage() {
  const navigate = useNavigate();
  const { data: talento, loading } = useAsyncData(() => getTalentoConMetricas(), []);
  const [q, setQ] = useState("");
  const [vista, setVista] = useState("tarjetas");

  const term = q.trim().toLowerCase();
  const filtrados = (talento || []).filter((a) =>
    [a.nombreArtistico, a.nombreReal, a.genero, TIPOS_TALENTO[a.tipo]?.label].some((s) => (s || "").toLowerCase().includes(term))
  );

  const toggleBtn = (activa) =>
    `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
      activa ? "bg-accent text-white" : "text-secondary hover:text-primary"
    }`;

  const columns = [
    {
      key: "nombre",
      label: "Talento",
      render: (a) => (
        <span className="flex items-center gap-3">
          <Avatar nombre={a.nombreArtistico} color={a.color} size="sm" />
          <span className="min-w-0">
            <span className="block truncate font-medium text-primary">{a.nombreArtistico}</span>
            <span className="block truncate text-xs text-muted">{a.genero}</span>
          </span>
        </span>
      ),
    },
    {
      key: "tipo",
      label: "Tipo",
      render: (a) => {
        const t = TIPOS_TALENTO[a.tipo] || TIPOS_TALENTO.artista;
        return (
          <span className={`chip ${t.chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
            {t.label}
          </span>
        );
      },
    },
    { key: "eventos", label: "Eventos", align: "right", render: (a) => <span className="num text-secondary">{a.numEventos}</span> },
    { key: "ingresos", label: "Ingresos totales", align: "right", render: (a) => <Money value={a.ingresosTotales} className="font-semibold text-primary" /> },
    {
      key: "contrato",
      label: "Último contrato",
      render: (a) => (a.ultimoContratoEstado ? <StatusBadge tipo="evento" estado={a.ultimoContratoEstado} /> : <span className="text-muted">—</span>),
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader title="Talento" subtitle="Artistas e influencers representados">
        <SearchInput value={q} onChange={setQ} placeholder="Buscar talento…" className="w-full sm:w-56" />
        <div className="glass-panel flex rounded-lg p-0.5">
          <button className={toggleBtn(vista === "tarjetas")} onClick={() => setVista("tarjetas")}>
            <Icon name="tarjetas" size={15} /> Tarjetas
          </button>
          <button className={toggleBtn(vista === "tabla")} onClick={() => setVista("tabla")}>
            <Icon name="tabla" size={15} /> Tabla
          </button>
        </div>
      </PageHeader>

      {loading ? (
        <Loader />
      ) : filtrados.length === 0 ? (
        <EmptyState icon="artistas" title="Sin talento" message="No se encontraron resultados con ese criterio." />
      ) : vista === "tarjetas" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtrados.map((a) => (
            <ArtistCard key={a.id} artista={a} />
          ))}
        </div>
      ) : (
        <DataTable columns={columns} rows={filtrados} onRowClick={(a) => navigate(`/artistas/${a.id}`)} minWidth="720px" />
      )}
    </div>
  );
}
