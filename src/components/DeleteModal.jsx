import { HiOutlineTrash } from "react-icons/hi2";

export default function DeleteModal({ isOpen, goal, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-6 shadow-xl dark:border-[#E1CB40]/30 dark:bg-[#03045E]">
        {/* icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
          <HiOutlineTrash
            className="text-red-500 dark:text-red-400"
            size={30}
          />
        </div>

        {/* title */}
        <h2 className="mt-5 text-center text-2xl font-bold text-[#574A3F] dark:text-white">
          Delete Goal?
        </h2>

        <p className="mt-3 text-center text-[#8A8178] dark:text-gray-300">
          Are you sure you want to delete
          {goal && (
            <>
              <br />
              <span className="font-semibold text-[#574A3F] dark:text-[#E1CB40]">
                "{goal.text}"
              </span>
            </>
          )}
        </p>

        {/* buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-orange-100 py-3 font-medium text-[#574A3F] transition hover:bg-orange-50 dark:border-[#E1CB40]/30 dark:bg-[#0B1275] dark:text-white dark:hover:bg-[#16208A]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
          >
            <HiOutlineTrash size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
