import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  login as authLogin,
  registerUser as authRegister,
  logout as authLogout,
} from '../services/authService';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  function login(email, password) {
    const sessionUser = authLogin(email, password);
    setUser(sessionUser);
    return sessionUser;
  }

  function register(name, email, password) {
    const sessionUser = authRegister(name, email, password);
    setUser(sessionUser);
    return sessionUser;
  }

  function logout() {
    authLogout();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
