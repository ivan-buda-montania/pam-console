import { PARTIDAS_COSTO } from "../../utils/estados";
import { totalCostos } from "../../utils/calculos";
import Money from "../ui/Money";

export default function CostosBreakdown({ evento }) {
  const total = totalCostos(evento);
  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold text-primary">Desglose de costos del show</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-hairline">
            {evento.costos.map((c) => (
              <tr key={c.id}>
                <td className="py-2.5 pr-2">
                  <span className="chip bg-tint text-secondary">{PARTIDAS_COSTO[c.partida] || c.partida}</span>
                </td>
                <td className="py-2.5 text-muted">{c.concepto}</td>
                <td className="py-2.5 text-right">
                  <Money value={c.monto} className="text-primary" />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-hairline">
              <td colSpan={2} className="pt-3 text-sm font-semibold text-primary">
                Costo total
              </td>
              <td className="pt-3 text-right">
                <Money value={total} className="font-display text-lg font-bold text-primary" />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
