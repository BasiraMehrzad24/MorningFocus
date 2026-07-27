import { useState, useMemo, useEffect } from "react";
import { HiOutlineLightBulb, HiOutlineArrowLeft } from "react-icons/hi2";
import { generateWeeklyReflection } from "../api/weeklyReflection";
import { Link } from "react-router-dom";

export default function Reflection({ goals }) {
  const [loading, setLoading] = useState(false);
  const [reflection, setReflection] = useState(null);
  const [error, setError] = useState("");

  // Calculate the current week's starting date (last 7 days)
  const weekStart = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);
    return start;
  }, []);

  // Calculate the current week's ending date
  const weekEnd = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  }, []);

  // Filter goals created during the current week
  const weeklyGoals = useMemo(() => {
    return goals.filter((goal) => {
      const goalDate = new Date(goal.createdAt);

      return goalDate >= weekStart && goalDate <= weekEnd;
    });
  }, [goals, weekStart, weekEnd]);

  // Separate completed and pending goals
  const completedGoals = weeklyGoals.filter((goal) => goal.completed);

  const pendingGoals = weeklyGoals.filter((goal) => !goal.completed);

  // Calculate weekly completion percentage
  const completionRate =
    weeklyGoals.length === 0
      ? 0
      : Math.round((completedGoals.length / weeklyGoals.length) * 100);

  // Convert weekly goals into a readable list for the AI prompt
  const formattedGoals = weeklyGoals
    .map((goal) => `${goal.completed ? "✓" : "✗"} ${goal.text}`)
    .join("\n");

  // Weekly statistics object
  const weeklyStats = {
    totalGoals: weeklyGoals.length,
    completedGoals: completedGoals.length,
    pendingGoals: pendingGoals.length,
    completionRate,
  };

  // Generate the weekly reflection using AI
  const handleGenerateReflection = async () => {
    if (weeklyGoals.length === 0) {
      setError("No goals found this week.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await generateWeeklyReflection({
        weeklyStats,
        formattedGoals,
      });

      const report = {
        ...result,
        createdAt: new Date().toISOString(),
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        stats: weeklyStats,
      };

      setReflection(report);

      localStorage.setItem("weeklyReflection", JSON.stringify(report));
    } catch (err) {
      console.error(err);
      setError("Failed to generate weekly reflection.");
    } finally {
      setLoading(false);
    }
  };

  // Restore this week's reflection if it already exists
  useEffect(() => {
    const saved = localStorage.getItem("weeklyReflection");

    if (!saved) return;

    try {
      const report = JSON.parse(saved);

      const savedWeekStart = new Date(report.weekStart).toDateString();
      const currentWeekStart = weekStart.toDateString();

      if (savedWeekStart === currentWeekStart) {
        setReflection(report);
      } else {
        // Remove outdated reports from previous weeks
        localStorage.removeItem("weeklyReflection");
      }
    } catch (err) {
      console.error(err);
    }
  }, [weekStart]);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
        {/* page header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* reflection title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
              <HiOutlineLightBulb
                size={28}
                className="text-orange-500 dark:text-[#E1CB40]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#574A3F] dark:text-white">
                Weekly Reflection
              </h1>

              <p className="text-sm text-[#8A8178] dark:text-gray-300">
                AI will summarize your weekly productivity.
              </p>
            </div>
          </div>

          {/* navigation and action buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/today"
              className="group flex items-center gap-2 rounded-2xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-100 hover:shadow-sm dark:border-[#24359E] dark:text-[#E1CB40] dark:hover:bg-[#16206B]"
            >
              <HiOutlineArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>Back</span>
            </Link>

            <button
              onClick={handleGenerateReflection}
              disabled={loading}
              className="
            rounded-2xl
            bg-orange-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:bg-[#E1CB40]
            dark:text-[#03045E]
            dark:hover:bg-[#F5DA57]
          "
            >
              {loading
                ? "Generating..."
                : reflection
                  ? "Regenerate Report"
                  : "Generate Report"}
            </button>
          </div>
        </div>

        {/* error message */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* weekly statistics */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {/* total goals */}
          <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#03045E]/10">
            <p className="text-sm text-[#8A8178] dark:text-gray-300">
              Total Goals
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#574A3F] dark:text-white">
              {weeklyStats.totalGoals}
            </h2>
          </div>

          {/* completed goals */}
          <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#03045E]/10">
            <p className="text-sm text-[#8A8178] dark:text-gray-300">
              Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-500">
              {weeklyStats.completedGoals}
            </h2>
          </div>

          {/* pending goals */}
          <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#03045E]/10">
            <p className="text-sm text-[#8A8178] dark:text-gray-300">Pending</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-500 dark:text-[#E1CB40]">
              {weeklyStats.pendingGoals}
            </h2>
          </div>

          {/* completion percentage */}
          <div className="rounded-2xl bg-orange-50 p-5 dark:bg-[#03045E]/10">
            <p className="text-sm text-[#8A8178] dark:text-gray-300">
              Completion Rate
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-500 dark:text-[#E1CB40]">
              {weeklyStats.completionRate}%
            </h2>
          </div>
        </div>

        {/* ai-generated reflection */}
        {reflection && (
          <div className="mt-8 space-y-5">
            {/* reflection overview */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8A8178] dark:text-gray-400">
                    Weekly Reflection
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#574A3F] dark:text-white">
                    AI Productivity Report
                  </h2>
                </div>

                {/* weekly productivity score */}
                {reflection.score && (
                  <div className="text-right">
                    <p className="text-sm text-[#8A8178] dark:text-gray-400">
                      Weekly Score
                    </p>

                    <h2 className="text-4xl font-bold text-orange-500 dark:text-[#E1CB40]">
                      {reflection.score}/100
                    </h2>
                  </div>
                )}
              </div>
            </div>

            {/* summary */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <h3 className="mb-4 text-xl font-semibold text-[#574A3F] dark:text-white">
                Weekly Summary
              </h3>

              <p className="leading-8 text-[#8A8178] dark:text-gray-300">
                {reflection.summary}
              </p>
            </div>

            {/* strengths */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <h3 className="mb-4 text-xl font-semibold text-[#574A3F] dark:text-white">
                Strengths
              </h3>

              <p className="leading-8 text-[#8A8178] dark:text-gray-300">
                {reflection.strengths}
              </p>
            </div>

            {/* improvements */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <h3 className="mb-4 text-xl font-semibold text-[#574A3F] dark:text-white">
                Improvements
              </h3>

              <p className="leading-8 text-[#8A8178] dark:text-gray-300">
                {reflection.improvements}
              </p>
            </div>

            {/* motivation */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <h3 className="mb-4 text-xl font-semibold text-[#574A3F] dark:text-white">
                Motivation
              </h3>

              <p className="leading-8 text-[#8A8178] dark:text-gray-300">
                {reflection.motivation}
              </p>
            </div>

            {/* next week tip */}
            <div className="rounded-3xl border border-orange-100 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-[#1A237E] dark:bg-[#03045E]/10">
              <h3 className="mb-4 text-xl font-semibold text-[#574A3F] dark:text-white">
                Next Week Tip
              </h3>

              <p className="leading-8 text-[#8A8178] dark:text-gray-300">
                {reflection.nextWeekTip}
              </p>

              {/* report generation timestamp */}
              <p className="mt-4 text-sm text-[#8A8178] dark:text-gray-400">
                Generated on {new Date(reflection.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
