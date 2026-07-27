import {
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineClipboardDocument,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function MotivationCard({
  motivation,
  loading,
  addNotification,
}) {
  // copy the generated motivation to the clipboard
  const handleCopy = async () => {
    if (!motivation) return;

    try {
      await navigator.clipboard.writeText(motivation);

      addNotification("Motivation copied to clipboard.");
    } catch (error) {
      addNotification("Failed to copy motivation.", "error");
    }
  };

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
      {/* card header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
            <HiOutlineFire
              size={22}
              className="text-orange-500 dark:text-[#E1CB40]"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#574A3F] dark:text-white">
              Morning Motivation
            </h3>

            <p className="text-sm text-[#8A8178] dark:text-gray-300">
              Your daily inspiration
            </p>
          </div>
        </div>

        {/* navigate to the motivation history page */}
        <Link
          to="/motivation-history"
          className="flex items-center gap-2 text-sm font-medium text-orange-500 transition hover:text-orange-600 dark:text-[#E1CB40]"
        >
          <span>View All</span>

          <HiOutlineArrowRight size={20} />
        </Link>
      </div>

      {/* motivation content */}
      <div className="rounded-2xl p-5 dark:bg-[#03045E]/10 backdrop-blur-md">
        {loading ? (
          // show skeleton placeholders while waiting for the ai response
          <div className="animate-pulse space-y-3">
            <div className="h-5 w-full rounded bg-orange-100 dark:bg-[#24359E]" />
            <div className="h-5 w-5/6 rounded bg-orange-100 dark:bg-[#24359E]" />
            <div className="h-5 w-3/4 rounded bg-orange-100 dark:bg-[#24359E]" />
          </div>
        ) : (
          <div className="text-[#574A3F] transition-all duration-500 dark:text-white">
            {motivation ? (
              <>
                {/* ai motivational message */}
                <p className="text-lg italic">{motivation.motivation}</p>

                {/* suggested action steps */}
                <ol className="mt-5 list-decimal space-y-2 pl-6">
                  {motivation.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </>
            ) : (
              // shown before the user creates their first goal
              <p>Create a goal to receive your AI-generated motivation.</p>
            )}
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-orange-50 p-4 dark:bg-[#16206B]">
        <div className="flex items-center gap-3">
          <HiOutlineSparkles
            size={20}
            className="text-orange-500 dark:text-[#E1CB40]"
          />

          <p className="text-sm text-[#6F675F] dark:text-gray-300">
            Save this motivation and come back to it whenever you need a boost.
          </p>
        </div>

        {/* copy button is only shown when a motivation exists */}
        {motivation && (
          <button
            onClick={handleCopy}
            title="Copy motivation"
            className="rounded-xl p-2 text-orange-500 transition hover:bg-orange-100 hover:text-orange-600 dark:text-[#E1CB40] dark:hover:bg-[#24359E]"
          >
            <HiOutlineClipboardDocument size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
