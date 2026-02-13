import React from 'react';
import './dashboard.css';
import { SettingsModal } from '../modals/SettingsModal';
import { EditTaskModal } from '../modals/EditTaskModal';
import { ConfirmDeleteModal } from '../modals/ConfirmDeleteModal';

export function Dashboard() {
  return (
    <>
    <div id="app-container">
        <aside id="sidebar">
            <button id="add-task-button" type="button" className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95">
                <span className="material-symbols-outlined">
                    add
                </span>
                Add Task
            </button>

            <form id="add-task-form" style={{display: 'none'}}>
                <fieldset>
                    <div>
                        <label htmlFor="task-title">Task Title</label>
                        <input 
                            type="text" 
                            id="task-title" 
                            name="title" 
                            placeholder="Enter task title" 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="task-category">Category</label>
                        <select id="task-category" name="category" required>
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
                            defaultValue="1" 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="task-due-date">Due Date (optional)</label>
                        <input 
                            type="date" 
                            id="task-due-date" 
                            name="dueDate"
                        />
                    </div>

                    <div>
                        <label htmlFor="task-priority">Priority</label>
                        <select id="task-priority" name="priority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div id="form-actions">
                        <button type="submit" id="add-task-submit">Add</button>
                        <button type="button" id="add-task-cancel">Cancel</button>
                    </div>
                </fieldset>
            </form>

            {/* This is where the data from the databbase will be displayed */}
            <section id="task-list">
                <h2>Your Tasks</h2>

                <p id="no-tasks-message">
                    No tasks yet. Click &quot;Add Task&quot; to get started.
                </p>

                <ul id="tasks-container">
                    {/* dummy data for now */}
                    <li className="task-item task-homework" data-task-id="123" data-category="homework">
                        <div className="task-info">
                            <span className="task-category-badge">Homework</span>
                            <h3 className="task-name">Web Dev 260 hw</h3>
                            <p className="task-meta">2 hours • Due: Feb 1</p>
                        </div>
                        <div className="task-actions">
                            <button type="button" className="edit-task-btn" aria-label="Edit task">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                            <button type="button" className="delete-task-btn" aria-label="Delete task">
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </li>
                </ul>
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
                <button id="regenerate-schedule-btn" type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95">
                    Regenerate Schedule
                </button>
            </header>

            <section id="schedule-container">
                <table id="schedule-grid">
                    <thead>
                        <tr>
                            <th id="time-column-header">Time</th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody id="schedule-body">
                        <tr data-hour="0">
                            <td className="time-cell">00:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="1">
                            <td className="time-cell">01:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="2">
                            <td className="time-cell">02:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="3">
                            <td className="time-cell">03:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="4">
                            <td className="time-cell">04:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="5">
                            <td className="time-cell">05:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="6">
                            <td className="time-cell">06:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="7">
                            <td className="time-cell">07:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="8">
                            <td className="time-cell">08:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="9">
                            <td className="time-cell">09:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1">
                                <div className="scheduled-task task-homework" data-task-id="" data-category="homework">
                                    <span className="task-block-title">Task Name</span>
                                    <span className="task-block-time">09:00 - 11:00</span>
                                </div>
                            </td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="10">
                            <td className="time-cell">10:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="11">
                            <td className="time-cell">11:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="12">
                            <td className="time-cell">12:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="13">
                            <td className="time-cell">13:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="14">
                            <td className="time-cell">14:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="15">
                            <td className="time-cell">15:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="16">
                            <td className="time-cell">16:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="17">
                            <td className="time-cell">17:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="18">
                            <td className="time-cell">18:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="19">
                            <td className="time-cell">19:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="20">
                            <td className="time-cell">20:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="21">
                            <td className="time-cell">21:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="22">
                            <td className="time-cell">22:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                        <tr data-hour="23">
                            <td className="time-cell">23:00</td>
                            <td className="day-cell" data-day="0"></td>
                            <td className="day-cell" data-day="1"></td>
                            <td className="day-cell" data-day="2"></td>
                            <td className="day-cell" data-day="3"></td>
                            <td className="day-cell" data-day="4"></td>
                            <td className="day-cell" data-day="5"></td>
                            <td className="day-cell" data-day="6"></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>

    <SettingsModal />
    <EditTaskModal />
    <ConfirmDeleteModal />
    </>
  );
}
