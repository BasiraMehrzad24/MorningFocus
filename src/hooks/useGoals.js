import { useState, useEffect, useMemo } from "react";
import { calculateStreak } from "../utils/calculateStreak";

export default function useGoals() {
  // store all goals and restore them from local storage
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  // keep track of the latest active goal
  const [currentGoal, setCurrentGoal] = useState(null);

  // save the ai motivation related to the current goal
  const [motivation, setMotivation] = useState("");

  // loading state while generating ai responses
  const [loading, setLoading] = useState(false);

  // store possible errors from api requests
  const [error, setError] = useState("");

  // add a new goal to the existing list
  const addGoal = (goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  // save goals whenever they change
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // always keep the newest goal as the current goal
  useEffect(() => {
    if (goals.length > 0) {
      const latestGoal = goals[goals.length - 1];

      setCurrentGoal(latestGoal);
      setMotivation(latestGoal.motivation || "");
    } else {
      setCurrentGoal(null);
      setMotivation("");
    }
  }, [goals]);

  // today's date is used to check the daily goal limit
const today = new Date().toDateString();
  // count how many goals were created today
  const todayGoalsCount = useMemo(() => {
    return goals.filter(
      (goal) => new Date(goal.createdAt).toDateString() === today
    ).length;
  }, [goals, today]);

  // users can only create three goals each day
  const hasReachedDailyLimit = todayGoalsCount >= 3;

  // calculate the current productivity streak
  const streak = useMemo(() => calculateStreak(goals), [goals]);

  // remove a goal and update the current goal if needed
  const deleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);

    if (updatedGoals.length > 0) {
      const latest = updatedGoals[updatedGoals.length - 1];
      setCurrentGoal(latest);
      setMotivation(latest.motivation || "");
    } else {
      setCurrentGoal(null);
      setMotivation("");
    }
  };

  // expose everything that other components need
return {
  goals,
  currentGoal,
  motivation,
  loading,
  error,

  streak,
  todayGoalsCount,
  hasReachedDailyLimit,

  addGoal,
  deleteGoal,

  setGoals,
  setCurrentGoal,
  setMotivation,
  setLoading,
  setError,
};
}