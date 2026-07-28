import { ESTADOS_EVENTO } from "../../utils/estados";

export default function EventChip({ evento, onClick }) {
  const c = ESTADOS_EVENTO[evento.estado] || ESTADOS_EVENTO.en_revision;
  return (
    <button
      onClick={onClick}
      title={`${evento.hora} · ${evento.nombre}`}
      className={`block w-full truncate rounded border px-1.5 py-0.5 text-left text-[11px] transition hover:brightness-125 ${c.cal}`}
    >
      <span className="opacity-70">{evento.hora}</span> {evento.nombre}
    </button>
  );
}
