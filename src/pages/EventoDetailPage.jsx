import { useParams, Link } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { getEvento } from "../services/eventosService";
import { getArtista } from "../services/artistasService";
import { getCliente } from "../services/clientesService";
import { getFacturaPorEvento } from "../services/facturasService";
import { TIPOS_EVENTO } from "../utils/estados";
import { formatDateLong } from "../utils/formato";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import Avatar from "../components/ui/Avatar";
import StatusBadge from "../components/ui/StatusBadge";
import CostosBreakdown from "../components/eventos/CostosBreakdown";
import PrecioVentaBreakdown from "../components/eventos/PrecioVentaBreakdown";
import RentabilidadCard from "../components/eventos/RentabilidadCard";
import EventoChat from "../components/comunicacion/EventoChat";

export default function EventoDetailPage() {
  const { eventoId } = useParams();
  const { data, loading } = useAsyncData(async () => {
    const evento = await getEvento(eventoId);
    if (!evento) return { evento: null };
    const [artista, cliente, factura] = await Promise.all([
      getArtista(evento.artistaId),
      getCliente(evento.clienteId),
      getFacturaPorEvento(evento.id),
    ]);
    return { evento, artista, cliente, factura };
  }, [eventoId]);

  if (loading) return <Loader />;
  if (!data?.evento)
    return <EmptyState icon="agenda" title="Evento no encontrado" message="El evento solicitado no existe." />;

  const { evento, artista, cliente, factura } = data;

  return (
    <div className="animate-fade-up">
      <Link to="/agenda" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-primary">
        <Icon name="chevron-left" size={16} /> Agenda
      </Link>

      <div className="card mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <StatusBadge tipo="evento" estado={evento.estado} />
            <span className="chip bg-tint text-secondary">{TIPOS_EVENTO[evento.tipo]}</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-primary">{evento.nombre}</h1>
          <p className="mt-1 text-sm text-muted">
            {formatDateLong(evento.fecha)} · {evento.hora} hrs
          </p>
          <p className="flex items-center gap-1 text-sm text-muted">
            <Icon name="ubicacion" size={14} /> {evento.recinto} · {evento.ciudad}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {artista && (
            <Link to={`/artistas/${artista.id}`} className="flex items-center gap-2 text-secondary hover:text-accent">
              <Avatar nombre={artista.nombreArtistico} color={artista.color} size="sm" /> {artista.nombreArtistico}
            </Link>
          )}
          {cliente && (
            <span className="flex items-center gap-2 text-muted">
              <Icon name="usuario" size={15} /> {cliente.nombre}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CostosBreakdown evento={evento} />
          <PrecioVentaBreakdown evento={evento} />
        </div>
        <div className="space-y-6">
          <RentabilidadCard evento={evento} />
          <section className="card">
            <h2 className="mb-3 text-sm font-semibold text-primary">Factura asociada</h2>
            {factura ? (
              <Link
                to={`/facturacion/${factura.id}`}
                className="flex items-center justify-between rounded-lg border border-hairline bg-elevated/60 px-3 py-3 transition hover:border-accent/30"
              >
                <div>
                  <p className="text-sm font-medium text-primary">{factura.folio}</p>
                  <p className="text-xs text-muted">Ver factura asociada</p>
                </div>
                <span className="flex items-center gap-2">
                  <StatusBadge tipo="factura" estado={factura.estado} />
                  <Icon name="chevron-right" size={16} className="text-muted" />
                </span>
              </Link>
            ) : (
              <p className="text-sm text-muted">Este evento aún no tiene factura asociada.</p>
            )}
          </section>
          {evento.notas && (
            <section className="card">
              <h2 className="mb-2 text-sm font-semibold text-primary">Notas</h2>
              <p className="text-sm text-muted">{evento.notas}</p>
            </section>
          )}
        </div>
      </div>

      <div className="mt-6">
        <EventoChat eventoId={evento.id} />
      </div>
    </div>
  );
}
