// Formato de moneda MXN. Centralizado: cambiar aquí si el cliente usa otra moneda.
const money0 = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const money2 = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(n, decimales = false) {
  const v = Number(n) || 0;
  return decimales ? money2.format(v) : money0.format(v);
}

export function formatPct(n, decimales = 0) {
  const v = Number(n) || 0;
  return `${v.toFixed(decimales)}%`;
}

// "2026-08-02" -> "2 ago 2026"
export function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

// "2026-08-02" -> "domingo, 2 de agosto de 2026"
export function formatDateLong(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export function iniciales(nombre = "") {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
