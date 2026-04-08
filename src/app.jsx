import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useOutletContext } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';
import { Layout } from './Layout';
import { UserProvider, useUser } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  return (
    <UserProvider>
      <SettingsProvider>
      <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </TaskProvider>
      </SettingsProvider>
    </UserProvider>
  );
}

function ProtectedRoute() {
  const { user, authLoading } = useUser();
  const outletContext = useOutletContext();
  if (authLoading) return null;
  if (!user) return <Navigate to="/" replace />;
  return <Outlet context={outletContext} />;
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}