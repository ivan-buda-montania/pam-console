import Icon from "../ui/Icon";
import { useTheme } from "./theme-context";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const oscuro = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`btn-ghost btn-sm !px-2 ${className}`}
      title={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <Icon name={oscuro ? "sol" : "luna"} size={17} />
    </button>
  );
}
