import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";
import { logout } from "../../services/authService";

const NAV = [
  { to: "/", label: "Inicio", icon: "inicio", end: true },
  { to: "/artistas", label: "Talento", icon: "artistas" },
  { to: "/agenda", label: "Agenda", icon: "agenda" },
  { to: "/facturacion", label: "Finanzas", icon: "facturacion" },
  { to: "/aliados", label: "Aliados", icon: "maletin" },
  { to: "/configuracion", label: "Configuración", icon: "configuracion" },
];

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate();

  function salir() {
    logout();
    onNavigate?.();
    navigate("/acceso", { replace: true });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-accent/40 bg-accent/10 font-display font-bold text-accent">
          PA
        </div>
        <div>
          <p className="font-display text-sm font-bold leading-tight text-primary">Consola PAM</p>
          <p className="text-[11px] text-muted">Poncho Arocha Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-secondary hover:bg-tint hover:text-primary"
              }`
            }
          >
            <Icon name={n.icon} size={19} />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4">
        <button
          onClick={salir}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-tint hover:text-primary"
        >
          <Icon name="logout" size={19} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}
