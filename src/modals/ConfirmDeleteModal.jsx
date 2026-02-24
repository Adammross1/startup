import React from 'react';
import './ConfirmDeleteModal.css';

export function ConfirmDeleteModal({ taskId, onConfirm, onCancel }) {
  if (!taskId) return null;

  return (
    <dialog id="confirm-delete-modal" open>
      <div className="modal-content">
        <header>
            <h2>Confirm Delete</h2>
        </header>
        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="button-group">
            <button type="button" id="confirm-delete-yes" onClick={onConfirm}>Yes, Delete</button>
            <button type="button" id="confirm-delete-no" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
}
