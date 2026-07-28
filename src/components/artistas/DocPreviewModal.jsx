import Modal from "../ui/Modal";
import Icon from "../ui/Icon";

export default function DocPreviewModal({ doc, open, onClose, onDownload }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={doc?.nombre}
      size="lg"
      footer={
        <>
          <button className="btn-ghost btn-sm" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn-primary btn-sm" onClick={() => onDownload?.(doc)}>
            <Icon name="download" size={16} /> Descargar
          </button>
        </>
      }
    >
      {doc && (
        <div className="rounded-lg border border-hairline bg-tint p-6">
          <div className="mx-auto max-w-md space-y-3">
            <div className="flex items-center gap-3 border-b border-hairline pb-3">
              <span className="text-accent">
                <Icon name="doc" size={28} />
              </span>
              <div>
                <p className="text-sm font-medium text-primary">{doc.nombre}</p>
                <p className="text-xs text-muted">Vista previa de demostración</p>
              </div>
            </div>
            {[85, 78, 71, 64].map((w, i) => (
              <div key={i} className="h-2.5 rounded bg-tint" style={{ width: `${w}%` }} />
            ))}
            <div className="h-24 rounded bg-tint" />
            {[80, 70, 60].map((w, i) => (
              <div key={i} className="h-2.5 rounded bg-tint" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            La previsualización de archivos reales estará disponible en la versión final del sistema.
          </p>
        </div>
      )}
    </Modal>
  );
}
