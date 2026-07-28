// Categorías de conceptos de facturación (semilla).
// La "verdad" vive en localStorage (pam.categorias) y es editable desde Configuración.
// "Otras" (cat-otras) es el fallback de reasignación y no se puede eliminar.
export const CATEGORIAS_SEED = [
  { id: "cat-venues", nombre: "Venues", color: "violet" },
  { id: "cat-ingenieria", nombre: "Equipo de Ingeniería / Sonido", color: "sky" },
  { id: "cat-vestuario", nombre: "Vestuario", color: "rose" },
  { id: "cat-catering", nombre: "Catering", color: "emerald" },
  { id: "cat-transporte", nombre: "Transporte", color: "amber" },
  { id: "cat-comida", nombre: "Comida", color: "lime" },
  { id: "cat-otras", nombre: "Otras", color: "slate", esFallback: true },
];

// Orden de la paleta para categorías nuevas creadas por el usuario.
export const PALETA_CATEGORIAS = [
  "violet",
  "sky",
  "emerald",
  "amber",
  "rose",
  "cyan",
  "lime",
  "slate",
];
