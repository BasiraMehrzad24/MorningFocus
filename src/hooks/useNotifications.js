import { useEffect, useState } from "react";

export default function useNotifications() {
  // load saved notifications from localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // keep notifications synchronized with localStorage
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // create a new notification
  const addNotification = (message, type = "success") => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        message,
        type,
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ]);
  };

  // remove a notification by id
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  // remove all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    clearNotifications,
    setNotifications,
  };
}