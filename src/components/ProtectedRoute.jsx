import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export default function ProtectedRoute({ children }) {
  // stores the current user session
  const [session, setSession] = useState(null);

  // keeps track of whether the auth check is still running
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if the user already has an active session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
      setLoading(false);
    };

    getSession();

    // listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // remove the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  // wait until the auth state has been checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // redirect unauthenticated users to the login page
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // render the protected page for authenticated users
  return children;
}
