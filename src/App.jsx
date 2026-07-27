import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Today from "./pages/Today";
import HistoryPage from "./pages/HistoryPage";
import Reflection from "./pages/Reflection";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile";
import MotivationHistory from "./pages/MotivationHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import useTheme from "./hooks/useTheme";
import useNotifications from "./hooks/useNotifications";
import useGoals from "./hooks/useGoals";
import useAuth from "./hooks/useAuth";

import morningBg from "./assets/images/morningBaground.webp";

function App() {
  // theme
  const { darkMode, setDarkMode } = useTheme();

  // notification system
  const {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    clearNotifications,
  } = useNotifications();

  // goal management
  const {
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

    streak,
    todayGoalsCount,
    hasReachedDailyLimit,

    deleteGoal,
  } = useGoals();

  // authentication and profile
  const { session, user, userProfile, updateUserProfile } = useAuth();

  // sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected dashboard layout */}
      <Route
        path="/*"
        element={
          <div
            className={`min-h-screen ${
              darkMode ? "bg-fixed bg-cover bg-center" : "bg-[#FFF8F0]"
            }`}
            style={
              darkMode
                ? {
                    backgroundImage: `
                      linear-gradient(
                        rgba(3,4,94,.65),
                        rgba(3,4,94,.65)
                      ),
                      url(${morningBg})
                    `,
                  }
                : undefined
            }
          >
            {/* sidebar */}
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              userProfile={userProfile}
            />

            {/* main content */}
            <main
              className={`min-h-screen transition-all duration-300 ${
                isCollapsed ? "ml-24" : "ml-80"
              }`}
            >
              {/* top header */}
              <Header
                notifications={notifications}
                markAsRead={markAsRead}
                clearNotifications={clearNotifications}
                removeNotification={removeNotification}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                streak={streak}
                userProfile={userProfile}
              />

              {/* page content */}
              <div className="overflow-y-auto">
                <Routes>
                  {/* today page */}
                  <Route
                    path="/today"
                    element={
                      <ProtectedRoute>
                        <Today
                          goals={goals}
                          setGoals={setGoals}
                          currentGoal={currentGoal}
                          setCurrentGoal={setCurrentGoal}
                          motivation={motivation}
                          setMotivation={setMotivation}
                          loading={loading}
                          setLoading={setLoading}
                          error={error}
                          setError={setError}
                          addNotification={addNotification}
                          todayGoalsCount={todayGoalsCount}
                          hasReachedDailyLimit={hasReachedDailyLimit}
                          darkMode={darkMode}
                        />
                      </ProtectedRoute>
                    }
                  />

                  {/* goal history */}
                  <Route
                    path="/history"
                    element={
                      <ProtectedRoute>
                        <HistoryPage
                          goals={goals}
                          setGoals={setGoals}
                          addNotification={addNotification}
                        />
                      </ProtectedRoute>
                    }
                  />

                  {/* motivation history */}
                  <Route
                    path="/motivation-history"
                    element={
                      <ProtectedRoute>
                        <MotivationHistory
                          goals={goals}
                          addNotification={addNotification}
                          onDelete={deleteGoal}
                        />
                      </ProtectedRoute>
                    }
                  />

                  {/* weekly reflection */}
                  <Route
                    path="/reflection"
                    element={
                      <ProtectedRoute>
                        <Reflection goals={goals} />
                      </ProtectedRoute>
                    }
                  />

                  {/* preferences */}
                  <Route
                    path="/preferences"
                    element={
                      <ProtectedRoute>
                        <Preferences
                          darkMode={darkMode}
                          setDarkMode={setDarkMode}
                          userProfile={userProfile}
                          updateUserProfile={updateUserProfile}
                        />
                      </ProtectedRoute>
                    }
                  />

                  {/* user profile */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile
                          darkMode={darkMode}
                          userProfile={userProfile}
                          updateUserProfile={updateUserProfile}
                          session={session}
                          addNotification={addNotification}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
