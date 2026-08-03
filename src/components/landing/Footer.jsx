import { Link } from "react-router-dom";
import { HiOutlineSparkles, HiOutlineEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white backdrop-blur-md dark:border-[#24359E] dark:bg-[#03045E]/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main Content */}
        <div className="flex flex-col justify-between gap-16 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="max-w-xl">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
                <HiOutlineSparkles
                  size={24}
                  className="text-orange-500 dark:text-[#E1CB40]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#574A3F] dark:text-white">
                  MorningFocus
                </h2>

                <p className="text-sm text-[#8A8178] dark:text-gray-400">
                  AI Daily Planner
                </p>
              </div>
            </Link>

            <p className="mt-6 leading-8 text-[#8A8178] dark:text-gray-400">
              MorningFocus helps you stay productive by focusing on three
              meaningful goals each day. Generate personalized AI motivation,
              actionable steps, track your progress, and build lasting
              productivity habits.
            </p>
          </div>

          {/* Connect */}
          <div className="min-w-[280px]">
            <h3 className="mb-6 text-xl font-semibold text-[#574A3F] dark:text-white">
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/BasiraMehrzad24"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/basira-mehrzad-3679ab25a"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="mailto:mehr.basira@gmail.com?subject=MorningFocus%20Portfolio"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition-all duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <HiOutlineEnvelope size={18} />
              </a>
            </div>

            <div className="mt-8 space-y-3 text-sm text-[#8A8178] dark:text-gray-400">
              <p className="font-medium">Frontend Developer</p>

              <p>React • Tailwind CSS • Supabase • OpenRouter AI</p>

              <p>
                Building modern AI-powered web applications with clean UI and
                practical user experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-orange-100 pt-8 text-sm text-[#8A8178] dark:border-[#24359E] dark:text-gray-400 md:flex-row">
          <p>© 2026 MorningFocus. All rights reserved.</p>

          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-[#574A3F] dark:text-white">
              Basira Mehrzad
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
