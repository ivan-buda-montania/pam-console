import { FACTURAS } from "../data/facturas";
import { ARTISTAS } from "../data/artistas";
import { EVENTOS } from "../data/eventos";
import { KEYS, loadKey, delay } from "./storage";
import { totalesFactura } from "../utils/calculos";
import { NOMBRES_MES } from "../utils/fechas";

function facturasConOverrides() {
  const ov = loadKey(KEYS.facturasOverrides, {});
  return FACTURAS.map((f) => (ov[f.id] ? { ...f, ...ov[f.id] } : f));
}

function enPeriodo(iso, desde, hasta) {
  if (desde && iso < desde) return false;
  if (hasta && iso > hasta) return false;
  return true;
}

// Facturado por talento en el periodo (incluye a todos, con 0 si no facturó).
export async function getIngresosPorTalento(filtros = {}) {
  await delay();
  const facturas = facturasConOverrides().filter((f) => enPeriodo(f.fechaEmision, filtros.desde, filtros.hasta));
  const acum = new Map(ARTISTAS.map((a) => [a.id, 0]));
  for (const f of facturas) acum.set(f.artistaId, (acum.get(f.artistaId) || 0) + totalesFactura(f).total);
  return ARTISTAS.map((a) => ({
    artistaId: a.id,
    nombre: a.nombreArtistico,
    color: a.color,
    total: acum.get(a.id) || 0,
  })).sort((x, y) => y.total - x.total);
}

export async function getArtistaMasFacturado(filtros = {}) {
  const ranking = await getIngresosPorTalento(filtros);
  return ranking.find((r) => r.total > 0) || null;
}

// Facturado total por mes (últimos `meses` meses, incluyendo el actual).
export async function getHistoricoMensual(meses = 6) {
  await delay();
  const facturas = facturasConOverrides();
  const hoy = new Date();
  const buckets = [];
  for (let i = meses - 1; i >= 0; i--) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    buckets.push({
      clave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: NOMBRES_MES[d.getMonth()].slice(0, 3),
      total: 0,
    });
  }
  const idx = new Map(buckets.map((b) => [b.clave, b]));
  for (const f of facturas) {
    const b = idx.get((f.fechaEmision || "").slice(0, 7));
    if (b) b.total += totalesFactura(f).total;
  }
  return buckets;
}

export async function getContadores() {
  await delay();
  return { numTalentos: ARTISTAS.length, numEventos: EVENTOS.length, numFacturas: FACTURAS.length };
}
