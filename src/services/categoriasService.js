// Categorías: la "verdad" vive en localStorage y es editable desde Configuración.
import { KEYS, loadKey, saveKey, clone, delay } from "./storage";
import { CATEGORIAS_SEED, PALETA_CATEGORIAS } from "../data/categorias";

function leer() {
  return loadKey(KEYS.categorias, clone(CATEGORIAS_SEED));
}

function slug(nombre) {
  return (
    "cat-" +
    nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export async function getCategorias() {
  await delay();
  return clone(leer());
}

export async function addCategoria(nombre) {
  await delay();
  const cats = leer();
  const limpio = (nombre || "").trim();
  if (!limpio) return { ok: false, error: "El nombre no puede estar vacío." };

  let id = slug(limpio);
  if (!id || id === "cat-") id = "cat-nueva";
  let n = 2;
  const base = id;
  while (cats.some((c) => c.id === id)) id = `${base}-${n++}`;

  const color = PALETA_CATEGORIAS[cats.length % PALETA_CATEGORIAS.length];
  cats.push({ id, nombre: limpio, color });
  saveKey(KEYS.categorias, cats);
  return { ok: true, categorias: clone(cats) };
}

export async function renameCategoria(id, nombre) {
  await delay();
  const cats = leer();
  const limpio = (nombre || "").trim();
  if (!limpio) return { ok: false, error: "El nombre no puede estar vacío." };
  const cat = cats.find((c) => c.id === id);
  if (!cat) return { ok: false, error: "Categoría no encontrada." };
  cat.nombre = limpio;
  saveKey(KEYS.categorias, cats);
  return { ok: true, categorias: clone(cats) };
}

export async function deleteCategoria(id) {
  await delay();
  const cats = leer();
  const cat = cats.find((c) => c.id === id);
  if (!cat) return { ok: false, error: "Categoría no encontrada." };
  if (cat.esFallback) return { ok: false, error: 'La categoría "Otras" no se puede eliminar.' };
  const restantes = cats.filter((c) => c.id !== id);
  saveKey(KEYS.categorias, restantes);
  return { ok: true, categorias: clone(restantes) };
}
