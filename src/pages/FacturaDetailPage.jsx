import { useParams, Link } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { getFactura, updateEstadoFactura } from "../services/facturasService";
import { getArtista } from "../services/artistasService";
import { getCliente } from "../services/clientesService";
import { getCategorias } from "../services/categoriasService";
import { ESTADOS_FACTURA } from "../utils/estados";
import { formatDate } from "../utils/formato";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import StatusBadge from "../components/ui/StatusBadge";
import { useToast } from "../components/ui/toast-context";
import LineItemsTable from "../components/facturacion/LineItemsTable";
import TotalsCard from "../components/facturacion/TotalsCard";
import MockActions from "../components/facturacion/MockActions";
import { getEvento } from "../services/eventosService";
import CostosBreakdown from "../components/eventos/CostosBreakdown";
import PrecioVentaBreakdown from "../components/eventos/PrecioVentaBreakdown";
import RentabilidadCard from "../components/eventos/RentabilidadCard";

export default function FacturaDetailPage() {
  const { facturaId } = useParams();
  const toast = useToast();
  const { data, loading, reload } = useAsyncData(async () => {
    const factura = await getFactura(facturaId);
    if (!factura) return { factura: null };
    const [artista, cliente, categorias, evento] = await Promise.all([
      getArtista(factura.artistaId),
      getCliente(factura.clienteId),
      getCategorias(),
      factura.eventoId ? getEvento(factura.eventoId) : Promise.resolve(null),
    ]);
    return { factura, artista, cliente, categorias, evento };
  }, [facturaId]);

  if (loading) return <Loader />;
  if (!data?.factura)
    return <EmptyState icon="facturacion" title="Factura no encontrada" message="La factura solicitada no existe." />;

  const { factura, artista, cliente, categorias, evento } = data;
  const categoriaPorId = Object.fromEntries(categorias.map((c) => [c.id, c]));
  const fallback = categorias.find((c) => c.esFallback);

  async function cambiarEstado(nuevo) {
    if (nuevo === factura.estado) return;
    await updateEstadoFactura(factura.id, nuevo);
    toast(`Factura marcada como ${ESTADOS_FACTURA[nuevo].label.toLowerCase()}.`, "success");
    reload();
  }

  return (
    <div className="animate-fade-up">
      <Link to="/facturacion" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-primary">
        <Icon name="chevron-left" size={16} /> Finanzas
      </Link>

      <div className="card mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2">
            <StatusBadge tipo="factura" estado={factura.estado} />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary">{factura.folio}</h1>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            {cliente && (
              <span className="flex items-center gap-1.5">
                <Icon name="usuario" size={14} /> {cliente.nombre}
              </span>
            )}
            {artista && (
              <Link to={`/artistas/${artista.id}`} className="flex items-center gap-1.5 hover:text-accent">
                <Icon name="artistas" size={14} /> {artista.nombreArtistico}
              </Link>
            )}
            {factura.eventoId && (
              <Link to={`/eventos/${factura.eventoId}`} className="flex items-center gap-1.5 hover:text-accent">
                <Icon name="evento" size={14} /> Ver evento
              </Link>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">
            Emitida el {formatDate(factura.fechaEmision)} · Vence el {formatDate(factura.fechaVencimiento)}
          </p>
        </div>

        <MockActions />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section>
            <h2 className="mb-3 text-sm font-semibold text-primary">Conceptos facturables</h2>
            <LineItemsTable lineas={factura.lineas} categoriaPorId={categoriaPorId} fallback={fallback} />
          </section>
          {factura.notas && (
            <section className="card">
              <h2 className="mb-2 text-sm font-semibold text-primary">Notas</h2>
              <p className="text-sm text-muted">{factura.notas}</p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <TotalsCard factura={factura} />
          <section className="card">
            <h2 className="mb-3 text-sm font-semibold text-primary">Cambiar estado</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(ESTADOS_FACTURA).map(([valor, cfg]) => {
                const activo = factura.estado === valor;
                return (
                  <button
                    key={valor}
                    onClick={() => cambiarEstado(valor)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition ${
                      activo
                        ? "border-accent/40 bg-accent/10 text-primary"
                        : "border-hairline bg-tint/50 text-secondary hover:bg-tint"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} /> {cfg.label}
                    </span>
                    {activo && <Icon name="check" size={16} className="text-accent" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {evento && (
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-primary">Comparativa costo vs. precio de venta</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CostosBreakdown evento={evento} />
            </div>
            <div className="space-y-6">
              <RentabilidadCard evento={evento} />
              <PrecioVentaBreakdown evento={evento} />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Costos y margen del evento asociado ({evento.nombre}).{" "}
            <Link to={`/eventos/${evento.id}`} className="text-accent hover:text-accent-hover">Ver evento completo</Link>
          </p>
        </div>
      )}
    </div>
  );
}
