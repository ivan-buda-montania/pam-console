import { CLIENTES } from "../data/clientes";
import { clone, delay } from "./storage";

export async function getClientes() {
  await delay();
  return clone(CLIENTES);
}

export async function getCliente(id) {
  await delay();
  const c = CLIENTES.find((x) => x.id === id);
  return c ? clone(c) : null;
}
