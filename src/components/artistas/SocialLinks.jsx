import Icon from "../ui/Icon";

const REDES = [
  { key: "instagram", icon: "instagram", label: "Instagram" },
  { key: "tiktok", icon: "tiktok", label: "TikTok" },
  { key: "youtube", icon: "youtube", label: "YouTube" },
  { key: "spotify", icon: "spotify", label: "Spotify" },
];

export default function SocialLinks({ redes = {}, size = 18 }) {
  const activos = REDES.filter((r) => redes[r.key]);
  if (activos.length === 0) return <span className="text-sm text-muted">Sin redes registradas</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {activos.map((r) => (
        <a
          key={r.key}
          href={redes[r.key]}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-hairline bg-tint px-3 py-1.5 text-sm text-secondary transition hover:border-accent/30 hover:text-primary"
        >
          <Icon name={r.icon} size={size} /> {r.label}
        </a>
      ))}
    </div>
  );
}
