import { useOutletContext } from "react-router-dom";
import SocialLinks from "../../components/artistas/SocialLinks";
import Icon from "../../components/ui/Icon";

export default function ArtistaGeneralTab() {
  const artista = useOutletContext();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="card">
          <h2 className="mb-2 text-sm font-semibold text-primary">Biografía</h2>
          <p className="text-sm leading-relaxed text-secondary">{artista.bio}</p>
        </section>
        <section className="card">
          <h2 className="mb-3 text-sm font-semibold text-primary">Redes sociales</h2>
          <SocialLinks redes={artista.redes} />
        </section>
      </div>

      <aside className="space-y-4">
        <section className="card">
          <h2 className="mb-3 text-sm font-semibold text-primary">Manager interno</h2>
          <p className="text-sm font-medium text-primary">{artista.manager.nombre}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Icon name="telefono" size={15} /> {artista.manager.telefono}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted">
            <Icon name="mail" size={15} /> {artista.manager.email}
          </p>
        </section>
      </aside>
    </div>
  );
}
