import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";

export default function Alert({
  type = "info",
  open = true,
  onClose = () => {},
  dismissible = true,
  children,
  className = "",
}) {

  if (!open) return null;

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
  };

  const Icon = icons[type] || Info;

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-success/10",
          border: "border-success",
          text: "text-success",
        };
      case "warning":
        return {
          bg: "bg-warning/10",
          border: "border-warning",
          text: "text-warning",
        };
      default:
        return {
          bg: "bg-secondary/10",
          border: "border-secondary",
          text: "text-text",
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-3 rounded border ${styles.bg} ${styles.border} ${className}`}
    >

      <Icon className={`h-4 w-4 mt-0.5 ${styles.text}`} />


      <div className={`flex-1 text-sm ${styles.text}`}>
        {children}
      </div>


      {dismissible && (
        <button
          type="button"
          aria-label="Close alert"
          onClick={onClose}
          className={`p-0.5 rounded hover:bg-black/5 ${styles.text}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}