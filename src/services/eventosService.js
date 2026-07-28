import { EVENTOS } from "../data/eventos";
import { clone, delay } from "./storage";
import { diasHasta, anioDe } from "../utils/fechas";

function aplicaFiltros(ev, f) {
  if (f.artistaId && ev.artistaId !== f.artistaId) return false;
  if (f.clienteId && ev.clienteId !== f.clienteId) return false;
  if (f.estado && ev.estado !== f.estado) return false;
  if (f.tipo && ev.tipo !== f.tipo) return false;
  if (f.anio && anioDe(ev.fecha) !== Number(f.anio)) return false;
  if (f.desde && ev.fecha < f.desde) return false;
  if (f.hasta && ev.fecha > f.hasta) return false;
  return true;
}

export async function getEventos(filtros = {}) {
  await delay();
  const lista = EVENTOS.filter((ev) => aplicaFiltros(ev, filtros)).sort((a, b) =>
    a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0
  );
  return clone(lista);
}

export async function getEvento(id) {
  await delay();
  const ev = EVENTOS.find((x) => x.id === id);
  return ev ? clone(ev) : null;
}

// Eventos futuros dentro de `maxDias`, no cancelados, anotados con urgencia (7/15/30).
export async function getEventosProximos(maxDias = 30) {
  await delay();
  const proximos = EVENTOS.filter((ev) => {
    if (ev.estado === "cancelado") return false;
    const d = diasHasta(ev.fecha);
    return d >= 0 && d <= maxDias;
  })
    .map((ev) => {
      const dias = diasHasta(ev.fecha);
      const urgencia = dias <= 7 ? "7" : dias <= 15 ? "15" : "30";
      return { ...clone(ev), diasRestantes: dias, urgencia };
    })
    .sort((a, b) => a.diasRestantes - b.diasRestantes);
  return proximos;
}
