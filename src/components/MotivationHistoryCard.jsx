import {
  HiOutlineClipboardDocument,
  HiOutlineCalendarDays,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function MotivationHistoryCard({
  goal,
  addNotification,
  onDelete,
}) {
  // copy the motivation and action steps to the clipboard
  const handleCopy = async () => {
    const text = `${goal.motivation.motivation}

1. ${goal.motivation.steps[0]}
2. ${goal.motivation.steps[1]}
3. ${goal.motivation.steps[2]}`;

    try {
      await navigator.clipboard.writeText(text);
      addNotification("Motivation copied!");
    } catch {
      addNotification("Failed to copy motivation.", "error");
    }
  };

  // remove this motivation from history
  const handleDelete = () => {
    onDelete(goal.id);
    addNotification("Motivation deleted.");
  };

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
      {/* action buttons */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#8A8178] dark:text-gray-400">
              <HiOutlineCalendarDays size={16} />
              <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy Motivation"
            className="rounded-xl p-2 text-orange-500 transition hover:bg-orange-100 hover:text-orange-600 dark:text-[#E1CB40] dark:hover:bg-[#16206B]"
          >
            <HiOutlineClipboardDocument size={22} />
          </button>

          <button
            onClick={handleDelete}
            title="Delete Motivation"
            className="rounded-xl p-2 text-red-500 transition hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <HiOutlineTrash size={22} />
          </button>
        </div>
      </div>

      {/* goal that generated this motivation */}
      <div className="mb-6 rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4 dark:border-[#24359E] dark:bg-[#16206B]">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 dark:text-[#E1CB40]">
          Today's Goal
        </p>

        <h4 className="mt-2 text-lg font-semibold text-[#574A3F] dark:text-white">
          {goal.text}
        </h4>
      </div>

      {/* ai generated motivation */}
      <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#16206B]">
        <p className="text-lg italic leading-8 text-[#574A3F] dark:text-white">
          {goal.motivation.motivation}
        </p>

        {/* display the suggested action steps */}
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-[#574A3F] dark:text-gray-200">
          {goal.motivation.steps.map((step, index) => (
            <li key={index} className="leading-7">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
