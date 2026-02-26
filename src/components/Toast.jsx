import React, { useEffect } from 'react';
import './Toast.css';

export function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 10000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`dashboard-toast toast toast-${type}`} role="alert">
      <span className="material-symbols-outlined toast-icon">
        {type === 'success' ? 'check_circle' : 'error'}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-dismiss" type="button" aria-label="Dismiss" onClick={onDismiss}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}
