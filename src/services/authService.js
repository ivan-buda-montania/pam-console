// Acceso único con código de empresa (mock del prototipo).
import { KEYS, loadKey, saveKey, removeKey, delay } from "./storage";

export const CODIGO_DEMO = "PONCHO2026";

export async function login(codigo) {
  await delay(200);
  if ((codigo || "").trim().toUpperCase() === CODIGO_DEMO) {
    saveKey(KEYS.acceso, true);
    return { ok: true };
  }
  return { ok: false, error: "Código de acceso incorrecto." };
}

export function logout() {
  removeKey(KEYS.acceso);
}

export function isAuthenticated() {
  return loadKey(KEYS.acceso, false) === true;
}
