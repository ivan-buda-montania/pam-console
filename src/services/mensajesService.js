import { MENSAJES_SEED } from "../data/mensajes";
import { KEYS, loadKey, saveKey, clone, delay } from "./storage";
import { hoyISO } from "../utils/fechas";

let contador = 0;

export async function getMensajes(eventoId) {
  await delay();
  const overrides = loadKey(KEYS.mensajes, {});
  const base = MENSAJES_SEED[eventoId] || [];
  const extra = overrides[eventoId] || [];
  return clone([...base, ...extra]);
}

export async function addMensaje(eventoId, { autor = "Poncho Arocha", texto, adjunto = null }) {
  await delay(80);
  const overrides = loadKey(KEYS.mensajes, {});
  const lista = overrides[eventoId] || [];
  const nuevo = {
    id: `msg-${eventoId}-u${Date.now()}-${++contador}`,
    autor,
    texto,
    fecha: hoyISO(),
    adjunto,
    propio: true,
  };
  overrides[eventoId] = [...lista, nuevo];
  saveKey(KEYS.mensajes, overrides);
  return clone(nuevo);
}
