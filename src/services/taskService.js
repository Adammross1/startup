async function apiFetch(url, options = {}) {
  const res = await fetch(url, { credentials: 'include', ...options });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export function getUsersTasks() {
  return apiFetch('/api/tasks');
}

export function addTask(_userEmail, task) {
  return apiFetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
}

export function updateTask(_userEmail, id, updates) {
  return apiFetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export function deleteTask(_userEmail, id) {
  return apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });
}
