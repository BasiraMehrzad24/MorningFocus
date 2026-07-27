import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { supabase } from "../api/supabase";

export default function Login() {
  // used to redirect the user after login
  const navigate = useNavigate();

  // stores the login form values
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // controls the loading state while signing in
  const [loading, setLoading] = useState(false);

  // update the corresponding input field
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // authenticate the user with supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // redirect to the dashboard after successful login
    navigate("/today");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FFF8F0] px-6 dark:bg-[#03045E]">
      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-xl dark:border-[#24359E] dark:bg-[#07104D]">
        {/* page heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#574A3F] dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-[#8A8178] dark:text-gray-400">
            Login to MorningFocus.
          </p>
        </div>

        {/* login form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* email field */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              Email
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineEnvelope className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* password field */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#574A3F] dark:text-white">
              Password
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#24359E]">
              <HiOutlineLockClosed className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* submit button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-orange-500
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-orange-600
              disabled:opacity-60
              dark:bg-[#E1CB40]
              dark:text-[#03045E]
              dark:hover:bg-[#F4DE5B]
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* signup link */}

        <p className="mt-8 text-center text-sm text-[#8A8178] dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-orange-500 dark:text-[#E1CB40]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
