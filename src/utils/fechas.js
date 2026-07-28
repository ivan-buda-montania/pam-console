export const NOMBRES_MES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Encabezados de columna del calendario (semana inicia en lunes).
export const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function hoyISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return toISO(d);
}

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISO(iso) {
  return new Date(iso + "T00:00:00");
}

export function addDays(iso, dias) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + dias);
  return toISO(d);
}

export function isSameDay(isoA, isoB) {
  return isoA === isoB;
}

// Días desde hoy hasta `iso` (negativo si ya pasó).
export function diasHasta(iso) {
  const hoy = parseISO(hoyISO());
  const objetivo = parseISO(iso);
  return Math.round((objetivo - hoy) / 86400000);
}

export function anioDe(iso) {
  return Number(iso.slice(0, 4));
}

// Rejilla de 6 semanas (42 celdas) para un mes. Semana inicia en lunes.
// Devuelve [{ iso, dia, mesActual }].
export function buildMonthGrid(anio, mes) {
  const primero = new Date(anio, mes, 1);
  // getDay(): 0=domingo..6=sábado. Convertir a lunes=0..domingo=6.
  const offset = (primero.getDay() + 6) % 7;
  const inicio = new Date(anio, mes, 1 - offset);
  const celdas = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(inicio);
    d.setDate(inicio.getDate() + i);
    celdas.push({ iso: toISO(d), dia: d.getDate(), mesActual: d.getMonth() === mes });
  }
  return celdas;
}
