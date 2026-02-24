function getStorageKeyForUser(userEmail) {
  return `sws_tasks_${userEmail}`;
}

export function getUsersTasks(userEmail) {
  const storedTasksJson = localStorage.getItem(getStorageKeyForUser(userEmail));
  return storedTasksJson ? JSON.parse(storedTasksJson) : [];
}

function saveTasks(userEmail, tasks) {
  localStorage.setItem(getStorageKeyForUser(userEmail), JSON.stringify(tasks));
}

export function addTask(userEmail, task) {
  const tasks = getUsersTasks(userEmail);
  const newTask = { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  saveTasks(userEmail, [...tasks, newTask]);
  return newTask;
}

export function updateTask(userEmail, id, updates) {
  const tasks = getUsersTasks(userEmail);
  const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
  saveTasks(userEmail, updatedTasks);
  return updatedTasks.find((t) => t.id === id);
}

export function deleteTask(userEmail, id) {
  const tasks = getUsersTasks(userEmail).filter((t) => t.id !== id);
  saveTasks(userEmail, tasks);
}
