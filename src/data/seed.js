// Versión de la semilla. Al subirla se vuelve a sembrar localStorage (ver storage.js).
export const SEED_VERSION = 3;

// Fecha base = hoy a medianoche local.
export function hoy() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ISO de hoy + `dias`. Las fixtures usan fechas relativas para que las alertas
// (7/15/30 días) y los estados "vencida" siempre luzcan correctos en la demo,
// sin importar el día en que se presente.
export function fechaRel(dias) {
  const d = hoy();
  d.setDate(d.getDate() + dias);
  return toISO(d);
}
