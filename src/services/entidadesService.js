import { ENTIDADES } from "../data/entidades";
import { clone, delay } from "./storage";

export async function getEntidades(filtros = {}) {
  await delay();
  let lista = ENTIDADES;
  if (filtros.tipo) lista = lista.filter((e) => e.tipo === filtros.tipo);
  return clone(lista);
}

export async function getEntidad(id) {
  await delay();
  const e = ENTIDADES.find((x) => x.id === id);
  return e ? clone(e) : null;
}

// Totales de cuentas por pagar (proveedores) y por cobrar (patrocinadores).
export async function getResumenCuentas() {
  await delay();
  let porPagar = 0;
  let porCobrar = 0;
  let vencidoPagar = 0;
  let vencidoCobrar = 0;
  for (const e of ENTIDADES) {
    for (const c of e.cuentas || []) {
      if (c.estado === "pagado") continue;
      if (c.direccion === "pago") {
        porPagar += c.monto;
        if (c.estado === "vencido") vencidoPagar += c.monto;
      } else if (c.direccion === "cobro") {
        porCobrar += c.monto;
        if (c.estado === "vencido") vencidoCobrar += c.monto;
      }
    }
  }
  return { porPagar, porCobrar, vencidoPagar, vencidoCobrar };
}
