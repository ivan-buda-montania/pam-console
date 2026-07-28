import Icon from "../ui/Icon";
import { TIPOS_DOCUMENTO } from "../../utils/estados";
import { formatDate } from "../../utils/formato";

export default function DocumentoRow({ doc, onPreview, onDownload }) {
  const meta = TIPOS_DOCUMENTO[doc.tipo] || TIPOS_DOCUMENTO.otro;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-hairline bg-elevated/50 px-3 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tint text-accent">
        <Icon name={meta.icon} size={20} />
      </span>
      <button onClick={() => onPreview(doc)} className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium text-primary hover:text-accent">{doc.nombre}</p>
        <p className="truncate text-xs text-muted">
          {meta.label} · {doc.formato.toUpperCase()} · {doc.tamano} · {formatDate(doc.fechaSubida)}
        </p>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <button onClick={() => onPreview(doc)} className="btn-subtle btn-sm" title="Previsualizar" aria-label="Previsualizar">
          <Icon name="search" size={16} />
        </button>
        <button onClick={() => onDownload(doc)} className="btn-subtle btn-sm" title="Descargar" aria-label="Descargar">
          <Icon name="download" size={16} />
        </button>
      </div>
    </div>
  );
}
