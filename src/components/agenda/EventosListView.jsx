import { TIPOS_EVENTO } from "../../utils/estados";
import { formatDate } from "../../utils/formato";
import DataTable from "../ui/DataTable";
import StatusBadge from "../ui/StatusBadge";
import Money from "../ui/Money";

export default function EventosListView({ eventos, artistaPorId, onRowClick }) {
  const columns = [
    {
      key: "fecha",
      label: "Fecha",
      render: (e) => <span className="whitespace-nowrap text-secondary">{formatDate(e.fecha)}</span>,
    },
    { key: "nombre", label: "Evento", render: (e) => <span className="font-medium text-primary">{e.nombre}</span> },
    {
      key: "artista",
      label: "Artista",
      render: (e) => <span className="text-muted">{artistaPorId?.[e.artistaId]?.nombreArtistico || "—"}</span>,
    },
    { key: "ciudad", label: "Ciudad", render: (e) => <span className="text-muted">{e.ciudad}</span> },
    { key: "tipo", label: "Tipo", render: (e) => <span className="text-muted">{TIPOS_EVENTO[e.tipo]}</span> },
    { key: "estado", label: "Estado", render: (e) => <StatusBadge tipo="evento" estado={e.estado} /> },
    {
      key: "venta",
      label: "Precio venta",
      align: "right",
      render: (e) => <Money value={e.precioVenta.precioFinal} className="font-semibold text-primary" />,
    },
  ];

  return <DataTable columns={columns} rows={eventos} onRowClick={onRowClick} minWidth="760px" />;
}
