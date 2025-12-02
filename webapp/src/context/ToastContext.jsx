import React, { createContext, useState, useContext, useCallback } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Inline Animation (no external CSS required) */}
      <style>
        {`
        @keyframes slideFade {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0px); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .toast-animate {
          animation: slideFade 3s ease forwards;
        }
        `}
      </style>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 pointer-events-none">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`toast-animate px-4 py-2 rounded-lg shadow-lg text-white text-sm font-medium pointer-events-auto
              ${type === "success" && "bg-green-600"}
              ${type === "error" && "bg-red-600"}
              ${type === "warning" && "bg-yellow-600"}
              ${type === "info" && "bg-blue-600"}
            `}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
