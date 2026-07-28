import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function Drawer({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm dark:bg-black/60" onClick={onClose} />
          <motion.aside
            className="glass-strong absolute right-0 top-0 flex h-full w-full max-w-md flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <h3 className="pr-2 text-base font-semibold text-primary">{title}</h3>
              <button className="btn-subtle btn-sm -mr-2 shrink-0" onClick={onClose} aria-label="Cerrar">
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
            {footer && <div className="border-t border-hairline px-5 py-4">{footer}</div>}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
