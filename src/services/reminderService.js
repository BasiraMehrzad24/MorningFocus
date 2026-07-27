let reminderInterval = null;

// start reminder timer
export function startReminderService(reminderTime) {
  stopReminderService();

  console.log("Reminder started:", reminderTime);

  reminderInterval = setInterval(() => {
    const now = new Date();

    // current time in HH:MM format
    const current =
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");

    console.log("Current:", current);

    // trigger notification at selected time
    if (current === reminderTime) {
      console.log("Notification Fired!");

      new Notification("MorningFocus", {
        body: "Time to complete today's focus goal!",
      });
    }
  }, 60000);
}

// stop active reminder timer
export function stopReminderService() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
}

// display browser notification
function showReminder() {
  if (Notification.permission !== "granted") return;

  new Notification("🌞 MorningFocus", {
    body: "Time to complete today's focus goal!",
    icon: "/logo192.png",
  });
}