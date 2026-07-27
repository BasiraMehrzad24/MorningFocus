import { HiOutlineChartBar } from "react-icons/hi2";

export default function ProgressCard({ goals, darkMode }) {
  // calculate basic goal statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const pendingGoals = totalGoals - completedGoals;

  // calculate completion percentage
  const progress =
    totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  // calculate how many consecutive days the user completed at least one goal
  const calculateStreak = () => {
    // keep only completed goals
    const completed = goals.filter((goal) => goal.completed);

    // return zero if nothing has been completed
    if (!completed.length) return 0;

    // collect unique completion dates (ignore the time)
    const uniqueDays = [
      ...new Set(
        completed.map((goal) => {
          const date = new Date(goal.createdAt);

          // remove the time so only the calendar day remains
          date.setHours(0, 0, 0, 0);

          return date.getTime();
        }),
      ),
    ].sort((a, b) => b - a);

    let streak = 0;

    // compare completed days with today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // stop counting as soon as a day is missing
    for (let i = 0; i < uniqueDays.length; i++) {
      const diff = (today.getTime() - uniqueDays[i]) / (1000 * 60 * 60 * 24);

      if (diff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  // values used to draw the circular progress indicator
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // determine how much of the circle should be visible
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // detect the current theme for the progress stroke color
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-[#1A237E]    dark:bg-[#03045E]/10  backdrop-blur-md">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 dark:bg-[#16206B]">
          <HiOutlineChartBar
            className="text-orange-500 dark:text-[#E1CB40]"
            size={24}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#574A3F] dark:text-white">
            Progress
          </h2>

          <p className="text-sm text-[#8A8178] dark:text-gray-300">
            Track your daily achievements
          </p>
        </div>
      </div>

      {/* progress circle */}
      <div className="flex justify-center">
        <div className="relative h-44 w-44">
          <svg width="176" height="176" className="-rotate-90">
            <circle
              cx="88"
              cy="88"
              r={normalizedRadius}
              fill="transparent"
              stroke={darkMode ? "#FFA500" : "#FDE7C3"}
              strokeWidth={stroke}
            />

            <circle
              cx="88"
              cy="88"
              r={normalizedRadius}
              fill="transparent"
              stroke={isDark ? "#E1CB40" : "#F59E0B"}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#574A3F] dark:text-white">
              {progress}%
            </span>

            <span className="mt-1 text-sm text-[#8A8178] dark:text-gray-300">
              Complete
            </span>
          </div>
        </div>
      </div>

      {/* statistics */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[#8A8178] dark:text-gray-300">Total Goals</span>

          <span className="font-semibold text-[#574A3F] dark:text-white">
            {totalGoals}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#8A8178] dark:text-gray-300">Completed</span>

          <span className="font-semibold text-green-600 dark:text-green-400">
            {completedGoals}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#8A8178] dark:text-gray-300">Pending</span>

          <span className="font-semibold text-orange-500 dark:text-[#E1CB40]">
            {pendingGoals}
          </span>
        </div>
      </div>

      {/* completion streak */}
      <div className="mt-8 rounded-2xl border border-orange-200/20 bg-orange-100/70 p-4 dark:border-[#31429B]    dark:bg-[#03045E]/10 backdrop-blur-md]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#8A8178] dark:text-gray-400">
              🔥 Completion Streak
            </p>

            <h3 className="mt-1 text-3xl font-bold text-orange-500 dark:text-[#E1CB40]">
              {streak}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm text-[#8A8178] dark:text-gray-300">
              {streak === 1 ? "Day" : "Days"}
            </p>

            <p className="text-xs text-[#A59C94] dark:text-gray-400">
              Completed Consecutively
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-8 rounded-2xl bg-orange-50 p-4 text-center    dark:bg-[#03045E]/10 backdrop-blur-md">
        <p className="font-medium text-[#574A3F] dark:text-white">
          {totalGoals === 0
            ? "Create your first goal today!"
            : completedGoals === totalGoals
              ? "Amazing! You've completed all your goals!"
              : `You've completed ${completedGoals} of ${totalGoals} goals.`}
        </p>
      </div>
    </section>
  );
}
