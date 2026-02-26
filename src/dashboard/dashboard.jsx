import React, { useState, useEffect, useMemo } from 'react';
import './dashboard.css';
import { SettingsModal } from '../modals/SettingsModal';
import { EditTaskModal } from '../modals/EditTaskModal';
import { ConfirmDeleteModal } from '../modals/ConfirmDeleteModal';
import { useTasks } from '../context/TaskContext';
import { useSettings } from '../context/SettingsContext';
import { formatSlot, getWeekDates, formatColumnHeader } from '../utils/dateUtils';
import { generateSchedule } from '../services/schedulerService';
import { exportToGoogleCalendar } from '../services/googleCalendarService';
import { Toast } from '../components/Toast';

function createDefaultFormData(settings) {
  return {
    title: '',
    category: settings?.defaultCategory ?? 'homework',
    estimatedHours: settings?.defaultTaskDuration ?? 1,
    dueDate: '',
    priority: settings?.defaultPriority ?? 'low',
  };
}

function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const date = new Date(dueDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { settings } = useSettings();
  const weekDates = useMemo(() => getWeekDates(), []);
  const todayMidnight = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(() => createDefaultFormData(settings));

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isExporting, setIsExporting] = useState(false);

  const { blocks: scheduleBlocks, unplacedTasks } = useMemo(
    () => generateSchedule(tasks, settings, weekDates),
    [tasks, settings, weekDates]
  );

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTask(e) {
    e.preventDefault();
    addTask(formData);
    setFormData(createDefaultFormData(settings));
    setShowAddForm(false);
  }

  function handleCancel() {
    setFormData(createDefaultFormData(settings));
    setShowAddForm(false);
  }

  function handleSaveEdit(id, updates) {
    updateTask(id, updates);
    setEditingTask(null);
  }

  function handleConfirmDelete() {
    deleteTask(deletingTaskId);
    setDeletingTaskId(null);
    setEditingTask(null);
  }

  function handleExportToGoogleCalendar() {
    setIsExporting(true);
    exportToGoogleCalendar(scheduleBlocks, tasks, weekDates[0])
      .then(({ eventsCreated }) => {
        setToastType('success');
        setToastMessage(`${eventsCreated} ${eventsCreated === 1 ? 'event' : 'events'} exported to Google Calendar.`);
      })
      .catch((err) => {
        setToastType('error');
        setToastMessage(err.message);
      })
      .finally(() => setIsExporting(false));
  }

  const scheduleBlocksByStartCell = {};
  const coveredCells = new Set();
  for (const block of scheduleBlocks) {
    scheduleBlocksByStartCell[`${block.day}-${block.startSlot}`] = block;
    for (let slot = block.startSlot + 1; slot < block.endSlot; slot++) {
      coveredCells.add(`${block.day}-${slot}`);
    }
  }

  return (
    <>
    <div id="app-container">
        <aside id="sidebar">
            {!showAddForm && (
              <button
                id="add-task-button"
                type="button"
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95"
                onClick={() => { setFormData(createDefaultFormData(settings)); setShowAddForm(true); }}
              >
                <span className="material-symbols-outlined">add</span>
                Add Task
              </button>
            )}

            {showAddForm && (
              <form id="add-task-form" onSubmit={handleAddTask}>
                <fieldset>
                    <div>
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            type="text"
                            id="task-title"
                            name="title"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="task-category">Category</label>
                        <select id="task-category" name="category" value={formData.category} onChange={handleFieldChange} required>
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
                        <label htmlFor="task-hours">Estimated Hours</label>
                        <input
                            type="number"
                            id="task-hours"
                            name="estimatedHours"
                            min="0.5"
                            max="24"
                            step="0.5"
                            value={formData.estimatedHours}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="task-due-date">Due Date (optional)</label>
                        <input
                            type="date"
                            id="task-due-date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleFieldChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="task-priority">Priority</label>
                        <select id="task-priority" name="priority" value={formData.priority} onChange={handleFieldChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div id="form-actions">
                        <button type="submit" id="add-task-submit">Add</button>
                        <button type="button" id="add-task-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </fieldset>
              </form>
            )}

            <section id="task-list">
                <h2>Your Tasks</h2>

                {tasks.length === 0 ? (
                  <p id="no-tasks-message">No tasks yet. Click &quot;Add Task&quot; to get started.</p>
                ) : (
                  <ul id="tasks-container">
                    {tasks.map((task) => (
                      <li key={task.id} className={`task-item task-${task.category}`}>
                        <div className="task-info">
                          <span className="task-category-badge">{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
                          <h3 className="task-name">{task.title}</h3>
                          <p className="task-meta">
                            {task.estimatedHours} {task.estimatedHours === 1 ? 'hour' : 'hours'}
                            {formatDueDate(task.dueDate) && ` • Due: ${formatDueDate(task.dueDate)}`}
                          </p>
                        </div>
                        <div className="task-actions">
                          <button type="button" className="edit-task-btn" aria-label="Edit task" onClick={() => setEditingTask(task)}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button type="button" className="delete-task-btn" aria-label="Delete task" onClick={() => setDeletingTaskId(task.id)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
            </section>

            {/* Websocket will show live activity feed here */}
            <section id="live-activity">
                <h2>Live Activity</h2>
                <p id="connection-status">
                    <span id="status-indicator">●</span>
                    <span id="status-text">Connected</span>
                </p>
                
                <ul id="activity-feed">
                    {/* dummy data for now */}
                    <li className="activity-item">
                        <span className="activity-user">Adam</span>
                        <span className="activity-action">scheduled &quot;Homework&quot;</span>
                        <span className="activity-time">2 min ago</span>
                    </li>
                    <li className="activity-item">
                        <span className="activity-user">Kayla</span>
                        <span className="activity-action">completed &quot;Journaling&quot;</span>
                        <span className="activity-time">5 min ago</span>
                    </li>
                    <li id="no-activity-message">No recent activity</li>
                </ul>
            </section>
        </aside>

        <main id="main-content">
            <header id="schedule-header">
                <h2 className="text-2xl font-semibold text-gray-800">Weekly Schedule</h2>
                <div className="header-actions">
                  <button id="open-settings-btn" type="button" aria-label="Open settings" onClick={() => setShowSettings(true)}>
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                  <button
                    id="export-calendar-btn"
                    type="button"
                    onClick={handleExportToGoogleCalendar}
                    disabled={scheduleBlocks.length === 0 || isExporting}
                  >
                    <span className="material-symbols-outlined">calendar_add_on</span>
                    {isExporting ? 'Exporting…' : 'Export to Google Calendar'}
                  </button>
                </div>
            </header>

            {unplacedTasks.length > 0 && (
              <div id="unplaced-tasks-warning">
                <span className="material-symbols-outlined">warning</span>
                <span>
                  <strong>{unplacedTasks.length} {unplacedTasks.length === 1 ? 'task' : 'tasks'} couldn't fit in your schedule:</strong>{' '}
                  {unplacedTasks.map((t) => t.title).join(', ')}.
                  Try extending your work hours, reducing task durations, or shortening the buffer time.
                </span>
              </div>
            )}

            <section id="schedule-container">
                <table id="schedule-grid">
                    <thead>
                        <tr>
                            <th id="time-column-header">Time</th>
                            {weekDates.map((date, i) => (
                              <th key={i} className={date.getTime() === todayMidnight.getTime() ? 'today-column' : ''}>
                                {formatColumnHeader(date)}
                              </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody id="schedule-body">
                        {Array.from({ length: 96 }, (_, slot) => (
                          <tr key={slot} data-slot={slot} className={slot % 4 === 0 ? 'hour-row' : 'quarter-row'}>
                            <td className="time-cell">{slot % 4 === 0 ? formatSlot(slot) : ''}</td>
                            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                              const cellKey = `${day}-${slot}`;
                              if (coveredCells.has(cellKey)) return null;
                              const block = scheduleBlocksByStartCell[cellKey];
                              if (block) {
                                const task = tasks.find((t) => t.id === block.taskId);
                                const rowSpan = block.endSlot - block.startSlot;
                                return (
                                  <td key={day} className="day-cell" data-day={day} rowSpan={rowSpan}>
                                    <div
                                      className={`scheduled-task task-${task.category}`}
                                      onClick={() => setEditingTask(task)}
                                    >
                                      <span className="task-block-title">{task.title}</span>
                                      <span className="task-block-time">
                                        {formatSlot(block.startSlot)} – {formatSlot(block.endSlot)}
                                      </span>
                                    </div>
                                  </td>
                                );
                              }
                              return <td key={day} className="day-cell" data-day={day}></td>;
                            })}
                          </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    </div>

    <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    <Toast message={toastMessage} type={toastType} onDismiss={() => setToastMessage('')} />
    <EditTaskModal
      task={editingTask}
      onSave={handleSaveEdit}
      onDelete={(id) => { setDeletingTaskId(id); setEditingTask(null); }}
      onClose={() => setEditingTask(null)}
    />
    <ConfirmDeleteModal
      taskId={deletingTaskId}
      onConfirm={handleConfirmDelete}
      onCancel={() => setDeletingTaskId(null)}
    />
    </>
  );
}
