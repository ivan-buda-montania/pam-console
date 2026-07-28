import { useState } from "react";
import { resetDemo } from "../services/storage";
import { useToast } from "../components/ui/toast-context";
import PageHeader from "../components/ui/PageHeader";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Icon from "../components/ui/Icon";
import CategoriasEditor from "../components/configuracion/CategoriasEditor";

export default function ConfiguracionPage() {
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  function reset() {
    resetDemo();
    toast("Datos de demostración restablecidos.", "success");
    setTimeout(() => window.location.reload(), 700);
  }

  return (
    <div className="animate-fade-up">
      <PageHeader title="Configuración" subtitle="Ajustes generales del módulo" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoriasEditor />
        </div>

        <aside className="space-y-4">
          <section className="card">
            <h2 className="mb-1 text-sm font-semibold text-primary">Datos de demostración</h2>
            <p className="mb-4 text-xs text-muted">
              Restablece las categorías y los estados de factura a su estado original de la demo.
            </p>
            <button className="btn-ghost btn-sm w-full" onClick={() => setConfirmReset(true)}>
              <Icon name="reloj" size={16} /> Restablecer datos de demo
            </button>
          </section>

          <section className="card">
            <h2 className="mb-1 text-sm font-semibold text-primary">Acerca del prototipo</h2>
            <p className="text-xs leading-relaxed text-muted">
              Prototipo navegable con datos de ejemplo. Las acciones de exportación, envío por correo y carga de archivos
              son simuladas. Los cambios se guardan localmente en este navegador.
            </p>
          </section>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        onConfirm={reset}
        title="Restablecer datos de demo"
        message="Se restaurarán las categorías y los estados de factura a su estado original. ¿Continuar?"
        confirmLabel="Restablecer"
        danger={false}
      />
    </div>
  );
}
