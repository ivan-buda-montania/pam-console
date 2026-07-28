import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

// Devuelve la función toast(mensaje, tipo?) — no-op si no hay provider.
export function useToast() {
  const ctx = useContext(ToastContext);
  return ctx ? ctx.toast : () => {};
}
