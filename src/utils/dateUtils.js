export function getCurrentWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday

  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const formatMonthDay = (date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return { start, end, label: `${formatMonthDay(start)} – ${formatMonthDay(end)}` };
}

export function formatHour(hour) {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}
