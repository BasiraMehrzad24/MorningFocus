import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { supabase } from "../api/supabase";
import useTheme from "../hooks/useTheme";

export default function Signup() {
  // current theme
  const { darkMode } = useTheme();

  // signup form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // update input values
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit user to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // create user in supabase auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // save additional profile information
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
      });

      if (profileError) throw profileError;

      alert("Account created successfully!");

      // reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FFF8F0] px-6 dark:bg-[#03045E]">
      {/* signup card */}
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-xl dark:border-[#24359E] dark:bg-[#07104D]">
        {/* page title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#574A3F] dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-[#8A8178] dark:text-gray-400">
            Join MorningFocus today.
          </p>
        </div>

        {/* signup form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* first name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              First Name
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineUser className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* last name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              Last Name
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineUser className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              Email
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineEnvelope className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineLockClosed className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className={`w-full rounded-2xl py-4 font-semibold transition ${
              darkMode
                ? "bg-[#E1CB40] text-[#03045E] hover:bg-[#FFD84D]"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Create Account
          </button>
        </form>

        {/* login link */}
        <p className="mt-8 text-center text-sm text-[#8A8178] dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 dark:text-[#E1CB40]"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
