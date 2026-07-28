import { useOutletContext } from "react-router-dom";
import PrecioCard from "../../components/artistas/PrecioCard";
import Money from "../../components/ui/Money";
import Icon from "../../components/ui/Icon";

export default function ArtistaPreciosTab() {
  const artista = useOutletContext();
  const p = artista.precios;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <PrecioCard titulo="Concierto (base)" precio={p.conciertoBase} descripcion="Tarifa base de presentación" />
        <PrecioCard titulo="Colaboración" precio={p.colaboracion} descripcion="Feat / participación especial" />
      </div>

      <section className="card">
        <h2 className="mb-3 text-sm font-semibold text-primary">Precios extras</h2>
        <ul className="divide-y divide-hairline">
          {p.extras.map((e) => (
            <li key={e.id} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-secondary">{e.concepto}</span>
              <Money value={e.precio} className="text-sm font-semibold text-primary" />
            </li>
          ))}
        </ul>
      </section>

      <section className="card border-accent/20 bg-accent/5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
          <Icon name="editar" size={15} /> Notas internas de negociación
        </h2>
        <p className="text-sm leading-relaxed text-secondary">{p.notasNegociacion}</p>
      </section>
    </div>
  );
}
