import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const { login, register } = useUser();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function switchMode(registering) {
    setIsRegistering(registering);
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
            <fieldset disabled={isLoading}>
              <div>
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">
                {isLoading ? 'Signing in…' : 'Login'}
              </button>
            </fieldset>
          </form>
        ) : (
          <form id="register-form" onSubmit={handleRegister}>
            <fieldset disabled={isLoading}>
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
              <button type="submit">
                {isLoading ? 'Creating account…' : 'Create Account'}
              </button>
            </fieldset>
          </form>
        )}

        <footer>
          {!isRegistering ? (
            <p>Don&apos;t have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); switchMode(true); }}>Register</a>
            </p>
          ) : (
            <p>Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); switchMode(false); }}>Login</a>
            </p>
          )}
        </footer>
      </section>
    </main>
  );
}