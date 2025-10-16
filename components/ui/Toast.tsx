import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
}) => {
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  const typeIcons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`
        fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3 min-w-[300px] max-w-md
        ${typeStyles[type]}
      `}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
    >
      <span className="text-lg">{typeIcons[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        className="text-current hover:opacity-70 transition-opacity ml-2"
        onClick={onClose}
      >
        ✕
      </button>
    </motion.div>
  );
};
