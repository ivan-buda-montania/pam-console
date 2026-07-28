import FilterBar from "../ui/FilterBar";
import SelectFilter from "../ui/SelectFilter";
import MultiSelectFilter from "../ui/MultiSelectFilter";
import DateRangeFilter from "../ui/DateRangeFilter";
import { ESTADOS_FACTURA } from "../../utils/estados";

export default function FacturasFilterBar({ filtros, setFiltros, artistas, clientes, categorias, onClear, activo }) {
  const set = (k, v) => setFiltros((f) => ({ ...f, [k]: v }));

  return (
    <FilterBar onClear={onClear} activo={activo}>
      <SelectFilter
        label="Estado"
        value={filtros.estado}
        onChange={(v) => set("estado", v)}
        allLabel="Todos"
        options={Object.entries(ESTADOS_FACTURA).map(([v, c]) => ({ value: v, label: c.label }))}
        className="w-36"
      />
      <SelectFilter
        label="Cliente"
        value={filtros.clienteId}
        onChange={(v) => set("clienteId", v)}
        allLabel="Todos"
        options={clientes.map((c) => ({ value: c.id, label: c.nombre }))}
        className="w-48"
      />
      <SelectFilter
        label="Artista"
        value={filtros.artistaId}
        onChange={(v) => set("artistaId", v)}
        allLabel="Todos"
        options={artistas.map((a) => ({ value: a.id, label: a.nombreArtistico }))}
        className="w-44"
      />
      <MultiSelectFilter
        label="Categorías"
        options={categorias.map((c) => ({ value: c.id, label: c.nombre }))}
        selected={filtros.categoriaIds}
        onChange={(v) => set("categoriaIds", v)}
        className="w-52"
      />
      <DateRangeFilter
        label="Emisión"
        desde={filtros.emisionDesde}
        hasta={filtros.emisionHasta}
        onChange={({ desde, hasta }) => setFiltros((f) => ({ ...f, emisionDesde: desde, emisionHasta: hasta }))}
      />
      <DateRangeFilter
        label="Vencimiento"
        desde={filtros.vencDesde}
        hasta={filtros.vencHasta}
        onChange={({ desde, hasta }) => setFiltros((f) => ({ ...f, vencDesde: desde, vencHasta: hasta }))}
      />
    </FilterBar>
  );
}
