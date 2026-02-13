import React from 'react';
import './ConfirmDeleteModal.css';

export function ConfirmDeleteModal() {
  return (
    <dialog id="confirm-delete-modal">
        <header>
            <h2>Confirm Delete</h2>
        </header>
        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="button-group">
            <button type="button" id="confirm-delete-yes">Yes, Delete</button>
            <button type="button" id="confirm-delete-no">Cancel</button>
        </div>
    </dialog>
  );
}
