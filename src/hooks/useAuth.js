import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export default function useAuth() {
  // current authenticated session
  const [session, setSession] = useState(null);

  // logged in user's profile
  const [userProfile, setUserProfile] = useState(null);

  // loading state
  const [loading, setLoading] = useState(true);

  // auth related errors
  const [error, setError] = useState(null);

  // listen for login and logout events
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // fetch profile from supabase
  const fetchProfile = async () => {
    if (!session?.user) {
      setUserProfile(null);
      setLoading(false);
      return;
    }

    try {
      // reset loading and previous errors
      setLoading(true);
      setError(null);

      // fetch current user's profile
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      // save profile locally
      setUserProfile(data);
    } catch (err) {
      console.error(err);

      // store error message
      setError(err.message);
    } finally {
      // stop loading
      setLoading(false);
    }
  };

  // load profile whenever auth session changes
  useEffect(() => {
    fetchProfile();
  }, [session]);

  // update user's profile information
  const updateUserProfile = async (updatedProfile) => {
    if (!session?.user) {
      throw new Error("User not logged in.");
    }

    try {
      // clear previous errors
      setError(null);

      // update profile in database
      const { data, error } = await supabase
        .from("profiles")
        .update({
          first_name: updatedProfile.first_name,
          last_name: updatedProfile.last_name,
        })
        .eq("id", session.user.id)
        .select()
        .single();

      if (error) throw error;

      // update local profile state
      setUserProfile(data);

      return data;
    } catch (err) {
      // save error message and rethrow
      setError(err.message);
      throw err;
    }
  };

  // sign out current user
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    user: session?.user ?? null,

    userProfile,

    loading,
    error,

    fetchProfile,
    updateUserProfile,
    signOut,
  };
}