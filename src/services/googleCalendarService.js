const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const CALENDAR_NAME = 'Smart Weekly Scheduler';
const CACHE_KEY = 'sws_gcal_last_export';
const CALENDAR_ID_KEY = 'sws_gcal_calendar_id';

function authHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

async function apiFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let message = `Google Calendar API error (${res.status})`;
    try {
      const body = await res.json();
      message = body?.error?.message ?? message;
    } catch (err) {
      console.error(err);
    }
    throw new Error(message);
  }
  return res.json();
}

async function getOrCreateCalendar(accessToken) {
  const cached = sessionStorage.getItem(CALENDAR_ID_KEY);
  if (cached) return cached;

  const { items = [] } = await apiFetch(
    `${CALENDAR_API}/users/me/calendarList`,
    { headers: authHeaders(accessToken) },
  );

  const existing = items.find((cal) => cal.summary === CALENDAR_NAME);
  if (existing) {
    sessionStorage.setItem(CALENDAR_ID_KEY, existing.id);
    return existing.id;
  }

  const created = await apiFetch(`${CALENDAR_API}/calendars`, {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ summary: CALENDAR_NAME }),
  });

  await apiFetch(`${CALENDAR_API}/users/me/calendarList/${encodeURIComponent(created.id)}`, {
    method: 'PATCH',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ colorId: '6' }),
  });

  sessionStorage.setItem(CALENDAR_ID_KEY, created.id);
  return created.id;
}

function buildEventObject(block, task, weekStart) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function slotToDate(dayOffset, slot) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(0, slot * 15, 0, 0);
    return d;
  }

  const startDate = slotToDate(block.day, block.startSlot);
  const endDate   = slotToDate(block.day, block.endSlot);

  const descriptionParts = [`Category: ${task.category}`];
  if (task.dueDate) descriptionParts.push(`Due: ${task.dueDate}`);

  return {
    summary: task.title,
    description: descriptionParts.join('\n'),
    start: { dateTime: startDate.toISOString(), timeZone },
    end:   { dateTime: endDate.toISOString(),   timeZone },
  };
}

function fingerprint(eventObj) {
  return `${eventObj.summary}|${eventObj.start.dateTime}|${eventObj.end.dateTime}`;
}

export async function exportToGoogleCalendar(scheduleBlocks, tasks, weekStart, accessToken) {
  if (!accessToken) throw new Error('Not signed in to Google. Please sign out and sign back in.');

  const calendarId = await getOrCreateCalendar(accessToken);

  const events = scheduleBlocks.flatMap((block) => {
    const task = tasks.find((t) => t.id === block.taskId);
    return task ? [{ block, task, eventObj: buildEventObject(block, task, weekStart) }] : [];
  });

  let cachedFingerprints;
  try {
    cachedFingerprints = new Set(JSON.parse(localStorage.getItem(CACHE_KEY) ?? '[]'));
  } catch {
    cachedFingerprints = new Set();
  }

  const newEvents = events.filter(({ eventObj }) => !cachedFingerprints.has(fingerprint(eventObj)));

  await Promise.all(
    newEvents.map(({ eventObj }) =>
      apiFetch(`${CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events`, {
        method: 'POST',
        headers: authHeaders(accessToken),
        body: JSON.stringify(eventObj),
      }),
    ),
  );

  const currentFingerprints = events.map(({ eventObj }) => fingerprint(eventObj));
  localStorage.setItem(CACHE_KEY, JSON.stringify(currentFingerprints));

  return { eventsCreated: newEvents.length };
}
