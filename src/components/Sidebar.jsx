import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlineCog6Tooth,
  HiOutlineBars3,
  HiChevronLeft,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { supabase } from "../api/supabase";
import { FiSun } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// sidebar navigation grouped into sections
const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        id: 1,
        name: "Today",
        path: "/today",
        icon: <HiOutlineHome size={22} />,
      },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        id: 2,
        name: "Reflection",
        path: "/reflection",
        icon: <HiOutlineLightBulb size={22} />,
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        id: 3,
        name: "Preferences",
        path: "/preferences",
        icon: <HiOutlineCog6Tooth size={22} />,
      },
    ],
  },
];

export default function Sidebar({ isCollapsed, setIsCollapsed, userProfile }) {
  // used to redirect the user after logout
  const navigate = useNavigate();

  // sign out the current user
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    // return to the landing page
    window.location.href = "/";
  };

  return (
    <aside
      className={`
    fixed
    left-0
    top-0
    z-50
    h-screen
    flex
    flex-col
    transition-all
    duration-300
    bg-[#FFF4E8]
    dark:bg-[#03045E]/10
    backdrop-blur-md
    ${isCollapsed ? "w-24" : "w-80"}
  `}
    >
      {/* button to collapse or expand the sidebar */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="
      absolute
      top-6
      -right-4
      z-50
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      border
      border-orange-100
      dark:border-[#31429B]
      bg-white
      dark:bg-[#253381]
      text-[#574A3F]
      dark:text-[#E1CB40]
      shadow-md
      transition
      hover:scale-105
      hover:bg-orange-50
      dark:hover:bg-[#31429B]
    "
      >
        {/* show a different icon depending on the sidebar state */}
        {isCollapsed ? (
          <HiOutlineBars3 size={18} />
        ) : (
          <HiChevronLeft size={18} />
        )}
      </button>

      {/* application branding */}
      <div
        className={`flex items-center p-5
      border-orange-100 dark:border-[#31429B]
      ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        {/* full logo when expanded */}
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-200 dark:bg-[#E1CB40]">
              <FiSun className="text-2xl text-orange-600 dark:text-[#03045E]" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-[#574A3F] dark:text-white">
                Morning
                <span className="text-orange-500 dark:text-[#E1CB40]">
                  Focus
                </span>
              </h1>

              <p className="text-xs text-[#8A8178] dark:text-gray-300">
                One goal every morning
              </p>
            </div>
          </div>
        )}

        {/* compact logo when collapsed */}
        {isCollapsed && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-200 dark:bg-[#E1CB40]">
            <FiSun className="text-2xl text-orange-600 dark:text-[#03045E]" />
          </div>
        )}
      </div>

      {/* navigation menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {/* render each navigation section */}
        {menuSections.map((section) => (
          <div key={section.title} className="mb-8">
            {/* section title is hidden when collapsed */}
            {!isCollapsed && (
              <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-[#A59C94] dark:text-gray-400">
                {section.title}
              </p>
            )}

            <div className="space-y-2">
              {/* render every navigation item */}
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  title={isCollapsed ? item.name : ""}
                  className={({ isActive }) =>
                    `
                group
                relative
                flex
                w-full
                items-center
                rounded-2xl
                transition-all
                duration-300

                ${isCollapsed ? "justify-center py-4" : "gap-4 px-4 py-3"}

                ${
                  isActive
                    ? "bg-white dark:bg-[#253381] shadow-sm"
                    : "hover:bg-orange-50 dark:hover:bg-[#1B2D7A]"
                }
              `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* active page indicator */}
                      {isActive && (
                        <span
                          className="
                        absolute
                        left-0
                        top-1/2
                        h-8
                        w-1
                        -translate-y-1/2
                        rounded-r-full
                        bg-orange-400
                        dark:bg-[#E1CB40]
                      "
                        />
                      )}

                      {/* navigation icon */}
                      <span
                        className={`
                      shrink-0
                      transition-colors

                      ${
                        isActive
                          ? "text-orange-500 dark:text-[#E1CB40]"
                          : "text-[#746B63] dark:text-gray-300 group-hover:text-orange-500 dark:group-hover:text-[#E1CB40]"
                      }
                    `}
                      >
                        {item.icon}
                      </span>

                      {/* navigation label is hidden when collapsed */}
                      {!isCollapsed && (
                        <span
                          className={`
                        text-sm
                        font-medium

                        ${
                          isActive
                            ? "text-[#3A342E] dark:text-white"
                            : "text-[#746B63] dark:text-gray-300"
                        }
                      `}
                        >
                          {item.name}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* user information and logout */}
      <div className="border-t border-orange-100 dark:border-[#31429B] p-5">
        {!isCollapsed ? (
          <>
            {/* expanded user card */}
            <div className="flex items-center gap-3 rounded-2xl p-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-300 dark:bg-[#E1CB40] font-semibold text-orange-700 dark:text-[#03045E]">
                {userProfile?.first_name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="flex-1 overflow-hidden">
                <h4 className="truncate text-sm font-semibold text-[#574A3F] dark:text-white">
                  {userProfile
                    ? `${userProfile.first_name} ${userProfile.last_name}`
                    : "Guest"}
                </h4>

                <p className="truncate text-xs text-[#8A8178] dark:text-gray-300">
                  {userProfile?.email || ""}
                </p>
              </div>
            </div>

            {/* logout button */}
            <button
              onClick={handleLogout}
              className="
            mt-4
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-[#746B63]
            dark:text-gray-300
            transition
            hover:bg-orange-50
            dark:hover:bg-[#1B2D7A]
            hover:text-red-500
          "
            >
              <HiOutlineArrowRightOnRectangle size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <div>
            {/* compact user section */}
            <div className="flex flex-col items-center gap-4">
              <div
                title={userProfile?.first_name || "User"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-300 dark:bg-[#E1CB40] font-semibold text-orange-700 dark:text-[#03045E]"
              >
                {userProfile?.first_name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* compact logout button */}
              <button
                title="Logout"
                onClick={handleLogout}
                className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              text-[#746B63]
              dark:text-gray-300
              transition
              hover:bg-orange-50
              dark:hover:bg-[#1B2D7A]
              hover:text-red-500
            "
              >
                <HiOutlineArrowRightOnRectangle size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
