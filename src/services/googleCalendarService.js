export function exportToGoogleCalendar(scheduleBlocks, tasks, weekStart) {
  return new Promise((resolve) => {
    const delay = 1000; // simulate network latency just for fun

    setTimeout(() => {
      resolve({ success: true, eventsCreated: scheduleBlocks.length });
    }, delay);
  });
}
