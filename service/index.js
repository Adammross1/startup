const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const DB = require('../database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const users = new Map();
const authTokens = new Map();
const tasks = new Map();
const userSettings = new Map();

const DEFAULT_SETTINGS = {
  workHoursStart: '09:00',
  workHoursEnd: '17:00',
  defaultTaskDuration: 1,
  defaultCategory: 'homework',
  defaultPriority: 'low',
  schedulingStrategy: 'priority-first',
  chronotype: 'none',
  bufferTime: 0,
};

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  const email = token && authTokens.get(token);
  if (!email) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  req.userEmail = email;
  next();
}

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existingUser = await DB.getUser(email);
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await DB.addUser({ name, email, passwordHash });

  const token = uuidv4();
  authTokens.set(token, email);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.status(201).json({ name, email });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: 'No account found with that email. Please register first.' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Incorrect password. Please try again.' });
  }

  const token = uuidv4();
  authTokens.set(token, email);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.json({ name: user.name, email: user.email });
});

app.delete('/api/auth/logout', (req, res) => {
  const token = req.cookies.token;
  if (token) authTokens.delete(token);
  res.clearCookie('token');
  res.sendStatus(204);
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = users.get(req.userEmail);
  if (!user) return res.status(401).json({ error: 'User not found.' });
  res.json({ name: user.name, email: user.email });
});

app.get('/api/tasks', requireAuth, (req, res) => {
  res.json(tasks.get(req.userEmail) ?? []);
});

app.post('/api/tasks', requireAuth, (req, res) => {
  const userTasks = tasks.get(req.userEmail) ?? [];
  const newTask = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  tasks.set(req.userEmail, [...userTasks, newTask]);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', requireAuth, (req, res) => {
  const userTasks = tasks.get(req.userEmail) ?? [];
  const idx = userTasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found.' });
  const updated = { ...userTasks[idx], ...req.body };
  userTasks[idx] = updated;
  tasks.set(req.userEmail, userTasks);
  res.json(updated);
});

app.delete('/api/tasks/:id', requireAuth, (req, res) => {
  const userTasks = tasks.get(req.userEmail) ?? [];
  const filtered = userTasks.filter((t) => t.id !== req.params.id);
  if (filtered.length === userTasks.length) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  tasks.set(req.userEmail, filtered);
  res.sendStatus(204);
});

app.get('/api/settings', requireAuth, (req, res) => {
  res.json({ ...DEFAULT_SETTINGS, ...(userSettings.get(req.userEmail) ?? {}) });
});

app.put('/api/settings', requireAuth, (req, res) => {
  const merged = { ...DEFAULT_SETTINGS, ...req.body };
  userSettings.set(req.userEmail, merged);
  res.json(merged);
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Smart Weekly Scheduler backend listening on port ${port}`);
});