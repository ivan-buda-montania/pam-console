import Icon from "../ui/Icon";
import ThemeToggle from "../theme/ThemeToggle";
import Notificaciones from "./Notificaciones";

export default function Topbar({ onMenu }) {
  return (
    <header className="nav-glass sticky top-0 z-30 flex items-center gap-3 border-b border-hairline px-4 py-3 lg:px-8">
      <button onClick={onMenu} className="btn-subtle btn-sm -ml-2 lg:hidden" aria-label="Abrir menú">
        <Icon name="menu" size={20} />
      </button>
      <div className="ml-auto flex items-center gap-2">
        <span className="chip hidden bg-accent/12 text-accent sm:inline-flex">Prototipo · demo</span>
        <Notificaciones />
        <ThemeToggle />
      </div>
    </header>
  );
}
