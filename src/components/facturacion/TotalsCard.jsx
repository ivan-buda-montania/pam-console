import { totalesFactura } from "../../utils/calculos";
import Money from "../ui/Money";

export default function TotalsCard({ factura }) {
  const t = totalesFactura(factura);
  return (
    <div className="card">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <Money value={t.subtotal} className="text-primary" />
        </div>
        <div className="flex justify-between">
          <span className="text-muted">IVA ({factura.impuestoPct}%)</span>
          <Money value={t.iva} className="text-secondary" />
        </div>
        <div className="flex justify-between border-t border-hairline pt-2">
          <span className="font-semibold text-primary">Total</span>
          <Money value={t.total} className="font-display text-lg font-bold text-primary" />
        </div>
      </div>
    </div>
  );
}
