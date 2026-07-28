import { ARTISTAS } from "../data/artistas";
import { EVENTOS } from "../data/eventos";
import { FACTURAS } from "../data/facturas";
import { clone, delay, loadKey, KEYS } from "./storage";
import { totalesFactura } from "../utils/calculos";

export async function getArtistas() {
  await delay();
  return clone(ARTISTAS);
}

export async function getArtista(id) {
  await delay();
  const a = ARTISTAS.find((x) => x.id === id);
  return a ? clone(a) : null;
}

// Talento anotado con métricas para la vista de tabla.
export async function getTalentoConMetricas() {
  await delay();
  const ov = loadKey(KEYS.facturasOverrides, {});
  const facturas = FACTURAS.map((f) => (ov[f.id] ? { ...f, ...ov[f.id] } : f));
  return ARTISTAS.map((a) => {
    const eventos = EVENTOS.filter((e) => e.artistaId === a.id);
    const ingresosTotales = facturas
      .filter((f) => f.artistaId === a.id)
      .reduce((s, f) => s + totalesFactura(f).total, 0);
    const ultimo = [...eventos].sort((x, y) => (x.fecha < y.fecha ? 1 : -1))[0] || null;
    return {
      ...clone(a),
      numEventos: eventos.length,
      ingresosTotales,
      ultimoContratoEstado: ultimo ? ultimo.estado : null,
      ultimoEventoFecha: ultimo ? ultimo.fecha : null,
    };
  });
}
