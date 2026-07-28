import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message,
  confirmLabel = "Confirmar",
  danger = true,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn-ghost btn-sm" onClick={onClose}>
            Cancelar
          </button>
          <button
            className={danger ? "btn btn-sm bg-red-500 text-white hover:bg-red-400" : "btn-primary btn-sm"}
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-secondary">{message}</p>
    </Modal>
  );
}
