const PRIORITY_SCORE = { high: 0.0, medium: 0.5, low: 1.0 };
const SLOTS_PER_HOUR = 4; // 15-minute granularity

function sortTasks(tasks, strategy) {
  const sorted = [...tasks];

  switch (strategy) {
    case 'priority-first':
      return sorted.sort(
        (a, b) => PRIORITY_SCORE[a.priority] - PRIORITY_SCORE[b.priority]
      );

    case 'deadline-first':
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    case 'shortest-first':
      return sorted.sort((a, b) => a.estimatedHours - b.estimatedHours);

    case 'balanced': {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const MAX_DAYS = 30;

      const deadlineScore = (task) => {
        if (!task.dueDate) return 0.5; // neutral for tasks with no due date
        const daysUntilDue = (new Date(task.dueDate) - today) / (1000 * 60 * 60 * 24);
        return Math.min(Math.max(daysUntilDue, 0), MAX_DAYS) / MAX_DAYS;
      };

      const balancedScore = (task) =>
        (PRIORITY_SCORE[task.priority] + deadlineScore(task)) / 2;

      return sorted.sort((a, b) => balancedScore(a) - balancedScore(b));
    }

    default:
      return sorted;
  }
}

function getOrderedWorkSlots(startSlot, endSlot, chronotype) {
  const workSlots = [];
  for (let s = startSlot; s < endSlot; s++) workSlots.push(s);

  switch (chronotype) {
    case 'morning':
      return workSlots;

    case 'evening':
      return [...workSlots].reverse();

    case 'afternoon': {
      const mid = (startSlot + endSlot) / 2;
      return [...workSlots].sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    }

    default:
      return workSlots;
  }
}
export function generateSchedule(tasks, settings, weekDates) {
  if (!tasks.length) return { blocks: [], unplacedTasks: [] };
  const workStartSlot = parseInt(settings.workHoursStart.split(':')[0], 10) * SLOTS_PER_HOUR;
  const workEndSlot   = parseInt(settings.workHoursEnd.split(':')[0], 10) * SLOTS_PER_HOUR;
  const bufferSlots   = Math.round(settings.bufferTime / (60 / SLOTS_PER_HOUR));

  const totalSlots = 24 * SLOTS_PER_HOUR;

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);
  const now = new Date();
  const currentSlot = Math.floor((now.getHours() * 60 + now.getMinutes()) / 15);

  const availability = Array.from({ length: 7 }, (_, day) => {
    const dayDate = weekDates ? weekDates[day] : null;
    const isPastDay  = dayDate && dayDate < todayMidnight;
    const isToday    = dayDate && dayDate.getTime() === todayMidnight.getTime();
    return Array.from({ length: totalSlots }, (_, s) => {
      if (isPastDay) return false;
      if (isToday && s <= currentSlot) return false;
      return s >= workStartSlot && s < workEndSlot;
    });
  });

  const orderedWorkSlots = getOrderedWorkSlots(workStartSlot, workEndSlot, settings.chronotype);
  const sortedTasks = sortTasks(tasks, settings.schedulingStrategy);
  const blocks = [];
  const unplacedTasks = [];

  for (const task of sortedTasks) {
    const slotsNeeded = Math.ceil(task.estimatedHours * SLOTS_PER_HOUR);
    let placed = false;

    for (let day = 0; day < 7 && !placed; day++) {
      if (task.dueDate && weekDates) {
        const dueDate = new Date(task.dueDate + 'T00:00:00');
        if (weekDates[day] > dueDate) continue;
      }

      for (const startSlot of orderedWorkSlots) {
        if (startSlot + slotsNeeded > totalSlots) continue;

        const canPlace = Array.from({ length: slotsNeeded }, (_, i) => startSlot + i)
          .every((s) => availability[day][s]);

        if (canPlace) {
          blocks.push({ taskId: task.id, day, startSlot, endSlot: startSlot + slotsNeeded });

          for (let s = 0; s < slotsNeeded + bufferSlots; s++) {
            if (startSlot + s < totalSlots) availability[day][startSlot + s] = false;
          }

          placed = true;
          break;
        }
      }
    }
      if (!placed) unplacedTasks.push(task);
  }

  return { blocks, unplacedTasks };
}
