import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { DEFAULT_SETTINGS, getSettings, saveSettings } from '../services/settingsService';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { user } = useUser();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!user) {
      setSettings(DEFAULT_SETTINGS);
      return;
    }
    getSettings().then(setSettings).catch(() => setSettings(DEFAULT_SETTINGS));
  }, [user]);

  async function updateSettings(updates) {
    const merged = { ...settings, ...updates };
    setSettings(merged);
    await saveSettings(merged);
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
