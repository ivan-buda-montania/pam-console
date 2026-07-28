import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DocumentoRow from "../../components/artistas/DocumentoRow";
import DocPreviewModal from "../../components/artistas/DocPreviewModal";
import Icon from "../../components/ui/Icon";
import { useToast } from "../../components/ui/toast-context";

export default function ArtistaDocumentosTab() {
  const artista = useOutletContext();
  const toast = useToast();
  const [preview, setPreview] = useState(null);

  function descargar(doc) {
    toast(`Descarga simulada: ${doc.nombre}`);
  }

  return (
    <section className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primary">Documentos ({artista.documentos.length})</h2>
        <button
          className="btn-ghost btn-sm"
          onClick={() => toast("La carga de archivos estará disponible en la versión final.")}
        >
          <Icon name="plus" size={16} /> Subir
        </button>
      </div>
      <div className="space-y-2">
        {artista.documentos.map((d) => (
          <DocumentoRow key={d.id} doc={d} onPreview={setPreview} onDownload={descargar} />
        ))}
      </div>
      <DocPreviewModal doc={preview} open={!!preview} onClose={() => setPreview(null)} onDownload={descargar} />
    </section>
  );
}
