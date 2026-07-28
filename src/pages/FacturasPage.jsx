import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { useCatalogos } from "../hooks/useCatalogos";
import { getFacturas } from "../services/facturasService";
import { totalesFactura } from "../utils/calculos";
import { formatDate } from "../utils/formato";
import PageHeader from "../components/ui/PageHeader";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import Money from "../components/ui/Money";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import FacturasFilterBar from "../components/facturacion/FacturasFilterBar";

const FILTROS_VACIOS = {
  estado: "",
  clienteId: "",
  artistaId: "",
  categoriaIds: [],
  emisionDesde: "",
  emisionHasta: "",
  vencDesde: "",
  vencHasta: "",
};

export default function FacturasPage() {
  const navigate = useNavigate();
  const cat = useCatalogos();
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  const { data: facturas, loading } = useAsyncData(() => getFacturas(filtros), [filtros]);

  const activo =
    Boolean(filtros.estado || filtros.clienteId || filtros.artistaId) ||
    filtros.categoriaIds.length > 0 ||
    Boolean(filtros.emisionDesde || filtros.emisionHasta || filtros.vencDesde || filtros.vencHasta);

  const columns = [
    { key: "folio", label: "Folio", render: (f) => <span className="font-medium text-primary">{f.folio}</span> },
    {
      key: "cliente",
      label: "Cliente",
      render: (f) => <span className="text-secondary">{cat?.clientePorId?.[f.clienteId]?.nombre || "—"}</span>,
    },
    {
      key: "artista",
      label: "Artista",
      render: (f) => <span className="text-muted">{cat?.artistaPorId?.[f.artistaId]?.nombreArtistico || "—"}</span>,
    },
    { key: "emision", label: "Emisión", render: (f) => <span className="whitespace-nowrap text-muted">{formatDate(f.fechaEmision)}</span> },
    { key: "vence", label: "Vence", render: (f) => <span className="whitespace-nowrap text-muted">{formatDate(f.fechaVencimiento)}</span> },
    { key: "estado", label: "Estado", render: (f) => <StatusBadge tipo="factura" estado={f.estado} /> },
    {
      key: "total",
      label: "Total",
      align: "right",
      render: (f) => <Money value={totalesFactura(f).total} className="font-semibold text-primary" />,
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader title="Finanzas" subtitle="Facturas emitidas, pagadas y vencidas">
        <Link to="/facturacion/resumen" className="btn-primary">
          <Icon name="pie" size={16} /> Resumen por categoría
        </Link>
      </PageHeader>

      <FacturasFilterBar
        filtros={filtros}
        setFiltros={setFiltros}
        artistas={cat?.artistas || []}
        clientes={cat?.clientes || []}
        categorias={cat?.categorias || []}
        onClear={() => setFiltros(FILTROS_VACIOS)}
        activo={activo}
      />

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          rows={facturas}
          onRowClick={(f) => navigate(`/facturacion/${f.id}`)}
          minWidth="820px"
          empty={<EmptyState icon="facturacion" title="Sin facturas" message="No hay facturas con los filtros actuales." />}
        />
      )}
    </div>
  );
}
