import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const { login, register } = useUser();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  function switchMode(isRegistering) {
    setIsRegistering(isRegistering);
    setError('');
  }

  return (
    <main id="login-card-container">
      <section id="login-card">
        <header>
          <h1>Smart Weekly Scheduler</h1>
          <p>Organize your week intelligently</p>
        </header>

        {error && <p className="login-error">{error}</p>}

        {!isRegistering ? (
          <form id="login-form" onSubmit={handleLogin}>
            <fieldset>
              <div className="mb-5">
                <label htmlFor="login-email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95">
                Login
              </button>
            </fieldset>
          </form>
        ) : (
          <form id="register-form" onSubmit={handleRegister}>
            <fieldset>
              <div>
                <label htmlFor="register-name">Full Name</label>
                <input
                  type="text"
                  id="register-name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-email">Email</label>
                <input
                  type="email"
                  id="register-email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  id="register-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirm-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create Account</button>
            </fieldset>
          </form>
        )}

        <footer>
          {!isRegistering ? (
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchMode(true); }}>Register</a></p>
          ) : (
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchMode(false); }}>Login</a></p>
          )}
        </footer>
      </section>
    </main>
  );
}