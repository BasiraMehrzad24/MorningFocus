// formats history dates into friendly labels
// returns: today, yesterday, x days ago, or a formatted date

export function formatHistoryDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  // ignore time when comparing dates
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // calculate the difference in days
  const diffDays = Math.floor(
    (current - target) / (1000 * 60 * 60 * 24)
  );

  // return a human-readable label
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  // fallback to a formatted calendar date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}