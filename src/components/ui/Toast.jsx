import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContext } from "./toast-context";
import Icon from "./Icon";

let contador = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((mensaje, tipo = "info") => {
    const id = ++contador;
    setToasts((t) => [...t, { id, mensaje, tipo }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              className="glass pointer-events-auto flex items-start gap-3 rounded-xl px-4 py-3"
            >
              <span
                className={`mt-0.5 shrink-0 ${
                  t.tipo === "success"
                    ? "text-emerald-500 dark:text-emerald-400"
                    : t.tipo === "error"
                      ? "text-red-500 dark:text-red-400"
                      : "text-accent"
                }`}
              >
                <Icon name={t.tipo === "success" ? "check" : "alerta"} size={18} />
              </span>
              <p className="text-sm text-primary">{t.mensaje}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
