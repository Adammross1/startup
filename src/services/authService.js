
export async function register(name, email, password) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });
  const nameAndEmail = await res.json();
  if (!res.ok) throw new Error(nameAndEmail.error ?? 'Registration failed.');
  return nameAndEmail;
}

export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const nameAndEmail = await res.json();
  if (!res.ok) throw new Error(nameAndEmail.error ?? 'Login failed.');
  return nameAndEmail;
}

export async function logout() {
  const googleCalendarToken = sessionStorage.getItem('sws_gcal_token');
  if (googleCalendarToken && window.google?.accounts?.oauth2) {
    google.accounts.oauth2.revoke(googleCalendarToken, () => {});
  }
  sessionStorage.removeItem('sws_gcal_token');
  sessionStorage.removeItem('sws_gcal_calendar_id');

  await fetch('/api/auth/logout', { method: 'DELETE', credentials: 'include' });
}

export async function getCurrentUser() {
  const res = await fetch('/api/auth/me', { credentials: 'include' });
  if (!res.ok) return null;
  return res.json();
}

const GCAL_TOKEN_KEY = 'sws_gcal_token';
const GCAL_SCOPE = 'https://www.googleapis.com/auth/calendar';

function waitForGoogle() {
  return new Promise((resolve) => {
    if (window.google?.accounts?.oauth2) { resolve(); return; }
    const interval = setInterval(() => {
      if (window.google?.accounts?.oauth2) { clearInterval(interval); resolve(); }
    }, 100);
  });
}

export async function requestGoogleCalendarAccess() {
  const cached = sessionStorage.getItem(GCAL_TOKEN_KEY);
  if (cached) return cached;

  await waitForGoogle();

  return new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: GCAL_SCOPE,
      callback: (tokenResponse) => {
        if (tokenResponse.error) {
          reject(new Error(tokenResponse.error_description ?? tokenResponse.error));
          return;
        }
        sessionStorage.setItem(GCAL_TOKEN_KEY, tokenResponse.access_token);
        resolve(tokenResponse.access_token);
      },
    });
    tokenClient.requestAccessToken({ prompt: '' });
  });
}
