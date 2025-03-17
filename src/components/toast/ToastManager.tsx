import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ReactDOM from "react-dom";
import Toast from "./Toast";
import { ToastEvent } from "../../models/models";
import './Toast.css';
import { AnimatePresence, motion } from "framer-motion";

const ToastManager = () => {
  const [toasts, setToasts] = useState<ToastEvent[]>([]);
  const toastEvent = useSelector((state: RootState) => state.toast.toastEvent);

  useEffect(() => {
    if (toastEvent) {
      const newToast = { ...toastEvent, id: Date.now() }; // ✅ Ensure a unique ID
      setToasts((prev) => [newToast, ...prev]); // ✅ New toasts at the top

      // Auto-remove after 3 seconds
      setTimeout(() => removeToast(newToast.id), 3000);
    }
  }, [toastEvent]);

  // ✅ Memoize the toast list to avoid unnecessary re-renders
  const memoizedToasts = useMemo(() => toasts, [toasts]);

  // Function to manually close a toast
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return ReactDOM.createPortal(
    <div className="toast-container">
      <AnimatePresence mode="popLayout">
        {memoizedToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -50, x: 0, scale: 1 }} /* ✅ No horizontal movement */
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }} /* ✅ Ensures no unexpected scaling */
            exit={{ opacity: 0, y: -50, x: 0, scale: 1 }} /* ✅ Moves up, no right shift */
            transition={{ duration: 0.3, ease: "easeInOut" }} /* ✅ Smooth timing */
            layout
          >
            <Toast id={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.getElementById("toast-root") as HTMLElement
  );
};

export default ToastManager;
