import { useRef, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login, isAuthenticated, CODIGO_DEMO } from "../services/authService";
import Icon from "../components/ui/Icon";
import ThemeToggle from "../components/theme/ThemeToggle";

export default function AccesoPage() {
  const codigoRef = useRef(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || "/";

  if (isAuthenticated()) return <Navigate to="/" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    const codigo = (codigoRef.current?.value || "").trim();
    if (!codigo) {
      setError("Ingresa el código de acceso.");
      return;
    }
    setCargando(true);
    setError("");
    const res = await login(codigo);
    setCargando(false);
    if (res.ok) navigate(destino, { replace: true });
    else setError(res.error);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 font-display text-2xl font-bold text-accent">
            PA
          </div>
          <h1 className="font-display text-2xl font-bold text-primary">Consola PAM</h1>
          <p className="mt-1 text-sm text-muted">
            Facturación, Costos y Administración · Poncho Arocha Management
          </p>
        </div>

        <form onSubmit={onSubmit} className="card space-y-4 p-6">
          <div>
            <label className="label" htmlFor="codigo">
              Código de acceso de empresa
            </label>
            <input
              id="codigo"
              ref={codigoRef}
              type="text"
              name="codigo"
              autoComplete="off"
              autoFocus
              defaultValue=""
              className="input text-center text-lg tracking-widest"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
              <Icon name="alerta" size={16} /> {error}
            </p>
          )}

          <button type="submit" disabled={cargando} className="btn-primary w-full">
            {cargando ? "Verificando…" : "Entrar"}
          </button>

          <p className="rounded-lg bg-elevated px-3 py-2 text-center text-xs text-muted">
            Acceso de demostración · código <span className="font-semibold text-accent">{CODIGO_DEMO}</span>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Acceso único con código de empresa · sin roles individuales
        </p>
      </motion.div>
    </div>
  );
}
