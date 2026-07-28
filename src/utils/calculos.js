// Cálculos derivados. Ningún valor derivado se almacena en las fixtures.

// ---- Eventos: costos, precio de venta, rentabilidad ----
export function totalCostos(evento) {
  return (evento?.costos || []).reduce((s, c) => s + (c.monto || 0), 0);
}

export function desglosePrecioVenta(evento) {
  const pv = evento?.precioVenta || {};
  const precioFinal = pv.precioFinal || 0; // precio de venta base (sin IVA)
  const impuestos = Math.round((precioFinal * (pv.impuestosPct || 0)) / 100);
  const feeManagement = Math.round((precioFinal * (pv.feeManagementPct || 0)) / 100);
  const totalCliente = precioFinal + impuestos; // total facturado al contratante
  return { precioFinal, impuestos, feeManagement, totalCliente };
}

// Rentabilidad para el management: precio de venta vs. costos de producción del show.
// utilidad = precio de venta (base) - costo total (incluye cachet, producción, viáticos…).
export function rentabilidad(evento) {
  const precioFinal = evento?.precioVenta?.precioFinal || 0;
  const costos = totalCostos(evento);
  const utilidad = precioFinal - costos;
  const margenPct = precioFinal > 0 ? (utilidad / precioFinal) * 100 : 0;
  return { precioFinal, costos, utilidad, margenPct };
}

// ---- Facturas: subtotal, IVA, total ----
export function importeLinea(linea) {
  return (linea.cantidad || 0) * (linea.precioUnitario || 0);
}

export function totalesFactura(factura) {
  const subtotal = (factura?.lineas || []).reduce((s, l) => s + importeLinea(l), 0);
  const iva = Math.round((subtotal * (factura?.impuestoPct || 0)) / 100);
  const total = subtotal + iva;
  return { subtotal, iva, total };
}

// ---- Resumen por categoría (sobre subtotales de líneas) ----
// facturas: lista ya filtrada. categorias: catálogo actual.
export function resumenPorCategoria(facturas, categorias) {
  const fallback = categorias.find((c) => c.esFallback) || categorias[categorias.length - 1];
  const porId = new Map(categorias.map((c) => [c.id, c]));
  const acumulado = new Map();

  for (const f of facturas) {
    for (const l of f.lineas || []) {
      const cat = porId.get(l.categoriaId) || fallback;
      const prev = acumulado.get(cat.id) || { categoria: cat, total: 0, numLineas: 0 };
      prev.total += importeLinea(l);
      prev.numLineas += 1;
      acumulado.set(cat.id, prev);
    }
  }

  const filas = [...acumulado.values()].sort((a, b) => b.total - a.total);
  const granTotal = filas.reduce((s, r) => s + r.total, 0);
  return filas.map((r) => ({
    ...r,
    porcentaje: granTotal > 0 ? (r.total / granTotal) * 100 : 0,
  }));
}
