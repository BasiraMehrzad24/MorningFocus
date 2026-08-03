import {
  HiOutlineCheckCircle,
  HiOutlineClipboardDocument,
  HiOutlineTrash,
  HiOutlineSparkles,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from "react-icons/hi2";
import { formatHistoryDate } from "../utils/formatHistoryDate";

export default function ActivityHistoryCard({
  goals = [],
  addNotification,
  onDelete,
}) {
  // copy the ai motivation for a specific goal
  const handleCopy = async (goal) => {
    // stop if the goal has no motivation
    if (!goal?.motivation) return;

    try {
      // combine the motivation text and action steps
      const text = [
        goal.motivation.motivation,
        "",
        ...(goal.motivation.steps || []),
      ].join("\n");

      // copy the text to the clipboard
      await navigator.clipboard.writeText(text);

      // show a success notification
      addNotification?.("Motivation copied to clipboard.");
    } catch {
      // show an error notification if copying fails
      addNotification?.("Failed to copy motivation.");
    }
  };

  // display an empty state if there are no saved goals
  if (!goals.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center py-24">
            <HiOutlineClock
              size={60}
              className="text-orange-400 dark:text-[#E1CB40]"
            />

            <h2 className="mt-6 text-3xl font-bold text-[#574A3F] dark:text-white">
              No history yet
            </h2>

            <p className="mt-3 text-[#8A8178] dark:text-gray-400">
              Complete your first goal to build your activity history.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      {goals
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((goal) => (
          <div
            key={goal.id}
            className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md"
          >
            {/* Header */}

            <div className="flex items-start justify-between border-b border-orange-100 p-6 dark:border-[#24359E]">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
                  <HiOutlineCheckCircle
                    size={24}
                    className={
                      goal.completed
                        ? "text-green-500"
                        : "text-orange-500 dark:text-[#E1CB40]"
                    }
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#574A3F] dark:text-white">
                    {goal.text}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-[#8A8178] dark:text-gray-400">
                    <HiOutlineCalendarDays size={16} />
                    <span>{formatHistoryDate(goal.createdAt)}</span>
                  </div>
                </div>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  goal.completed
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-orange-100 text-orange-600 dark:bg-[#16206B] dark:text-[#E1CB40]"
                }`}
              >
                {goal.completed ? "Completed" : "Pending"}
              </span>
            </div>

            {/* Motivation */}

            {goal.motivation && (
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-[#16206B]">
                    <HiOutlineSparkles
                      size={20}
                      className="text-orange-500 dark:text-[#E1CB40]"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#574A3F] dark:text-white">
                      AI Motivation
                    </h3>

                    <p className="text-sm text-[#8A8178] dark:text-gray-400">
                      Generated for this goal
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#16206B]">
                  <p className="text-lg italic leading-8 text-[#574A3F] dark:text-white">
                    "{goal.motivation.motivation}"
                  </p>

                  {goal.motivation.steps?.length > 0 && (
                    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[#574A3F] dark:text-gray-200">
                      {goal.motivation.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}

            <div className="flex items-center justify-end gap-3 border-t border-orange-100 p-5 dark:border-[#24359E]">
              <button
                onClick={() => handleCopy(goal)}
                className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100 dark:bg-[#16206B] dark:text-[#E1CB40] dark:hover:bg-[#24359E]"
              >
                <HiOutlineClipboardDocument size={18} />
                Copy
              </button>

              <button
                onClick={() => onDelete(goal.id)}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40"
              >
                <HiOutlineTrash size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
    </section>
  );
}
