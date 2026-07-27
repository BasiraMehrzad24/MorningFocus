import {
  HiOutlineFire,
  HiOutlineClock,
  HiOutlineArrowLeft,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

import MotivationHistoryCard from "../components/MotivationHistoryCard";

export default function MotivationHistory({
  goals,
  addNotification,
  onDelete,
}) {
  // keep only goals that have ai-generated motivation
  // then reverse them so the newest appears first
  const motivationGoals = goals
    .filter((goal) => goal.motivation)
    .slice()
    .reverse();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* page container */}

      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
        {/* page header */}

        <div className="flex items-center justify-between border-b border-orange-100 px-8 py-7 dark:border-[#24359E]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
              <HiOutlineFire
                size={28}
                className="text-orange-500 dark:text-[#E1CB40]"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#574A3F] dark:text-white">
                Motivation History
              </h2>

              <p className="text-[#8A8178] dark:text-gray-400">
                Your previous AI motivations
              </p>
            </div>
          </div>

          <Link
            to="/today"
            className="group flex items-center gap-2 rounded-2xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-100 hover:shadow-sm dark:border-[#24359E] dark:text-[#E1CB40] dark:hover:bg-[#16206B]"
          >
            <HiOutlineArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back</span>
          </Link>
        </div>

        {/* page content */}

        <div className="p-8">
          {motivationGoals.length === 0 ? (
            /* empty state */

            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-300 dark:border-[#E1CB40]">
                <HiOutlineClock
                  size={34}
                  className="text-orange-400 dark:text-[#E1CB40]"
                />
              </div>

              <h3 className="text-4xl font-bold text-[#574A3F] dark:text-white">
                No motivations yet
              </h3>

              <p className="mt-4 max-w-xl text-center text-lg text-[#8A8178] dark:text-gray-400">
                Create your first goal and MorningFocus AI will generate your
                first motivation.
              </p>
            </div>
          ) : (
            /* motivation list */

            <div className="space-y-6">
              {motivationGoals.map((goal) => (
                <MotivationHistoryCard
                  key={goal.id}
                  goal={goal}
                  addNotification={addNotification}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
