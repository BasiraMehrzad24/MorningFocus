import { useState, useRef, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { formatHistoryDate } from "../utils/formatHistoryDate";
import { HiOutlineMoon, HiOutlineBell } from "react-icons/hi2";

export default function Header({
  notifications,
  markAsRead,
  clearNotifications,
  darkMode,
  setDarkMode,
  userProfile,
}) {
  // format today's date for the header
  const today = formatDate();

  // control notification panel visibility
  const [isOpen, setIsOpen] = useState(false);

  // reference to detect clicks outside the notification panel
  const panelRef = useRef(null);

  // count unread notifications
  const unreadCount = notifications.filter((item) => !item.read).length;

  // open or close the notification panel
  const toggleNotifications = () => {
    setIsOpen((prev) => {
      const next = !prev;

      // mark all notifications as read when opening the panel
      if (next) {
        markAsRead();
      }

      return next;
    });
  };

  // close the notification panel when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#FFF4E8] dark:bg-[#03045E]/10 backdrop-blur-md relative z-10">
      <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8">
        {/* greeting section */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-orange-500 dark:text-[#E1CB40]">
            Good Morning,{" "}
            <span className="font-semibold">
              {userProfile?.first_name || "Guest"}
            </span>{" "}
            ☀️
          </p>

          <h1 className="mt-2 text-4xl leading-tight text-[#574A3F] dark:text-white sm:text-4xl lg:text-5xl">
            Ready to focus?
          </h1>

          <p className="mt-3 text-sm text-[#8A8178] dark:text-gray-300">
            {today}
          </p>
        </div>

        {/* action buttons */}
        <div
          ref={panelRef}
          className="relative flex items-center gap-3 self-start lg:self-center"
        >
          {/* notification button */}
          <button
            onClick={toggleNotifications}
            className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-white text-[#6F675F] shadow-sm transition hover:bg-orange-50 hover:text-orange-600 dark:border-[#1A237E] dark:bg-[#16206B] dark:text-[#E1CB40] dark:hover:bg-[#24359E]"
          >
            <HiOutlineBell size={22} />

            {/* unread notification badge */}
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white dark:bg-[#E1CB40] dark:text-[#03045E]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* notification dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-14 z-10 w-80 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-xl dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
              {/* dropdown header */}
              <div className="flex items-center justify-between border-b border-orange-100 px-5 py-4 dark:border-[#1A237E]">
                <h3 className="font-semibold text-[#574A3F] dark:text-white">
                  Notifications
                </h3>

                {/* remove all notifications */}
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-sm font-medium text-orange-500 transition hover:text-orange-600 dark:text-[#E1CB40]"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* notification list */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-[#8A8178] dark:text-gray-300">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`border-b border-l-4 px-5 py-4 transition hover:bg-orange-50 dark:border-[#1A237E] dark:hover:bg-[#16206B] ${
                        item.type === "error"
                          ? "border-l-red-500"
                          : "border-l-green-500"
                      }`}
                    >
                      <p className="font-medium text-[#574A3F] dark:text-white">
                        {item.message}
                      </p>

                      <p className="mt-1 text-xs text-[#8A8178] dark:text-gray-300">
                        {formatHistoryDate(item.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* theme switch button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-white text-[#6F675F] shadow-sm transition hover:bg-orange-50 hover:text-orange-600 dark:border-[#1A237E] dark:bg-[#16206B] dark:text-[#E1CB40] dark:hover:bg-[#24359E]"
          >
            <HiOutlineMoon size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
