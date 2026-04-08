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
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((u) => {
        if (!cancelled && u) {
          setUser(u);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setAuthLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
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
    <UserContext.Provider value={{ user, authLoading, login, register, logout, requestGoogleCalendarAccess }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
