import { useState } from "react";
import { useAsyncData } from "../../hooks/useAsyncData";
import { getMensajes, addMensaje } from "../../services/mensajesService";
import { formatDate, iniciales } from "../../utils/formato";
import Icon from "../ui/Icon";
import Loader from "../ui/Loader";
import { useToast } from "../ui/toast-context";

export default function EventoChat({ eventoId }) {
  const { data: mensajes, loading, reload } = useAsyncData(() => getMensajes(eventoId), [eventoId]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const toast = useToast();

  async function enviar(e) {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    setEnviando(true);
    await addMensaje(eventoId, { texto: t });
    setTexto("");
    setEnviando(false);
    reload();
  }

  return (
    <section className="card">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
        <Icon name="mail" size={15} /> Comunicación del evento
      </h2>

      {loading ? (
        <Loader label="Cargando mensajes…" />
      ) : (
        <div className="space-y-3">
          {mensajes.length === 0 && <p className="text-sm text-muted">Sin mensajes todavía. Inicia la conversación.</p>}
          {mensajes.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.propio ? "flex-row-reverse" : ""}`}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {iniciales(m.autor)}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.propio ? "bg-accent text-white" : "bg-tint text-primary"}`}>
                <div className="mb-0.5 flex items-center gap-2 text-[11px] opacity-80">
                  <span className="font-medium">{m.autor}</span>
                  <span>{formatDate(m.fecha)}</span>
                </div>
                <p className="text-sm">{m.texto}</p>
                {m.adjunto && (
                  <div className={`mt-1.5 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs ${m.propio ? "bg-white/20" : "bg-app/70"}`}>
                    <Icon name="adjuntar" size={13} /> {m.adjunto.nombre}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={enviar} className="mt-4 flex items-center gap-2">
        <button
          type="button"
          className="btn-subtle btn-sm shrink-0"
          title="Adjuntar documento"
          aria-label="Adjuntar documento"
          onClick={() => toast("Adjuntar archivos estará disponible en la versión final.")}
        >
          <Icon name="adjuntar" size={16} />
        </button>
        <input className="input" placeholder="Escribe un mensaje…" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button type="submit" className="btn-primary btn-sm shrink-0" disabled={enviando || !texto.trim()} aria-label="Enviar">
          <Icon name="enviar" size={16} />
        </button>
      </form>
    </section>
  );
}
