// calculate the user's current streak
export function calculateStreak(goals) {
  if (goals.length === 0) return 0;

  // keep only one entry for each day
  const uniqueDays = [
    ...new Set(
      goals.map((goal) => new Date(goal.createdAt).toDateString()),
    ),
  ];

  // sort days from newest to oldest
  uniqueDays.sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;

  // normalize today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // count consecutive active days
  for (let i = 0; i < uniqueDays.length; i++) {
    const goalDate = new Date(uniqueDays[i]);
    goalDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (goalDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}