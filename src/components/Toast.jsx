import { useState, useCallback } from "react";
import { IcCheck, IcAlert } from "./Icons";

let _toastId = 0;
export const ToastCtx = { add: null };

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  ToastCtx.add = useCallback((msg, type = "success") => {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast--${t.type}`}
        >
          {t.type === "success" ? <IcCheck sz={14} /> : <IcAlert sz={14} />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export const toast = (msg, type) => ToastCtx.add?.(msg, type);
