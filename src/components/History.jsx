import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineTrash,
  HiOutlineArrowLeft,
} from "react-icons/hi2";
import { formatHistoryDate } from "../utils/formatHistoryDate";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

export default function History({
  goals,
  setGoals,
  addNotification,
  showAll = false,
}) {
  // controls the delete confirmation modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // stores the goal selected for deletion
  const [selectedGoal, setSelectedGoal] = useState(null);

  // get today's date
  const today = new Date().toDateString();

  // filter and sort goals depending on the current page
  const displayedGoals = (
    showAll
      ? goals
      : goals.filter(
          (goal) => new Date(goal.createdAt).toDateString() === today,
        )
  ).toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // switch a goal between completed and pending
  const toggleGoalStatus = (id) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    setGoals((prevGoals) =>
      prevGoals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g,
      ),
    );

    addNotification(
      goal.completed
        ? `"${goal.text}" marked as pending.`
        : `"${goal.text}" completed!`,
    );
  };

  // permanently remove the selected goal
  const deleteGoal = () => {
    setGoals((prev) => prev.filter((g) => g.id !== selectedGoal.id));

    addNotification(`"${selectedGoal.text}" deleted.`);

    setIsDeleteOpen(false);
    setSelectedGoal(null);
  };

  // open the confirmation modal
  const openDeleteModal = (goal) => {
    setSelectedGoal(goal);
    setIsDeleteOpen(true);
  };

  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-orange-100 bg-white shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10  backdrop-blur-md">
        {/* header */}
        <div className="flex items-center justify-between border-b border-orange-100 p-6 dark:border-[#1A237E]">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
              <HiOutlineClock
                className="text-orange-500 dark:text-[#E1CB40]"
                size={22}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#574A3F] dark:text-white">
                {showAll ? "Goal History" : "Today's Goals"}
              </h2>

              <p className="text-sm text-[#8A8178] dark:text-gray-300">
                {showAll
                  ? "Your previous focus sessions"
                  : "Today's focus sessions"}
              </p>
            </div>
          </div>

          {/* Right */}
          {showAll ? (
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
          ) : (
            <Link
              to="/history"
              className="flex items-center gap-2 text-sm font-medium text-orange-500 transition hover:text-orange-600 dark:text-[#E1CB40]"
            >
              View All
              <HiOutlineArrowRight />
            </Link>
          )}
        </div>
        {/* goal list */}
        <div className="divide-y divide-orange-100 dark:divide-[#1A237E]">
          {displayedGoals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <HiOutlineClock
                size={48}
                className="text-orange-300 dark:text-[#E1CB40]"
              />

              <h3 className="mt-4 text-lg font-semibold text-[#574A3F] dark:text-white">
                {showAll ? "No goals yet" : "No goals for today"}
              </h3>

              <p className="mt-2 text-sm text-[#8A8178] dark:text-gray-300">
                {showAll
                  ? "Your goals will appear here after you create one."
                  : "Set your first goal to start today's focus."}
              </p>
            </div>
          ) : (
            displayedGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-5 transition hover:bg-orange-50 dark:hover:bg-[#16206B]"
              >
                {/* left */}
                <div className="flex items-center gap-4">
                  <HiOutlineCheckCircle
                    size={22}
                    className={
                      goal.completed
                        ? "text-green-500"
                        : "text-orange-400 dark:text-[#E1CB40]"
                    }
                  />

                  <div>
                    <h3 className="font-medium text-[#574A3F] dark:text-white">
                      {goal.text}
                    </h3>

                    <p className="text-sm text-[#8A8178] dark:text-gray-300">
                      {formatHistoryDate(goal.createdAt)}
                    </p>
                  </div>
                </div>

                {/* right */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGoalStatus(goal.id)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                      goal.completed
                        ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-800/40"
                        : "bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-[#16206B] dark:text-[#E1CB40] dark:hover:bg-[#24359E]"
                    }`}
                  >
                    {goal.completed ? "Completed" : "Pending"}
                  </button>

                  <button
                    onClick={() => openDeleteModal(goal)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600 dark:bg-red-900/30 dark:hover:bg-red-800/50"
                    title="Delete Goal"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        goal={selectedGoal}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedGoal(null);
        }}
        onConfirm={deleteGoal}
      />
    </section>
  );
}
