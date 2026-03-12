import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import {
  getUsersTasks,
  addTask as svcAddTask,
  updateTask as svcUpdateTask,
  deleteTask as svcDeleteTask,
} from '../services/taskService';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    getUsersTasks().then(setTasks).catch(() => setTasks([]));
  }, [user]);

  async function addTask(task) {
    const newTask = await svcAddTask(null, task);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }

  async function updateTask(id, updates) {
    const updated = await svcUpdateTask(null, id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  async function deleteTask(id) {
    await svcDeleteTask(null, id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
