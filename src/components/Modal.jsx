import { useEffect } from "react";
import { IcX } from "./Icons";
import { Button } from "./UI";

export function Modal({ open, onClose, title, children, width = 480 }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="modal-header__title">{title}</span>
          <button className="modal-header__close" onClick={onClose}>
            <IcX sz={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmModal({
  open, onClose, onConfirm,
  title, message, loading,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} width={400}>
      <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
        {message}
      </p>
      <div className="modal-footer">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
