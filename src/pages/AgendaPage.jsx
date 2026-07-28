import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { useCatalogos } from "../hooks/useCatalogos";
import { getEventos } from "../services/eventosService";
import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import CalendarGrid from "../components/agenda/CalendarGrid";
import EventosListView from "../components/agenda/EventosListView";
import EventosFilterBar from "../components/agenda/EventosFilterBar";
import AlertasProximas from "../components/agenda/AlertasProximas";
import EventoDrawer from "../components/agenda/EventoDrawer";

const FILTROS_VACIOS = { artistaId: "", estado: "", tipo: "", desde: "", hasta: "" };

export default function AgendaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const vista = searchParams.get("vista") === "lista" ? "lista" : "calendario";
  const eventoSel = searchParams.get("evento");

  const hoy = new Date();
  const [cursor, setCursor] = useState({ anio: hoy.getFullYear(), mes: hoy.getMonth() });
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);

  const { data: eventos, loading } = useAsyncData(() => getEventos({}), []);
  const cat = useCatalogos();

  const filtrados = useMemo(
    () =>
      (eventos || []).filter(
        (e) =>
          (!filtros.artistaId || e.artistaId === filtros.artistaId) &&
          (!filtros.estado || e.estado === filtros.estado) &&
          (!filtros.tipo || e.tipo === filtros.tipo) &&
          (!filtros.desde || e.fecha >= filtros.desde) &&
          (!filtros.hasta || e.fecha <= filtros.hasta)
      ),
    [eventos, filtros]
  );

  const activo = Object.values(filtros).some(Boolean);
  const eventoActivo = (eventos || []).find((e) => e.id === eventoSel) || null;

  function setVista(v) {
    const next = new URLSearchParams(searchParams);
    if (v === "lista") next.set("vista", "lista");
    else next.delete("vista");
    setSearchParams(next, { replace: true });
  }
  function abrirEvento(id) {
    const next = new URLSearchParams(searchParams);
    next.set("evento", id);
    setSearchParams(next);
  }
  function cerrarDrawer() {
    const next = new URLSearchParams(searchParams);
    next.delete("evento");
    setSearchParams(next, { replace: true });
  }
  function prevMes() {
    setCursor((c) => (c.mes === 0 ? { anio: c.anio - 1, mes: 11 } : { anio: c.anio, mes: c.mes - 1 }));
  }
  function nextMes() {
    setCursor((c) => (c.mes === 11 ? { anio: c.anio + 1, mes: 0 } : { anio: c.anio, mes: c.mes + 1 }));
  }
  function irHoy() {
    setCursor({ anio: hoy.getFullYear(), mes: hoy.getMonth() });
  }

  const toggleBtn = (activa) =>
    `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
      activa ? "bg-accent text-white" : "text-secondary hover:text-primary"
    }`;

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-up">
      <PageHeader title="Agenda" subtitle="Calendario y gestión de eventos">
        <div className="glass-panel flex rounded-lg p-0.5">
          <button className={toggleBtn(vista === "calendario")} onClick={() => setVista("calendario")}>
            <Icon name="agenda" size={15} /> Calendario
          </button>
          <button className={toggleBtn(vista === "lista")} onClick={() => setVista("lista")}>
            <Icon name="filtro" size={15} /> Lista
          </button>
        </div>
      </PageHeader>

      <AlertasProximas eventos={eventos || []} onSelect={abrirEvento} />

      <EventosFilterBar
        filtros={filtros}
        setFiltros={setFiltros}
        artistas={cat?.artistas || []}
        onClear={() => setFiltros(FILTROS_VACIOS)}
        activo={activo}
      />

      {vista === "calendario" ? (
        <CalendarGrid
          anio={cursor.anio}
          mes={cursor.mes}
          eventos={filtrados}
          onPrev={prevMes}
          onNext={nextMes}
          onHoy={irHoy}
          onSelectEvento={abrirEvento}
        />
      ) : filtrados.length === 0 ? (
        <EmptyState icon="agenda" title="Sin eventos" message="No hay eventos con los filtros actuales." />
      ) : (
        <EventosListView eventos={filtrados} artistaPorId={cat?.artistaPorId} onRowClick={(e) => abrirEvento(e.id)} />
      )}

      <EventoDrawer
        evento={eventoActivo}
        artista={eventoActivo ? cat?.artistaPorId?.[eventoActivo.artistaId] : null}
        cliente={eventoActivo ? cat?.clientePorId?.[eventoActivo.clienteId] : null}
        open={!!eventoActivo}
        onClose={cerrarDrawer}
      />
    </div>
  );
}
