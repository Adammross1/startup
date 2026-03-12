export const DEFAULT_SETTINGS = {
  workHoursStart: '09:00',
  workHoursEnd: '17:00',
  defaultTaskDuration: 1,
  defaultCategory: 'homework',
  defaultPriority: 'low',
  schedulingStrategy: 'priority-first',
  chronotype: 'none',
  bufferTime: 0,
};

async function apiFetch(url, options = {}) {
  const res = await fetch(url, { credentials: 'include', ...options });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export function getSettings() {
  return apiFetch('/api/settings');
}

export function saveSettings(settings) {
  return apiFetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
}
