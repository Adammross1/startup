import React, { useState, useEffect } from 'react';
import './EditTaskModal.css';

export function EditTaskModal({ task, onSave, onDelete, onClose }) {
  const [formData, setFormData] = useState({ title: '', category: 'homework', estimatedHours: 1, dueDate: '', priority: 'low' });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        category: task.category,
        estimatedHours: task.estimatedHours,
        dueDate: task.dueDate || '',
        priority: task.priority,
      });
    }
  }, [task]);

  if (!task) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(task.id, formData);
  }

  return (
    <dialog id="edit-task-modal" open>
      <div className="modal-content">
        <header>
            <h2>Edit Task</h2>
            <button type="button" aria-label="Close" onClick={onClose}>
                <span className="material-symbols-outlined">close</span>
            </button>
        </header>
        <form id="edit-task-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="edit-task-title">Task Title</label>
                <input type="text" id="edit-task-title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="edit-task-category">Category</label>
                <select id="edit-task-category" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="homework">Homework</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="exercise">Exercise</option>
                    <option value="errands">Errands</option>
                    <option value="social">Social</option>
                    <option value="commute">Commute</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="edit-task-hours">Estimated Hours</label>
                <input type="number" id="edit-task-hours" name="estimatedHours" min="0.5" max="24" step="0.5" value={formData.estimatedHours} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="edit-task-due-date">Due Date</label>
                <input type="date" id="edit-task-due-date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="edit-task-priority">Priority</label>
                <select id="edit-task-priority" name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="button-group">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => onDelete(task.id)}>Delete Task</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
      </div>
    </dialog>
  );
}
