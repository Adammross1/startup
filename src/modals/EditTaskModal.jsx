import React from 'react';
import './EditTaskModal.css';

export function EditTaskModal() {
  return (
    <dialog id="edit-task-modal">
        <header>
            <h2>Edit Task</h2>
            <button type="button" id="close-edit-task" aria-label="Close">
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </header>
        <form id="edit-task-form" method="dialog">
            <input type="hidden" id="edit-task-id" name="taskId" />
            
            <div>
                <label htmlFor="edit-task-title">Task Title</label>
                <input type="text" id="edit-task-title" name="title" required />
            </div>
            
            <div>
                <label htmlFor="edit-task-category">Category</label>
                <select id="edit-task-category" name="category" required>
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
                <input type="number" id="edit-task-hours" name="estimatedHours" min="0.5" max="24" step="0.5" required />
            </div>
            
            <div>
                <label htmlFor="edit-task-due-date">Due Date</label>
                <input type="date" id="edit-task-due-date" name="dueDate" />
            </div>
            
            <div>
                <label htmlFor="edit-task-priority">Priority</label>
                <select id="edit-task-priority" name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            
            <div className="button-group">
                <button type="submit">Save Changes</button>
                <button type="button" id="delete-task-btn">Delete Task</button>
                <button type="button" id="cancel-edit-task">Cancel</button>
            </div>
        </form>
    </dialog>
  );
}
