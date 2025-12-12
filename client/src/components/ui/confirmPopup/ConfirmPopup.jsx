import { X, AlertTriangle, Check, X as XIcon } from "lucide-react";

export const ConfirmPopup = ({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    warning: {
      icon: AlertTriangle,
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      buttonColor: "bg-warning hover:bg-warning/80 text-bg",
    },
    danger: {
      icon: AlertTriangle,
      iconColor: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error",
      buttonColor: "bg-error hover:bg-error/80 text-text-light",
    },
    info: {
      icon: AlertTriangle,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary",
      buttonColor: "bg-secondary hover:bg-secondary/80 text-text-light",
    },
    success: {
      icon: Check,
      iconColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success",
      buttonColor: "bg-success hover:bg-success/80 text-bg",
    },
  };

  const config = typeConfig[type] || typeConfig.warning;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative w-full max-w-md bg-bg rounded-lg border border-secondary shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-secondary">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded ${config.bgColor}`}>
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <h3 className="text-lg font-normal text-text-light">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text hover:text-text-light rounded hover:bg-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-text">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 border-t border-secondary">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-secondary text-text rounded hover:bg-bg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 rounded font-normal transition-colors ${config.buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};