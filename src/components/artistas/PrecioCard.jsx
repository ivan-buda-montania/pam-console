import Money from "../ui/Money";

export default function PrecioCard({ titulo, precio, descripcion }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-muted">{titulo}</p>
      <p className="mt-2 font-display text-2xl font-bold text-primary">
        <Money value={precio} />
      </p>
      {descripcion && <p className="mt-1 text-xs text-muted">{descripcion}</p>}
    </div>
  );
}
