import { desglosePrecioVenta } from "../../utils/calculos";
import Money from "../ui/Money";

export default function PrecioVentaBreakdown({ evento }) {
  const d = desglosePrecioVenta(evento);
  const pv = evento.precioVenta;

  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold text-primary">Desglose de precio de venta</h2>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="text-muted">Precio de venta (base)</span>
          <Money value={d.precioFinal} className="text-primary" />
        </li>
        <li className="flex justify-between">
          <span className="text-muted">IVA ({pv.impuestosPct}%)</span>
          <Money value={d.impuestos} className="text-secondary" />
        </li>
        <li className="flex justify-between border-t border-hairline pt-2">
          <span className="font-semibold text-primary">Total facturado al cliente</span>
          <Money value={d.totalCliente} className="font-display text-base font-bold text-primary" />
        </li>
      </ul>

      <div className="mt-4 rounded-lg bg-elevated/70 px-3 py-2.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted">Fee de management ({pv.feeManagementPct}% del precio de venta)</span>
          <Money value={d.feeManagement} className="font-medium text-accent" />
        </div>
      </div>

      {pv.notas && <p className="mt-3 text-xs text-muted">{pv.notas}</p>}
    </section>
  );
}
