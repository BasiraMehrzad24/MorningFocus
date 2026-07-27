import GoalForm from "../components/GoalForm";
import MotivationCard from "../components/MotivationCard";
import ProgressCard from "../components/ProgressCard";
import History from "../components/History";

export default function Today({
  goals,
  setGoals,
  currentGoal,
  setCurrentGoal,
  motivation,
  setMotivation,
  loading,
  setLoading,
  error,
  setError,
  addNotification,
  darkMode,
  todayGoalsCount,
}) {
  // get today's date
  const today = new Date().toDateString();

  // filter goals created today
  const todayGoals = goals.filter(
    (goal) => new Date(goal.createdAt).toDateString() === today,
  );

  // limit users to three goals per day
  const hasReachedLimit = todayGoals.length >= 3;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* goal creation form */}
      <GoalForm
        goals={goals}
        setGoals={setGoals}
        setCurrentGoal={setCurrentGoal}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        setMotivation={setMotivation}
        addNotification={addNotification}
        hasGoalToday={hasReachedLimit}
        todayGoalsCount={todayGoalsCount}
      />

      {/* motivation and progress cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MotivationCard
          motivation={motivation}
          loading={loading}
          addNotification={addNotification}
        />

        <ProgressCard goals={goals} darkMode={darkMode} />
      </div>

      {/* today's goals history */}
      <History
        goals={goals}
        setGoals={setGoals}
        addNotification={addNotification}
      />
    </div>
  );
}
