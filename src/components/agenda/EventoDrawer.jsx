import { Link } from "react-router-dom";
import Drawer from "../ui/Drawer";
import StatusBadge from "../ui/StatusBadge";
import Money from "../ui/Money";
import Icon from "../ui/Icon";
import { TIPOS_EVENTO } from "../../utils/estados";
import { formatDateLong } from "../../utils/formato";
import { rentabilidad } from "../../utils/calculos";

function Fila({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-secondary">
      <span className="text-muted">
        <Icon name={icon} size={15} />
      </span>
      {children}
    </div>
  );
}

export default function EventoDrawer({ evento, artista, cliente, open, onClose }) {
  const r = evento ? rentabilidad(evento) : null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={evento ? evento.nombre : "Evento"}
      footer={
        evento && (
          <Link to={`/eventos/${evento.id}`} className="btn-primary w-full" onClick={onClose}>
            Ver desglose completo <Icon name="chevron-right" size={16} />
          </Link>
        )
      }
    >
      {evento && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge tipo="evento" estado={evento.estado} />
            <span className="chip bg-tint text-secondary">{TIPOS_EVENTO[evento.tipo]}</span>
          </div>

          <div className="space-y-2">
            <Fila icon="agenda">{formatDateLong(evento.fecha)}</Fila>
            <Fila icon="reloj">{evento.hora} hrs</Fila>
            <Fila icon="ubicacion">
              {evento.recinto} · {evento.ciudad}
            </Fila>
            {artista && <Fila icon="artistas">{artista.nombreArtistico}</Fila>}
            {cliente && <Fila icon="usuario">{cliente.nombre}</Fila>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-elevated/70 p-3">
              <p className="text-xs text-muted">Precio de venta</p>
              <Money value={r.precioFinal} className="font-display text-lg font-bold text-primary" />
            </div>
            <div className="rounded-lg bg-elevated/70 p-3">
              <p className="text-xs text-muted">Costo total</p>
              <Money value={r.costos} className="font-display text-lg font-bold text-primary" />
            </div>
          </div>

          {evento.notas && <p className="rounded-lg bg-elevated/50 px-3 py-2 text-xs text-muted">{evento.notas}</p>}
        </div>
      )}
    </Drawer>
  );
}
