import React from 'react';
import './SettingsModal.css';

export function SettingsModal() {
  return (
    <dialog id="settings-modal">
        <header>
            <h2>Settings</h2>
            <button type="button" id="close-settings" aria-label="Close settings">
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </header>
        <form id="settings-form" method="dialog">
            <fieldset>
                <legend>Schedule Preferences</legend>
                
                <div>
                    <label htmlFor="work-hours-start">Work Hours Start</label>
                    <input type="time" id="work-hours-start" name="workHoursStart" defaultValue="09:00" />
                </div>
                
                <div>
                    <label htmlFor="work-hours-end">Work Hours End</label>
                    <input type="time" id="work-hours-end" name="workHoursEnd" defaultValue="17:00" />
                </div>
                
                <div>
                    <label htmlFor="break-duration">Break Duration (minutes)</label>
                    <input type="number" id="break-duration" name="breakDuration" min="5" max="60" defaultValue="15" />
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Task Defaults</legend>
                
                <div>
                    <label htmlFor="default-task-duration">Default Task Duration (hours)</label>
                    <input type="number" id="default-task-duration" name="defaultTaskDuration" min="0.5" max="8" step="0.5" defaultValue="1" />
                </div>
                
                <div>
                    <label htmlFor="default-category">Default Category</label>
                    <select id="default-category" name="defaultCategory">
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
                    <select id="default-priority" name="defaultPriority">
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
                    <select id="scheduling-strategy" name="schedulingStrategy">
                        <option value="priority-first">Priority First</option>
                        <option value="deadline-first">Earliest Deadline First</option>
                        <option value="balanced">Balanced</option>
                        <option value="shortest-first">Shortest Task First</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="chronotype">Respect Chronotype</label>
                    <select id="chronotype" name="chronotype">
                        <option value="none">No Preference</option>
                        <option value="morning">Morning Person (harder tasks early)</option>
                        <option value="evening">Night Owl (harder tasks later)</option>
                        <option value="afternoon">Afternoon Peak</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="buffer-time">Buffer Time Between Tasks (minutes)</label>
                    <input type="number" id="buffer-time" name="bufferTime" min="0" max="30" step="5" defaultValue="5" />
                </div>
            </fieldset>
            
            <div className="button-group">
                <button type="submit">Save Settings</button>
                <button type="button" id="cancel-settings">Cancel</button>
            </div>
        </form>
    </dialog>
  );
}
