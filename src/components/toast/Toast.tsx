import React, { useEffect } from "react";
import { ToastType } from "../../models/models";
import './Toast.css'

interface ToastProps {
  message: string;
  type: ToastType;
  id: number;
  onClose: (id: number) => void;
}

function Toast(props: ToastProps) {
    const { message, type, onClose, id } = props;
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), 3000);
        return () => clearTimeout(timer);
      }, [id, onClose]);
    
      return (
        <div className={`toast ${type}`}>
          {message}
          <button className="close-btn" onClick={() => onClose(id)}>×</button>
        </div>
    );
}

export default Toast;

