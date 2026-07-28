import { Link } from "react-router-dom";
import Drawer from "../ui/Drawer";
import StatusBadge from "../ui/StatusBadge";
import Money from "../ui/Money";
import Icon from "../ui/Icon";
import { TIPOS_ENTIDAD, DIRECCION_CUENTA } from "../../utils/estados";
import { formatDate } from "../../utils/formato";

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

export default function EntidadDrawer({ entidad, open, onClose }) {
  const tipo = entidad ? TIPOS_ENTIDAD[entidad.tipo] || TIPOS_ENTIDAD.proveedor : null;

  return (
    <Drawer open={open} onClose={onClose} title={entidad ? entidad.razonSocial : "Aliado"}>
      {entidad && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`chip ${tipo.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tipo.dot}`} />
              {tipo.label}
            </span>
            <span className="chip bg-tint text-secondary">{entidad.rubro}</span>
          </div>

          <div className="space-y-2">
            <Fila icon="usuario">{entidad.contacto.nombre}</Fila>
            <Fila icon="telefono">{entidad.contacto.telefono}</Fila>
            <Fila icon="mail">{entidad.contacto.email}</Fila>
            <Fila icon="ubicacion">{entidad.ciudad}</Fila>
          </div>

          <div className="rounded-lg bg-tint/60 px-3 py-2.5">
            <p className="mb-1 text-xs font-medium text-muted">Condiciones acordadas</p>
            <p className="text-sm text-secondary">{entidad.condiciones}</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-primary">
              Cuentas ({entidad.cuentas.length})
            </h4>
            <div className="space-y-2">
              {entidad.cuentas.map((c) => (
                <div key={c.id} className="rounded-lg border border-hairline bg-elevated/50 px-3 py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-primary">{c.concepto}</p>
                    <Money value={c.monto} className="shrink-0 text-sm font-semibold text-primary" />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <StatusBadge tipo="cuenta" estado={c.estado} />
                    <span>{DIRECCION_CUENTA[c.direccion]}</span>
                    <span>· {formatDate(c.fecha)}</span>
                    {c.eventoId && (
                      <Link to={`/eventos/${c.eventoId}`} className="text-accent hover:text-accent-hover" onClick={onClose}>
                        Ver evento
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
