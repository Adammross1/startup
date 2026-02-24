import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../services/settingsService';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function updateSettings(updates) {
    setSettings((prev) => ({ ...prev, ...updates }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
