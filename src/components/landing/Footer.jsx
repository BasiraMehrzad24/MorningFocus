import { Link } from "react-router-dom";
import { HiOutlineSparkles, HiOutlineEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white dark:border-[#24359E] dark:bg-[#03045E]/10 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* brand section */}

          <div className="lg:col-span-2">
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

            <p className="mt-6 max-w-md leading-7 text-[#8A8178] dark:text-gray-400">
              MorningFocus helps you stay consistent by focusing on three
              meaningful goal every day with personalized AI motivation and
              progress tracking.
            </p>
          </div>

          {/* social links */}

          <div>
            <h3 className="mb-5 font-semibold text-[#574A3F] dark:text-white">
              Connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/BasiraMehrzad24"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/basira-mehrzad-3679ab25a"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="mailto:mehr.basira@gmail.com?subject=MorningFocus%20Portfolio"
                className="rounded-xl bg-orange-100 p-3 text-orange-500 transition hover:scale-105 dark:bg-[#16206B] dark:text-[#E1CB40]"
              >
                <HiOutlineEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* copyright */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-orange-100 pt-8 text-sm text-[#8A8178] dark:border-[#24359E] dark:text-gray-400 md:flex-row">
          <p>© 2026 MorningFocus. All rights reserved.</p>

          <p>
            Designed & Developed by <strong>Basira Mehrzad</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
