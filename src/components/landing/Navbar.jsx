import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { FiSun } from "react-icons/fi";

export default function Navbar({ darkMode, setDarkMode }) {
  // controls whether the mobile navigation is open
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orange-100/70 bg-white/80 backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* application logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-200 dark:bg-[#E1CB40]">
              <FiSun className="text-2xl text-orange-600 dark:text-[#03045E]" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#574A3F] dark:text-white">
                MorningFocus
              </h1>

              <p className="text-xs text-[#8A8178] dark:text-gray-400">
                AI Daily Planner
              </p>
            </div>
          </Link>

          {/* desktop navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            <a
              href="#features"
              className="text-[#6F675F] transition hover:text-orange-500 dark:text-gray-300 dark:hover:text-[#E1CB40]"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-[#6F675F] transition hover:text-orange-500 dark:text-gray-300 dark:hover:text-[#E1CB40]"
            >
              How it Works
            </a>
          </nav>

          {/* desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-orange-100 dark:hover:bg-[#16206B]"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <HiOutlineSun size={22} className="text-[#E1CB40]" />
              ) : (
                <HiOutlineMoon size={22} className="text-[#574A3F]" />
              )}
            </button>

            <Link
              to="/login"
              className="hidden rounded-xl px-5 py-2 font-medium text-[#574A3F] transition hover:bg-orange-50 dark:text-white dark:hover:bg-[#16206B] sm:block"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="
                rounded-xl
                px-4
                py-3
                text-center
    font-medium
    transition
   dark:bg-[#E1CB40]
    dark:text-[#03045E]
    dark:hover:bg-[#FFD84D]
    bg-orange-500
    text-white
    hover:bg-orange-600
  "
            >
              Sign Up
            </Link>
          </div>

          {/* mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl p-2 transition hover:bg-orange-100 dark:hover:bg-[#16206B]"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <HiOutlineSun size={24} className="text-[#E1CB40]" />
              ) : (
                <HiOutlineMoon
                  size={24}
                  className="text-[#574A3F] dark:text-white"
                />
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 transition hover:bg-orange-100 dark:hover:bg-[#16206B]"
            >
              {isOpen ? (
                <HiOutlineXMark
                  size={28}
                  className="text-[#574A3F] dark:text-white"
                />
              ) : (
                <HiOutlineBars3
                  size={28}
                  className="text-[#574A3F] dark:text-white"
                />
              )}
            </button>
          </div>
        </div>

        {/* mobile navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="border-t border-orange-100 bg-white px-6 py-6 dark:border-[#1A237E] dark:bg-[#03045E]">
            <div className="flex flex-col gap-5">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[#574A3F] dark:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[#574A3F] dark:text-white"
              >
                How it Works
              </a>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-orange-200 px-4 py-3 text-center font-medium text-[#574A3F] dark:border-[#24359E] dark:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="
                rounded-xl
                px-4
                py-3
                text-center
    font-medium
    transition
   dark:bg-[#E1CB40]
    dark:text-[#03045E]
    dark:hover:bg-[#FFD84D]
    bg-orange-500
    text-white
    hover:bg-orange-600
  "
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
