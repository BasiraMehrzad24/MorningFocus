import { useState } from "react";
import { HiOutlineSparkles, HiOutlineCursorArrowRays } from "react-icons/hi2";
import { generateMotivation } from "../api/openRouter";

export default function GoalForm({
  goals,
  setGoals,
  setCurrentGoal,
  loading,
  setLoading,
  error,
  setError,
  setMotivation,
  addNotification,
  todayGoalsCount,
  hasReachedDailyLimit,
}) {
  // stores the text the user types into the textarea
  const [goal, setGoal] = useState("");

  // handles creating a new goal
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedGoal = goal.trim();

    // clear any previous validation errors
    setError("");

    // make sure the user entered something
    if (!trimmedGoal) {
      setError("Please enter your goal for today.");
      return;
    }

    // require a meaningful goal
    if (trimmedGoal.length < 5) {
      setError("Your goal must be at least 5 characters long.");
      return;
    }

    // start loading while waiting for the ai response
    setLoading(true);

    let aiResponse = "";

    try {
      // ask the ai to generate motivation and action steps
      aiResponse = await generateMotivation(trimmedGoal);
    } catch (error) {
      console.error(error);

      // notify the user if the request fails
      addNotification("Failed to generate motivation.", "error");

      // use a fallback motivation so the app still works
      aiResponse =
        "Stay focused. Every small step brings you closer to your goal.";
    } finally {
      // stop the loading spinner no matter what happens
      setLoading(false);
    }

    // create the new goal object
    const newGoal = {
      id: Date.now(),
      text: trimmedGoal,
      completed: false,
      createdAt: new Date().toISOString(),
      motivation: {
        motivation: aiResponse.motivation,
        steps: aiResponse.steps,
      },
    };

    // save the goal and make it the current active goal
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setCurrentGoal(newGoal);
    setMotivation(aiResponse);

    // clear the form for the next goal
    setGoal("");

    // show a success notification
    addNotification("Goal has been set successfully!");
  };

  return (
    <section className="mt-6 w-full">
      <div
        className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-[#1A237E]
        dark:bg-[#03045E]/10 backdrop-blur-md md:p-6"
      >
        {/* section header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
            <HiOutlineCursorArrowRays
              size={22}
              className="text-orange-500 dark:text-[#E1CB40]"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#574A3F] dark:text-white md:text-2xl">
              Today's Focus
            </h2>

            <p className="mt-1 text-sm text-[#8A8178] dark:text-gray-300">
              Set one meaningful goal for today.
            </p>
          </div>
        </div>

        {/* goal input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            disabled={hasReachedDailyLimit}
            rows={3}
            maxLength={150}
            placeholder="e.g. Finish my React portfolio project..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full resize-none rounded-2xl border border-orange-100 bg-[#FFFDF9] p-4 text-base text-[#574A3F] outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus:border-orange-300 dark:border-[#1A237E] dark:text-white dark:placeholder:text-gray-400 dark:focus:border-[#E1CB40] dark:disabled:bg-[#0E1550] dark:disabled:text-gray-500 dark:bg-[#03045E]/10 backdrop-blur-md"
          />

          {/* show the daily limit message */}
          {hasReachedDailyLimit && (
            <div className="rounded-xl bg-orange-50 p-3 text-sm text-orange-700 dark:bg-[#16206B] dark:text-[#E1CB40]">
              You've reached today's limit of 3 goals. Come back tomorrow to add
              more.
            </div>
          )}

          {/* display validation errors */}
          {error && (
            <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
          )}

          {/* footer actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* character counter */}
            <span className="text-sm text-[#8A8178] dark:text-gray-300">
              {goal.length}/150
            </span>

            {/* today's goal counter */}
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600 dark:bg-[#16206B] dark:text-[#E1CB40]">
              {todayGoalsCount}/3 Goals Today
            </span>

            {/* submit button */}
            <button
              type="submit"
              disabled={loading || hasReachedDailyLimit}
              className="flex items-center justify-center gap-2 rounded-2xl bg-orange-400 px-6 py-3 font-medium text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#E1CB40] dark:text-[#03045E] dark:hover:bg-[#F5DA57]"
            >
              <HiOutlineSparkles size={18} />

              {loading
                ? "Generating..."
                : hasReachedDailyLimit
                  ? "Daily Limit Reached"
                  : "Set Goal"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
