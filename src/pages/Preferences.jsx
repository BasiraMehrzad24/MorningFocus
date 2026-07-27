// React Router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Icons
import {
  HiOutlineCog6Tooth,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

// Custom Hook
import useReminder from "../hooks/useReminder";

export default function Preferences({ darkMode, setDarkMode }) {
  // navigation
  const navigate = useNavigate();

  // reminder hook
  const {
    reminderTime,
    setReminderTime,
    notificationPermission,
    enableNotifications,
  } = useReminder();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
              <HiOutlineCog6Tooth
                size={28}
                className="text-orange-500 dark:text-[#E1CB40]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#574A3F] dark:text-white">
                Preferences
              </h1>

              <p className="text-sm text-[#8A8178] dark:text-gray-300">
                Customize your MorningFocus experience.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/today"
            className="group flex items-center gap-2 rounded-2xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-100 hover:shadow-sm dark:border-[#24359E] dark:text-[#E1CB40] dark:hover:bg-[#16206B]"
          >
            <HiOutlineArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back</span>
          </Link>
        </div>

        {/* Preferences List */}
        <div className="mt-10 space-y-6">
          {/* Profile Settings Card */}
          <button
            onClick={() => navigate("/profile")}
            className="
          group
          flex
          w-full
          flex-col
          gap-5
          rounded-2xl
          border
          border-orange-100
          p-5
          transition-colors
          hover:bg-orange-50
          dark:border-[#1A237E]
          dark:hover:bg-[#16206B]
          md:flex-row
          md:items-center
          md:justify-between
        "
          >
            <div className="flex items-center gap-4">
              <HiOutlineUser
                size={24}
                className="text-orange-500 dark:text-[#E1CB40]"
              />

              <div className="text-left">
                <h3 className="font-semibold text-[#574A3F] transition-colors group-hover:text-orange-500 dark:text-white dark:group-hover:text-[#E1CB40]">
                  Profile Settings
                </h3>

                <p className="text-sm text-[#8A8178] dark:text-gray-300">
                  Update your photo and personal information
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <svg
              className="h-5 w-5 text-[#8A8178] transition-colors group-hover:text-orange-500 dark:text-gray-300 dark:group-hover:text-[#E1CB40]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dark Mode Card */}
          <div
            className="
          flex
          flex-col
          gap-6
          rounded-2xl
          border
          border-orange-100
          p-5
          dark:border-[#1A237E]
          md:flex-row
          md:items-center
          md:justify-between
        "
          >
            <div className="flex items-center gap-4">
              {darkMode ? (
                <HiOutlineMoon size={24} className="text-[#E1CB40]" />
              ) : (
                <HiOutlineSun size={24} className="text-orange-500" />
              )}

              <div>
                <h3 className="font-semibold text-[#574A3F] dark:text-white">
                  Dark Mode
                </h3>

                <p className="text-sm text-[#8A8178] dark:text-gray-300">
                  Switch between light and dark appearance.
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`h-8 w-16 rounded-full transition ${
                darkMode ? "bg-[#E1CB40]" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full bg-white shadow transition-transform ${
                  darkMode ? "translate-x-8" : ""
                }`}
              />
            </button>
          </div>

          {/* Notification Settings Card */}
          <div className="rounded-2xl border border-orange-100 p-6 dark:border-[#1A237E]">
            {/* Notification Permission */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <HiOutlineBell
                  size={24}
                  className="mt-1 text-orange-500 dark:text-[#E1CB40]"
                />

                <div>
                  <h3 className="font-semibold text-[#574A3F] dark:text-white">
                    Browser Notifications
                  </h3>

                  <p className="mt-1 max-w-xl text-sm text-[#8A8178] dark:text-gray-300">
                    Receive daily reminders to complete your focus goal.
                  </p>
                </div>
              </div>

              {/* Enable Notification Button */}
              <button
                onClick={enableNotifications}
                className="
              w-full
              rounded-xl
              px-5
              py-3
              font-semibold
              transition
              md:w-auto
              bg-orange-500
              text-white
              hover:bg-orange-600
              dark:bg-[#E1CB40]
              dark:text-[#03045E]
              dark:hover:bg-[#d4bf3c]
            "
              >
                {notificationPermission === "granted" ? "Enabled" : "Enable"}
              </button>
            </div>

            {/* Reminder Time */}
            <div className="mt-6 border-t border-orange-100 pt-6 dark:border-[#24359E]">
              <label className="mb-3 block text-sm font-medium text-[#574A3F] dark:text-white">
                Daily Reminder Time
              </label>

              <div className="relative w-full max-w-sm">
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="
                w-full
                rounded-2xl
                border
                border-orange-200
                bg-white
                py-4
                pl-6
                pr-6
                text-3xl
                font-semibold
                text-[#574A3F]
                outline-none
                transition
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-200
                dark:border-[#24359E]
                dark:bg-[#0B1661]
                dark:text-white
                dark:focus:border-[#E1CB40]
                dark:focus:ring-[#E1CB40]/20
              "
                />
              </div>

              <p className="mt-3 text-xs text-[#8A8178] dark:text-gray-400">
                MorningFocus will remind you once a day while the app is open.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
