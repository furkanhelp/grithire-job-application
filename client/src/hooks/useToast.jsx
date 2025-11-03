import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdsRef = useRef(new Set());

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);

    // Prevents duplicates by checking if similar toast already exists
    const toastKey = `${toast.type}-${toast.message}-${toast.description}`;
    if (toastIdsRef.current.has(toastKey)) {
      return id; 
    }

    toastIdsRef.current.add(toastKey);

    const newToast = {
      id,
      ...toast,
      timestamp: Date.now(),
      toastKey, // Store the key for cleanup
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const newToasts = prev.filter((toast) => toast.id !== id);
      // Clean up the ID set
      if (newToasts.length === 0) {
        toastIdsRef.current.clear();
      }
      return newToasts;
    });
  }, []);

  // Clears duplicate prevention when all toasts are gone
  useEffect(() => {
    if (toasts.length === 0) {
      toastIdsRef.current.clear();
    }
  }, [toasts.length]);

  const toast = useCallback(
    (message, options = {}) => {
      return addToast({ message, type: "default", ...options });
    },
    [addToast]
  );

  toast.success = (message, description = "", options = {}) => {
    return addToast({
      message,
      description,
      type: "success",
      ...options,
    });
  };

  toast.error = (message, description = "", options = {}) => {
    return addToast({
      message,
      description,
      type: "error",
      ...options,
    });
  };

  toast.warning = (message, description = "", options = {}) => {
    return addToast({
      message,
      description,
      type: "warning",
      ...options,
    });
  };

  toast.info = (message, description = "", options = {}) => {
    return addToast({
      message,
      description,
      type: "info",
      ...options,
    });
  };

  const contextValue = {
    toast,
    toasts,
    removeToast,
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 min-w-80 max-w-sm">
      <AnimatePresence>
        {toasts.map((toastItem) => (
          <ToastItem
            key={toastItem.id}
            toast={toastItem}
            onClose={() => removeToast(toastItem.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  const ToastItem = ({ toast, onClose }) => {
    const [progress, setProgress] = useState(100);
    const duration = toast.duration || 5000;

    useEffect(() => {
      if (toast.type !== "loading") {
        const timer = setTimeout(() => {
          onClose();
        }, duration);

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - 100 / (duration / 100);
          });
        }, 100);

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      }
    }, [toast.id, duration, onClose, toast.type]);

    const getToastStyles = (type) => {
      const baseStyles =
        "rounded-2xl shadow-2xl border backdrop-blur-md p-4 relative overflow-hidden";

      switch (type) {
        case "success":
          return `${baseStyles} bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400/30 text-white`;
        case "error":
          return `${baseStyles} bg-gradient-to-br from-red-500/20 to-rose-600/20 border-red-400/30 text-white`;
        case "warning":
          return `${baseStyles} bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-400/30 text-white`;
        case "info":
          return `${baseStyles} bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-400/30 text-white`;
        default:
          return `${baseStyles} bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30 text-white`;
      }
    };

    const getIcon = (type) => {
      switch (type) {
        case "success":
          return (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          );
        case "error":
          return (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          );
        case "warning":
          return (
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          );
        case "info":
          return (
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          );
        default:
          return "💬";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={getToastStyles(toast.type)}
      >
        {/* Progress Bar*/}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 rounded-t-2xl overflow-hidden">
          <motion.div
            className={`h-full ${
              toast.type === "success"
                ? "bg-green-400"
                : toast.type === "error"
                ? "bg-red-400"
                : toast.type === "warning"
                ? "bg-yellow-400"
                : toast.type === "info"
                ? "bg-blue-400"
                : "bg-gray-400"
            }`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex items-start space-x-3 pt-1">
          <div className="flex-shrink-0">{getIcon(toast.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-5">{toast.message}</p>
            {toast.description && (
              <p className="mt-1 text-xs opacity-90">{toast.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xs transition-all duration-200 opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(<ToastContainer />, document.body)}
    </ToastContext.Provider>
  );
};

export default useToast;
