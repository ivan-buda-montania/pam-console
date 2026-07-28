import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import { formatMoney } from "../../utils/formato";
import { TIPOS_TALENTO } from "../../utils/estados";

export default function ArtistCard({ artista }) {
  const tipo = TIPOS_TALENTO[artista.tipo] || TIPOS_TALENTO.artista;
  const tieneConcierto = artista.precios.conciertoBase > 0;
  const desde = tieneConcierto ? artista.precios.conciertoBase : artista.precios.colaboracion;
  const desdeLabel = tieneConcierto ? "Desde" : "Colab. desde";

  return (
    <Link to={`/artistas/${artista.id}`} className="card card-hover flex flex-col">
      <div className="flex items-center gap-4">
        <Avatar nombre={artista.nombreArtistico} color={artista.color} size="lg" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold text-primary">{artista.nombreArtistico}</h3>
          <p className="truncate text-sm text-muted">{artista.genero}</p>
        </div>
      </div>
      <div className="mt-3">
        <span className={`chip ${tipo.chip}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${tipo.dot}`} />
          {tipo.label}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted">{artista.bio}</p>
      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Icon name="ubicacion" size={14} /> {artista.ciudadBase}
        </span>
        <span className="text-accent">{desdeLabel} {formatMoney(desde)}</span>
      </div>
    </Link>
  );
}
