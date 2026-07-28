export default function Loader({ label = "Cargando…", className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-16 text-sm text-muted ${className}`}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-hairline border-t-accent" />
      {label}
    </div>
  );
}
