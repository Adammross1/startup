import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { getUsersTasks, addTask as svcAddTask, updateTask as svcUpdateTask, deleteTask as svcDeleteTask } from '../services/taskService';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(user ? getUsersTasks(user.email) : []);
  }, [user]);

  function addTask(task) {
    const newTask = svcAddTask(user.email, task);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }

  function updateTask(id, updates) {
    const updated = svcUpdateTask(user.email, id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  function deleteTask(id) {
    svcDeleteTask(user.email, id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
