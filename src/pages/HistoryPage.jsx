import History from "../components/History";

export default function HistoryPage({ goals, setGoals, addNotification }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* render the history component in full history mode */}

      <History
        goals={goals}
        setGoals={setGoals}
        addNotification={addNotification}
        showAll={true}
      />
    </div>
  );
}
