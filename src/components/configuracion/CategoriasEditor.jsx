import { useState } from "react";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getCategorias, addCategoria, renameCategoria, deleteCategoria } from "../../services/categoriasService";
import { colorCategoria } from "../../utils/estados";
import Icon from "../ui/Icon";
import ConfirmDialog from "../ui/ConfirmDialog";
import Loader from "../ui/Loader";
import { useToast } from "../ui/toast-context";

export default function CategoriasEditor() {
  const { data: categorias, loading, reload } = useAsyncData(() => getCategorias(), []);
  const toast = useToast();
  const [nueva, setNueva] = useState("");
  const [editId, setEditId] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [confirmar, setConfirmar] = useState(null);

  async function agregar(e) {
    e.preventDefault();
    const res = await addCategoria(nueva);
    if (res.ok) {
      setNueva("");
      toast("Categoría agregada.", "success");
      reload();
    } else toast(res.error, "error");
  }

  function empezarEdicion(c) {
    setEditId(c.id);
    setEditVal(c.nombre);
  }

  async function guardarEdicion(id) {
    const res = await renameCategoria(id, editVal);
    if (res.ok) {
      setEditId(null);
      toast("Categoría actualizada.", "success");
      reload();
    } else toast(res.error, "error");
  }

  async function eliminar(c) {
    const res = await deleteCategoria(c.id);
    if (res.ok) {
      toast("Categoría eliminada.", "success");
      reload();
    } else toast(res.error, "error");
  }

  if (loading) return <Loader />;

  return (
    <section className="card">
      <h2 className="mb-1 text-sm font-semibold text-primary">Categorías de facturación</h2>
      <p className="mb-4 text-xs text-muted">
        Clasifican los conceptos de las facturas. La categoría «Otras» no se puede eliminar (se usa como respaldo).
      </p>

      <div className="space-y-2">
        {categorias.map((c) => {
          const col = colorCategoria(c.color);
          const editando = editId === c.id;
          return (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-elevated/50 px-3 py-2.5">
              <span className={`h-3 w-3 shrink-0 rounded-full ${col.dot}`} />
              {editando ? (
                <input
                  autoFocus
                  className="input flex-1 py-1"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && guardarEdicion(c.id)}
                />
              ) : (
                <span className="flex-1 text-sm text-primary">
                  {c.nombre}
                  {c.esFallback && <span className="ml-2 text-[11px] text-muted">(respaldo)</span>}
                </span>
              )}
              {editando ? (
                <>
                  <button className="btn-subtle btn-sm" onClick={() => guardarEdicion(c.id)} aria-label="Guardar">
                    <Icon name="check" size={16} />
                  </button>
                  <button className="btn-subtle btn-sm" onClick={() => setEditId(null)} aria-label="Cancelar">
                    <Icon name="close" size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-subtle btn-sm" onClick={() => empezarEdicion(c)} title="Renombrar" aria-label="Renombrar">
                    <Icon name="editar" size={16} />
                  </button>
                  <button
                    className="btn-subtle btn-sm text-red-500 disabled:opacity-30 dark:text-red-400"
                    disabled={c.esFallback}
                    onClick={() => setConfirmar(c)}
                    title="Eliminar"
                    aria-label="Eliminar"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={agregar} className="mt-4 flex gap-2">
        <input className="input" placeholder="Nueva categoría…" value={nueva} onChange={(e) => setNueva(e.target.value)} />
        <button type="submit" className="btn-primary btn-sm shrink-0" disabled={!nueva.trim()}>
          <Icon name="plus" size={16} /> Agregar
        </button>
      </form>

      <ConfirmDialog
        open={!!confirmar}
        onClose={() => setConfirmar(null)}
        onConfirm={() => eliminar(confirmar)}
        title="Eliminar categoría"
        message={
          confirmar
            ? `¿Eliminar la categoría «${confirmar.nombre}»? Las líneas de factura que la usaban se mostrarán como «Otras».`
            : ""
        }
        confirmLabel="Eliminar"
      />
    </section>
  );
}
