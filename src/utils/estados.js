// Código de color unificado de todo el prototipo (claro + oscuro).
// Chips: fondo tenue del color + texto oscuro en claro / claro en oscuro.

// ---- Estados de evento (contrato) ----
export const ESTADOS_EVENTO = {
  confirmado: { label: "Confirmado", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500", cal: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200 border-emerald-500/30" },
  pendiente: { label: "Pendiente", chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "bg-amber-500", cal: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200 border-amber-500/30" },
  cancelado: { label: "Cancelado", chip: "bg-red-500/15 text-red-700 dark:text-red-300", dot: "bg-red-500", cal: "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-200 border-red-500/30" },
  en_revision: { label: "En revisión", chip: "bg-slate-500/15 text-slate-600 dark:text-slate-300", dot: "bg-slate-500", cal: "bg-slate-500/15 text-slate-600 dark:bg-slate-500/25 dark:text-slate-200 border-slate-500/30" },
};

// ---- Estados de factura (semáforo) ----
export const ESTADOS_FACTURA = {
  emitida: { label: "Emitida", chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  pagada: { label: "Pagada", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  vencida: { label: "Vencida", chip: "bg-red-500/15 text-red-700 dark:text-red-300", dot: "bg-red-500" },
};

// ---- Tipos de evento ----
export const TIPOS_EVENTO = {
  concierto: "Concierto",
  festival: "Festival",
  privado: "Evento privado",
  palenque: "Palenque",
  colaboracion: "Colaboración",
};

// ---- Partidas de costo ----
export const PARTIDAS_COSTO = {
  cachet: "Cachet",
  produccion: "Producción",
  rider: "Rider",
  viaticos: "Viáticos",
  comisiones: "Comisiones",
  otros: "Otros",
};

// ---- Tipos de documento ----
export const TIPOS_DOCUMENTO = {
  contrato: { label: "Contrato", icon: "contrato" },
  dossier: { label: "Dossier", icon: "dossier" },
  rider: { label: "Rider", icon: "rider" },
  otro: { label: "Otro", icon: "doc" },
};

// ---- Tipos de talento ----
export const TIPOS_TALENTO = {
  artista: { label: "Artista", chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
  influencer: { label: "Influencer", chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300", dot: "bg-sky-500" },
  ambos: { label: "Ambos", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
};

// ---- Tipos de entidad (aliados) ----
export const TIPOS_ENTIDAD = {
  proveedor: { label: "Proveedor", chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  patrocinador: { label: "Patrocinador", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  alianza: { label: "Alianza", chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
};

// ---- Estados de cuenta (pagos a proveedores / cobros a patrocinadores) ----
export const ESTADOS_CUENTA = {
  pendiente: { label: "Pendiente", chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  pagado: { label: "Pagado", chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  vencido: { label: "Vencido", chip: "bg-red-500/15 text-red-700 dark:text-red-300", dot: "bg-red-500" },
};

export const DIRECCION_CUENTA = {
  pago: "Por pagar",
  cobro: "Por cobrar",
  comision: "Comisión / intercambio",
};

// ---- Paleta de categorías (chip + punto) ----
export const CATEGORIA_COLORS = {
  violet: { chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
  sky: { chip: "bg-sky-500/15 text-sky-700 dark:text-sky-300", dot: "bg-sky-500" },
  emerald: { chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  amber: { chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  rose: { chip: "bg-rose-500/15 text-rose-700 dark:text-rose-300", dot: "bg-rose-500" },
  cyan: { chip: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300", dot: "bg-cyan-500" },
  lime: { chip: "bg-lime-500/15 text-lime-700 dark:text-lime-300", dot: "bg-lime-500" },
  slate: { chip: "bg-slate-500/15 text-slate-600 dark:text-slate-300", dot: "bg-slate-500" },
};

export function colorCategoria(color) {
  return CATEGORIA_COLORS[color] || CATEGORIA_COLORS.slate;
}

// Paletas para gráficas (recharts), validadas para cada superficie (skill dataviz),
// en orden CVD-seguro. Se asignan por posición estable de la categoría en el catálogo.
export const CHART_PALETTE_DARK = [
  "#3987e5", "#008300", "#d55181", "#c98500", "#199e70", "#d95926", "#9085e9", "#e66767",
];
export const CHART_PALETTE_LIGHT = [
  "#2a78d6", "#0a7a34", "#c43d76", "#b07400", "#128a63", "#d4551f", "#4a3aa7", "#cf3b3a",
];

export function chartColor(index, theme = "dark") {
  const paleta = theme === "light" ? CHART_PALETTE_LIGHT : CHART_PALETTE_DARK;
  return paleta[((index % paleta.length) + paleta.length) % paleta.length];
}
