import React, { useEffect, useState } from 'react';
import './SettingsModal.css';
import { useSettings } from '../context/SettingsContext';

export function SettingsModal({ open, onClose }) {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings, open]);

  if (!open) return null;

  function handleFieldChange(e) {
    const { name, value, type } = e.target;
    const numericFields = new Set(['defaultTaskDuration', 'bufferTime']);
    setForm((prev) => ({ ...prev, [name]: (type === 'number' || numericFields.has(name)) ? Number(value) : value }));
  }

  function handleSave(e) {
    e.preventDefault();
    updateSettings(form);
    onClose();
  }

  return (
    <dialog id="settings-modal" open>
      <div className="modal-content">
        <header>
            <h2>Settings</h2>
            <button type="button" id="close-settings" aria-label="Close settings" onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </header>
        <form id="settings-form" onSubmit={handleSave}>
            <fieldset>
                <legend>Schedule Preferences</legend>
                
                <div>
                    <label htmlFor="work-hours-start">Work Hours Start</label>
                    <input type="time" id="work-hours-start" name="workHoursStart" value={form.workHoursStart} onChange={handleFieldChange} />
                </div>
                
                <div>
                    <label htmlFor="work-hours-end">Work Hours End</label>
                    <input type="time" id="work-hours-end" name="workHoursEnd" value={form.workHoursEnd} onChange={handleFieldChange} />
                </div>
                
            </fieldset>
            
            <fieldset>
                <legend>Task Defaults</legend>
                
                <div>
                    <label htmlFor="default-task-duration">Default Task Duration (hours)</label>
                    <input type="number" id="default-task-duration" name="defaultTaskDuration" min="0.5" max="8" step="0.5" value={form.defaultTaskDuration} onChange={handleFieldChange} />
                </div>
                
                <div>
                    <label htmlFor="default-category">Default Category</label>
                    <select id="default-category" name="defaultCategory" value={form.defaultCategory} onChange={handleFieldChange}>
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
                    <label htmlFor="default-priority">Default Priority</label>
                    <select id="default-priority" name="defaultPriority" value={form.defaultPriority} onChange={handleFieldChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Scheduling Algorithm</legend>
                
                <div>
                    <label htmlFor="scheduling-strategy">Scheduling Strategy</label>
                    <select id="scheduling-strategy" name="schedulingStrategy" value={form.schedulingStrategy} onChange={handleFieldChange}>
                        <option value="priority-first">Priority First</option>
                        <option value="deadline-first">Earliest Deadline First</option>
                        <option value="balanced">Balanced</option>
                        <option value="shortest-first">Shortest Task First</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="chronotype">Respect Chronotype</label>
                    <select id="chronotype" name="chronotype" value={form.chronotype} onChange={handleFieldChange}>
                        <option value="none">No Preference</option>
                        <option value="morning">Morning Person (harder tasks early)</option>
                        <option value="evening">Night Owl (harder tasks later)</option>
                        <option value="afternoon">Afternoon Peak</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="buffer-time">Buffer Time Between Tasks</label>
                    <select id="buffer-time" name="bufferTime" value={form.bufferTime} onChange={handleFieldChange}>
                        <option value={0}>None</option>
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={45}>45 min</option>
                        <option value={60}>1 hr</option>
                    </select>
                </div>
            </fieldset>
            
            <div className="button-group">
                <button type="submit">Save Settings</button>
                <button type="button" id="cancel-settings" onClick={onClose}>Cancel</button>
            </div>
        </form>
      </div>
    </dialog>
  );
}
