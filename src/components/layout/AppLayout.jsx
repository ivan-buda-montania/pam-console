import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar fijo (desktop) */}
      <aside className="nav-glass fixed inset-y-0 left-0 hidden w-60 border-r border-hairline lg:block">
        <Sidebar />
      </aside>

      {/* Off-canvas (móvil / tablet) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm dark:bg-black/50" onClick={() => setOpen(false)} />
            <motion.aside
              className="glass-strong absolute inset-y-0 left-0 w-64 border-r border-hairline"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <Sidebar onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1 py-6">
          <div className="container-page">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
