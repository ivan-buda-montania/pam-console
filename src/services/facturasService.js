import { FACTURAS } from "../data/facturas";
import { KEYS, loadKey, saveKey, clone, delay } from "./storage";
import { getCategorias } from "./categoriasService";
import { resumenPorCategoria as calcResumen } from "../utils/calculos";

// Aplica los overrides de estado (localStorage) sobre las fixtures.
function conOverrides() {
  const overrides = loadKey(KEYS.facturasOverrides, {});
  return FACTURAS.map((f) => {
    const ov = overrides[f.id];
    return ov ? { ...f, ...ov } : f;
  });
}

function aplicaFiltros(f, filtros) {
  if (filtros.estado && f.estado !== filtros.estado) return false;
  if (filtros.clienteId && f.clienteId !== filtros.clienteId) return false;
  if (filtros.artistaId && f.artistaId !== filtros.artistaId) return false;
  if (filtros.emisionDesde && f.fechaEmision < filtros.emisionDesde) return false;
  if (filtros.emisionHasta && f.fechaEmision > filtros.emisionHasta) return false;
  if (filtros.vencDesde && f.fechaVencimiento < filtros.vencDesde) return false;
  if (filtros.vencHasta && f.fechaVencimiento > filtros.vencHasta) return false;
  if (filtros.categoriaIds && filtros.categoriaIds.length > 0) {
    const tiene = (f.lineas || []).some((l) => filtros.categoriaIds.includes(l.categoriaId));
    if (!tiene) return false;
  }
  return true;
}

export async function getFacturas(filtros = {}) {
  await delay();
  const lista = conOverrides()
    .filter((f) => aplicaFiltros(f, filtros))
    .sort((a, b) => (a.fechaEmision < b.fechaEmision ? 1 : a.fechaEmision > b.fechaEmision ? -1 : 0));
  return clone(lista);
}

export async function getFactura(id) {
  await delay();
  const f = conOverrides().find((x) => x.id === id);
  return f ? clone(f) : null;
}

export async function getFacturaPorEvento(eventoId) {
  await delay();
  const f = conOverrides().find((x) => x.eventoId === eventoId);
  return f ? clone(f) : null;
}

export async function updateEstadoFactura(id, estado) {
  await delay();
  const overrides = loadKey(KEYS.facturasOverrides, {});
  overrides[id] = { ...(overrides[id] || {}), estado };
  saveKey(KEYS.facturasOverrides, overrides);
  return getFactura(id);
}

// Resumen de ingresos por categoría en un periodo (sobre subtotales de líneas).
export async function getResumenPorCategoria(filtros = {}) {
  await delay();
  const categorias = await getCategorias();
  const facturas = conOverrides().filter((f) => {
    if (filtros.estado && f.estado !== filtros.estado) return false;
    if (filtros.artistaId && f.artistaId !== filtros.artistaId) return false;
    if (filtros.desde && f.fechaEmision < filtros.desde) return false;
    if (filtros.hasta && f.fechaEmision > filtros.hasta) return false;
    return true;
  });
  const filas = calcResumen(facturas, categorias);
  const granTotal = filas.reduce((s, r) => s + r.total, 0);
  return { filas, granTotal, numFacturas: facturas.length };
}
