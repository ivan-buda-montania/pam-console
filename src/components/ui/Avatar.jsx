import { iniciales } from "../../utils/formato";

// Avatar de iniciales con gradiente determinista por color de token (sin imágenes).
const GRAD = {
  amber: "from-amber-500/25 to-orange-500/10 text-amber-700 ring-amber-500/30 dark:text-amber-200",
  rose: "from-rose-500/25 to-pink-500/10 text-rose-700 ring-rose-500/30 dark:text-rose-200",
  emerald: "from-emerald-500/25 to-teal-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-200",
  cyan: "from-cyan-500/25 to-sky-500/10 text-cyan-700 ring-cyan-500/30 dark:text-cyan-200",
  violet: "from-violet-500/25 to-fuchsia-500/10 text-violet-700 ring-violet-500/30 dark:text-violet-200",
  lime: "from-lime-500/25 to-green-500/10 text-lime-700 ring-lime-500/30 dark:text-lime-200",
  slate: "from-slate-500/25 to-slate-600/10 text-slate-700 ring-slate-500/30 dark:text-slate-200",
};

const SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export default function Avatar({ nombre, color = "slate", size = "md", className = "" }) {
  const g = GRAD[color] || GRAD.slate;
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-semibold ring-1 ${g} ${SIZES[size]} ${className}`}
    >
      {iniciales(nombre)}
    </div>
  );
}
