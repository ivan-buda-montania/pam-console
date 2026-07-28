import { NavLink } from "react-router-dom";

// tabs: [{ to, label, end? }] — enlazadas a rutas anidadas.
export default function Tabs({ tabs, className = "" }) {
  return (
    <div className={`flex gap-1 overflow-x-auto border-b border-hairline ${className}`}>
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-primary"
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
