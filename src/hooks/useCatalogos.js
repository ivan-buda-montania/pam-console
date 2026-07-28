import { useAsyncData } from "./useAsyncData";
import { getArtistas } from "../services/artistasService";
import { getClientes } from "../services/clientesService";
import { getCategorias } from "../services/categoriasService";

// Carga catálogos (artistas, clientes, categorías) y expone mapas por id.
// Útil para resolver nombres al renderizar eventos/facturas. Devuelve null mientras carga.
export function useCatalogos() {
  const { data } = useAsyncData(async () => {
    const [artistas, clientes, categorias] = await Promise.all([
      getArtistas(),
      getClientes(),
      getCategorias(),
    ]);
    return {
      artistas,
      clientes,
      categorias,
      artistaPorId: Object.fromEntries(artistas.map((a) => [a.id, a])),
      clientePorId: Object.fromEntries(clientes.map((c) => [c.id, c])),
      categoriaPorId: Object.fromEntries(categorias.map((c) => [c.id, c])),
    };
  }, []);
  return data;
}
