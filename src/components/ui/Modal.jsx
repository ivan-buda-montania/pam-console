import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function Modal({ open, onClose, title, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const width = size === "lg" ? "max-w-2xl" : size === "sm" ? "max-w-sm" : "max-w-lg";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm dark:bg-black/60" onClick={onClose} />
          <motion.div
            className={`glass-strong relative z-10 w-full ${width} rounded-2xl`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
                <h3 className="text-base font-semibold text-primary">{title}</h3>
                <button className="btn-subtle btn-sm -mr-2" onClick={onClose} aria-label="Cerrar">
                  <Icon name="close" size={18} />
                </button>
              </div>
            )}
            <div className="px-5 py-4">{children}</div>
            {footer && <div className="flex justify-end gap-2 border-t border-hairline px-5 py-4">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
