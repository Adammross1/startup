import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  loginWithGoogle as authLoginWithGoogle,
  logout as authLogout,
} from '../services/authService';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) setUser(existing);
  }, []);

  async function loginWithGoogle() {
    const sessionUser = await authLoginWithGoogle();
    setUser(sessionUser);
    return sessionUser;
  }

  function logout() {
    authLogout();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
