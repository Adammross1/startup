const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ');

const SESSION_USER_KEY = 'sws_current_user';
const SESSION_TOKEN_KEY = 'sws_access_token';

function waitForGoogle() {
  return new Promise((resolve) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }
    const interval = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

export async function loginWithGoogle() {
  await waitForGoogle();

  return new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          reject(new Error(tokenResponse.error_description ?? tokenResponse.error));
          return;
        }

        const accessToken = tokenResponse.access_token;

        try {
          const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!res.ok) throw new Error('Failed to fetch user info from Google.');

          const { name, email } = await res.json();
          const user = { name, email, accessToken };

          sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify({ name, email }));
          sessionStorage.setItem(SESSION_TOKEN_KEY, accessToken);

          resolve(user);
        } catch (err) {
          reject(new Error('Could not retrieve your Google account info. ' + err.message));
        }
      },
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  });
}

export function getCurrentUser() {
  const raw = sessionStorage.getItem(SESSION_USER_KEY);
  if (!raw) return null;
  const accessToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (!accessToken) return null;
  return { ...JSON.parse(raw), accessToken };
}

export function logout() {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token && window.google?.accounts?.oauth2) {
    google.accounts.oauth2.revoke(token, () => {});
  }
  sessionStorage.removeItem(SESSION_USER_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
}
