import { useEffect, useState } from "react";
import {
  startReminderService,
  stopReminderService,
} from "../services/reminderService";

export default function useReminder() {
  // reminder time selected by the user
  const [reminderTime, setReminderTime] = useState(() => {
    return localStorage.getItem("reminderTime") || "09:00";
  });

  // current browser notification permission
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  // save reminder time to localStorage
  useEffect(() => {
    localStorage.setItem("reminderTime", reminderTime);
  }, [reminderTime]);

  // start or restart reminder service when settings change
  useEffect(() => {
    if (notificationPermission === "granted") {
      startReminderService(reminderTime);
    }

    // stop reminder service when component unmounts
    return () => {
      stopReminderService();
    };
  }, [reminderTime, notificationPermission]);

  // request browser notification permission
  const enableNotifications = async () => {
    const permission = await Notification.requestPermission();

    setNotificationPermission(permission);

    // start reminders after permission is granted
    if (permission === "granted") {
      startReminderService(reminderTime);
    }

    return permission;
  };

  return {
    reminderTime,
    setReminderTime,

    notificationPermission,

    enableNotifications,
  };
}