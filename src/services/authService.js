const USERS_KEY = 'sws_users';
const CURRENT_USER_KEY = 'sws_current_user';

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser (name, email, password) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = { name, email, password };
  saveUsers([...users, newUser]);
  const sessionUser = { name, email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export function login(email, password) {
  const users = getUsers();
  const found = users.find((u) => u.email === email);
  if (!found) {
    throw new Error('No account found with that email. Please register first.');
  }
  if (found.password !== password) {
    throw new Error('Incorrect password. Please try again.');
  }
  const sessionUser = { name: found.name, email: found.email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
