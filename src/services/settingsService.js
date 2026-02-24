const SETTINGS_KEY = 'sws_settings';

export const DEFAULT_SETTINGS = {
  workHoursStart: '09:00',
  workHoursEnd: '17:00',
  breakDuration: 15,
  defaultTaskDuration: 1,
  defaultCategory: 'homework',
  defaultPriority: 'low',
  schedulingStrategy: 'priority-first',
  chronotype: 'none',
  bufferTime: 5,
};

export function getSettings() {
  const storedSettingsJson = localStorage.getItem(SETTINGS_KEY);
  if (!storedSettingsJson) return { ...DEFAULT_SETTINGS };
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettingsJson) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
