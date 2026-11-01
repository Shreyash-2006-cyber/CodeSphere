import { createContext, useCallback, useContext, useState } from "react";
import { LuCheck, LuInfo, LuTriangleAlert, LuX } from "react-icons/lu";
import "./Toast.css";

const ToastContext = createContext(null);

const ICONS = { success: LuCheck, error: LuTriangleAlert, info: LuInfo };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id) => setToasts((t) => t.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || LuInfo;
          return (
            <div key={t.id} className={`toast toast-${t.type} fade-in`}>
              <Icon className="toast-icon" />
              <span>{t.message}</span>
              <button onClick={() => dismiss(t.id)} aria-label="Dismiss">
                <LuX />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
