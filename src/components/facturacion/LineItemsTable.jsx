import CategoryPill from "../ui/CategoryPill";
import Money from "../ui/Money";
import { importeLinea } from "../../utils/calculos";

export default function LineItemsTable({ lineas, categoriaPorId, fallback }) {
  return (
    <div className="glass-panel overflow-x-auto rounded-xl">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-hairline bg-tint/60 text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">Descripción</th>
            <th className="px-4 py-3 font-medium">Categoría</th>
            <th className="px-4 py-3 text-right font-medium">Cant.</th>
            <th className="px-4 py-3 text-right font-medium">P. unitario</th>
            <th className="px-4 py-3 text-right font-medium">Importe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {lineas.map((l) => {
            const cat = categoriaPorId[l.categoriaId] || fallback;
            return (
              <tr key={l.id}>
                <td className="px-4 py-3 text-primary">{l.descripcion}</td>
                <td className="px-4 py-3">
                  <CategoryPill categoria={cat} />
                </td>
                <td className="px-4 py-3 text-right text-secondary num">{l.cantidad}</td>
                <td className="px-4 py-3 text-right">
                  <Money value={l.precioUnitario} className="text-secondary" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Money value={importeLinea(l)} className="font-medium text-primary" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
