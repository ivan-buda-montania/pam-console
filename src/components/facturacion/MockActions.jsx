import Icon from "../ui/Icon";
import { useToast } from "../ui/toast-context";

const AVISO = "Esta acción estará disponible en la versión final del sistema.";

export default function MockActions() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <button className="btn-ghost btn-sm" onClick={() => toast(AVISO)}>
        <Icon name="doc" size={16} /> Exportar PDF
      </button>
      <button className="btn-ghost btn-sm" onClick={() => toast(AVISO)}>
        <Icon name="excel" size={16} /> Exportar Excel
      </button>
      <button className="btn-ghost btn-sm" onClick={() => toast(AVISO)}>
        <Icon name="mail" size={16} /> Enviar por correo
      </button>
    </div>
  );
}
