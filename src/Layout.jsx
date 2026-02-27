import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentWeekRange } from './utils/dateUtils';
import { useUser } from './context/UserContext';
import { SettingsModal } from './modals/SettingsModal';

export function Layout() {
  const [weekLabel, setWeekLabel] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const { label } = getCurrentWeekRange();
    setWeekLabel(label);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const avatarLetter = user
    ? (user.name?.[0] ?? user.email?.[0] ?? '?').toUpperCase()
    : '?';

  return (
    <>
      <header id="app-header">
        <div id="heading">
            <img src="/mlb-logo.jpg" alt="Smart Weekly Scheduler Logo" width="40" height="40" />
            <h1>Smart Weekly Scheduler</h1>
            <h4 id="week-range">{weekLabel}</h4>
        </div>

        <nav id="header-nav">
            <NavLink to="/" className="nav-link">Login</NavLink>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <a href="https://github.com/Adammross1/startup" target="_blank" rel="noopener noreferrer">Adam&apos;s Github</a>
        
            <section id="user-profile" ref={profileRef}>
                <span id="user-avatar">{avatarLetter}</span>
                
                <button
                  id="user-dropdown-toggle"
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                    <span id="user-email">{user?.email ?? 'Guest'}</span>
                    <span className="material-symbols-outlined">
                        arrow_drop_down
                    </span>
                </button>

                {dropdownOpen && (
                  <ul id="user-dropdown-menu">
                      <li>
                        <button
                          id="preferences-link"
                          onClick={() => { setShowSettings(true); setDropdownOpen(false); }}
                        >
                          Preferences
                        </button>
                      </li>
                      <li>
                        <button id="logout-link" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                  </ul>
                )}
            </section>
        </nav>
      </header>

      <Outlet context={{ setShowSettings }} />

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />

      <footer id="app-footer">
        <p>&copy; 2026 Smart Weekly Scheduler</p>
      </footer>
    </>
  );
}
