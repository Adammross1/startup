import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  requestGoogleCalendarAccess,
} from '../services/authService';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((u) => { if (u) setUser(u); });
  }, []);

  async function login(email, password) {
    const sessionUser = await authLogin(email, password);
    setUser(sessionUser);
    return sessionUser;
  }

  async function register(name, email, password) {
    const sessionUser = await authRegister(name, email, password);
    setUser(sessionUser);
    return sessionUser;
  }

  async function logout() {
    await authLogout();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, requestGoogleCalendarAccess }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
