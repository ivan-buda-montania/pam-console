import { useParams, Outlet, Link } from "react-router-dom";
import { useAsyncData } from "../hooks/useAsyncData";
import { getArtista } from "../services/artistasService";
import Avatar from "../components/ui/Avatar";
import Tabs from "../components/ui/Tabs";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Icon from "../components/ui/Icon";
import { TIPOS_TALENTO } from "../utils/estados";

export default function ArtistaDetailPage() {
  const { artistaId } = useParams();
  const { data: artista, loading } = useAsyncData(() => getArtista(artistaId), [artistaId]);

  if (loading) return <Loader />;
  if (!artista)
    return <EmptyState icon="artistas" title="Talento no encontrado" message="El perfil solicitado no existe." />;

  const tipoCfg = TIPOS_TALENTO[artista.tipo] || TIPOS_TALENTO.artista;
  const base = `/artistas/${artista.id}`;
  const tabs = [
    { to: `${base}/general`, label: "General" },
    { to: `${base}/documentos`, label: "Documentos" },
    { to: `${base}/eventos`, label: "Eventos" },
    { to: `${base}/precios`, label: "Precios" },
  ];

  return (
    <div className="animate-fade-up">
      <Link to="/artistas" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-primary">
        <Icon name="chevron-left" size={16} /> Talento
      </Link>

      <div className="card mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar nombre={artista.nombreArtistico} color={artista.color} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-primary">{artista.nombreArtistico}</h1>
            <span className={`chip ${tipoCfg.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tipoCfg.dot}`} />
              {tipoCfg.label}
            </span>
          </div>
          <p className="text-sm text-muted">
            {artista.nombreReal} · {artista.genero}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Icon name="ubicacion" size={13} /> {artista.ciudadBase}
          </p>
        </div>
      </div>

      <Tabs tabs={tabs} className="mb-6" />
      <Outlet context={artista} />
    </div>
  );
}
