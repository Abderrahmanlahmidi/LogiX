import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const ToastContext = createContext();

const icons = {
  error: <AlertCircle className="h-5 w-5 text-red-400" />,
  success: <CheckCircle className="h-5 w-5 text-green-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
};

const styles = {
  error: "bg-red-900/10 border-red-800/30 text-red-300",
  success: "bg-green-900/10 border-green-800/30 text-green-300",
  warning: "bg-yellow-900/10 border-yellow-800/30 text-yellow-300",
  info: "bg-blue-900/10 border-blue-800/30 text-blue-300",
};

const ToastMessage = ({ message, type = "info", onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    className={`flex items-center justify-between p-4 mb-2 rounded-lg border ${styles[type]}`}
  >
    <div className="flex items-center gap-3">
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
    </div>
    <button onClick={onDismiss} className="text-text hover:text-text-light">
      <X className="h-4 w-4" />
    </button>
  </motion.div>
);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    if (duration) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    }
  };

  const toast = {
    success: (msg, duration) => showToast(msg, "success", duration),
    error: (msg, duration) => showToast(msg, "error", duration),
    warning: (msg, duration) => showToast(msg, "warning", duration),
    info: (msg, duration) => showToast(msg, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
        <AnimatePresence>
          {toasts.map(t => (
            <ToastMessage
              key={t.id}
              message={t.message}
              type={t.type}
              onDismiss={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);