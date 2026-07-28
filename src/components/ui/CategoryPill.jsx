import { colorCategoria } from "../../utils/estados";

export default function CategoryPill({ categoria, className = "" }) {
  if (!categoria) return null;
  const c = colorCategoria(categoria.color);
  return (
    <span className={`chip ${c.chip} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {categoria.nombre}
    </span>
  );
}
