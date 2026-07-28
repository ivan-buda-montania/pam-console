import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-xl font-semibold text-primary">Página no encontrada</h1>
      <p className="mt-2 text-sm text-muted">La ruta que buscas no existe en la consola.</p>
      <Link to="/" className="btn-primary mt-6">
        <Icon name="inicio" size={16} /> Volver al inicio
      </Link>
    </div>
  );
}
