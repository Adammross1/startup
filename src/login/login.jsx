import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main id="login-card-container"> 
        <section id="login-card">
            <header>
                <h1>Smart Weekly Scheduler</h1>
                <p>Organize your week intelligently</p>
            </header>

            <form id="login-form" onSubmit={handleLogin}>
                <fieldset>                    
                    <div className="mb-5">
                        <label htmlFor="login-email" className="block text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            id="login-email" 
                            name="email" 
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            id="login-password" 
                            name="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95">Login</button>
                </fieldset>
            </form>

            {/* Register form hidden by default, toggled via JS later */}
            <form id="register-form" style={{display: 'none'}} onSubmit={handleLogin}>
                <fieldset>                    
                    <div>
                        <label htmlFor="register-name">Full Name</label>
                        <input 
                            type="text" 
                            id="register-name" 
                            name="name" 
                            placeholder="Your Name" 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="register-email">Email</label>
                        <input 
                            type="email" 
                            id="register-email" 
                            name="email" 
                            placeholder="you@example.com" 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="register-password">Password</label>
                        <input 
                            type="password" 
                            id="register-password" 
                            name="password" 
                            placeholder="••••••••" 
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="register-confirm-password">Confirm Password</label>
                        <input 
                            type="password" 
                            id="register-confirm-password" 
                            name="confirm-password" 
                            placeholder="••••••••" 
                            required
                        />
                    </div>

                    <button type="submit">Create Account</button>
                </fieldset>
            </form>

            <footer>
                <p id="toggle-to-register">
                    Don't have an account? <a href="#" id="show-register">Register</a>
                </p>
                <p id="toggle-to-login" style={{display: 'none'}}>
                    Already have an account? <a href="#" id="show-login">Login</a>
                </p>
            </footer>
        </section>
    </main>

  );
}