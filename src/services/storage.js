// Wrapper de localStorage con prefijo "pam." y sembrado versionado.
// Es la única frontera con el almacenamiento del navegador: al migrar a la
// API real (Python + Postgres) solo cambian los servicios, no los componentes.
import { SEED_VERSION } from "../data/seed";
import { CATEGORIAS_SEED } from "../data/categorias";

const PREFIX = "pam.";

export const KEYS = {
  seedVersion: PREFIX + "seedVersion",
  acceso: PREFIX + "acceso",
  categorias: PREFIX + "categorias",
  facturasOverrides: PREFIX + "facturasOverrides",
  mensajes: PREFIX + "mensajes",
};

export function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Almacenamiento no disponible (modo privado, etc.). El prototipo sigue en memoria.
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

// Siembra las claves editables si la versión de semilla cambió.
// Colecciones de solo lectura (artistas, eventos, clientes) NO se persisten.
export function ensureSeed() {
  const version = loadKey(KEYS.seedVersion, null);
  if (version === SEED_VERSION) return;
  saveKey(KEYS.categorias, CATEGORIAS_SEED);
  saveKey(KEYS.facturasOverrides, {});
  saveKey(KEYS.mensajes, {});
  saveKey(KEYS.seedVersion, SEED_VERSION);
}

// Restablece los datos de demo a su estado sembrado (mantiene la sesión de acceso).
export function resetDemo() {
  saveKey(KEYS.categorias, CATEGORIAS_SEED);
  saveKey(KEYS.facturasOverrides, {});
  saveKey(KEYS.mensajes, {});
  saveKey(KEYS.seedVersion, SEED_VERSION);
}

// Pequeño retardo para simular latencia de red y ejercitar los estados de carga.
export function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Copia profunda de fixtures para que los componentes no muten los datos base.
export function clone(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}
