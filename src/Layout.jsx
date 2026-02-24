import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <header id="app-header">
        <div id="heading">
            <img src="/mlb-logo.jpg" alt="Smart Weekly Scheduler Logo" width="40" height="40" />
            <h1>Smart Weekly Scheduler</h1>
            <h4 id="week-range">Jan 11 - Jan 17</h4>
        </div>

        <nav id="header-nav">
            <NavLink to="/" className="nav-link">Login</NavLink>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <a href="https://github.com/Adammross1/startup" target="_blank" rel="noopener noreferrer">Adam&apos;s Github</a>
        
            <section id="user-profile">
                <span id="user-avatar">A</span>
                
                <button id="user-dropdown-toggle" type="button">
                    <span id="user-email">adam@gmail.com</span>
                    <span className="material-symbols-outlined">
                        arrow_drop_down
                    </span>
                </button>

                <ul id="user-dropdown-menu" style={{ display: 'none' }}>
                    <li><button id="profile-link">Profile</button></li>
                    <li><button id="preferences-link">Preferences</button></li>
                    <li><NavLink to="/" id="logout-link">Logout</NavLink></li>
                </ul>
            </section>
        </nav>
      </header>

      <Outlet />

      <footer id="app-footer">
        <p>&copy; 2026 Smart Weekly Scheduler</p>
      </footer>
    </>
  );
}
