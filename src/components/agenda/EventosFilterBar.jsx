import FilterBar from "../ui/FilterBar";
import SelectFilter from "../ui/SelectFilter";
import DateRangeFilter from "../ui/DateRangeFilter";
import { ESTADOS_EVENTO, TIPOS_EVENTO } from "../../utils/estados";

export default function EventosFilterBar({ filtros, setFiltros, artistas, onClear, activo }) {
  const set = (k, v) => setFiltros((f) => ({ ...f, [k]: v }));

  return (
    <FilterBar onClear={onClear} activo={activo}>
      <SelectFilter
        label="Artista"
        value={filtros.artistaId}
        onChange={(v) => set("artistaId", v)}
        allLabel="Todos"
        options={artistas.map((a) => ({ value: a.id, label: a.nombreArtistico }))}
        className="w-48"
      />
      <SelectFilter
        label="Estado"
        value={filtros.estado}
        onChange={(v) => set("estado", v)}
        allLabel="Todos"
        options={Object.entries(ESTADOS_EVENTO).map(([v, c]) => ({ value: v, label: c.label }))}
        className="w-40"
      />
      <SelectFilter
        label="Tipo"
        value={filtros.tipo}
        onChange={(v) => set("tipo", v)}
        allLabel="Todos"
        options={Object.entries(TIPOS_EVENTO).map(([v, label]) => ({ value: v, label }))}
        className="w-44"
      />
      <DateRangeFilter
        label="Rango de fechas"
        desde={filtros.desde}
        hasta={filtros.hasta}
        onChange={({ desde, hasta }) => setFiltros((f) => ({ ...f, desde, hasta }))}
      />
    </FilterBar>
  );
}
