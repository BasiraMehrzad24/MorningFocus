import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import landingView from "../../assets/images/landingview.webp";
import darkLanding from "../../assets/images/darklading.webp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* background decorations */}

      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-[140px]" />

        <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-amber-200/20 blur-[150px]" />

        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-100 to-transparent opacity-30 dark:via-[#24359E]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[40px] border border-orange-100 bg-white/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.08)] dark:border-[#24359E] dark:bg-[#07114A]/60">
          <div className="grid lg:grid-cols-2">
            {/* hero content */}

            <div className="flex flex-col justify-center p-10 lg:p-16">
              {/* badge */}

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-500 dark:border-[#24359E] dark:bg-[#16206B] dark:text-[#E1CB40]">
                <HiOutlineSparkles size={18} />
                AI Daily Productivity
              </div>

              {/* heading */}

              <h1 className="mt-10 text-5xl font-black leading-tight text-[#574A3F] dark:text-white lg:text-7xl">
                Plan Smarter.
                <br />
                Achieve More.
                <br />
                <span className="text-orange-500 dark:text-[#E1CB40]">
                  Every Day.
                </span>
              </h1>

              {/* description */}

              <p className="mt-8 max-w-lg text-lg leading-8 text-[#8A8178] dark:text-gray-300">
                Stop juggling dozens of tasks. MorningFocus helps you choose one
                meaningful goal, receive AI guidance, and build lasting
                consistency every day.
              </p>

              {/* call to action buttons */}

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600 dark:bg-[#E1CB40] dark:text-[#03045E]"
                >
                  Start Free
                  <HiOutlineArrowRight size={20} />
                </Link>

                <button className="rounded-2xl border border-orange-200 px-7 py-4 font-semibold text-[#574A3F] transition hover:bg-orange-50 dark:border-[#24359E] dark:text-white dark:hover:bg-[#16206B]">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* dashboard preview */}

            <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 p-10 dark:from-[#09145A] dark:to-[#101E78]">
              {/* floating ai card */}

              <div className="absolute left-8 top-10 z-30 rounded-2xl bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-[#16206B]/80">
                <div className="flex items-center gap-2">
                  <HiOutlineBolt className="text-orange-500" />

                  <span className="text-sm font-medium dark:text-white">
                    AI Motivation
                  </span>
                </div>
              </div>

              {/* floating completed card */}

              <div className="absolute bottom-10 right-10 z-30 rounded-2xl bg-white/80 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-[#16206B]/80">
                <div className="flex items-center gap-2">
                  <HiOutlineCheckCircle className="text-green-500" />

                  <span className="text-sm font-medium dark:text-white">
                    Goal Completed
                  </span>
                </div>
              </div>

              {/* background glow */}

              <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-300/20 blur-[120px]" />

              {/* stacked dashboard images */}

              <div className="relative h-[520px] w-full max-w-[720px]">
                {/* background dashboard */}

                <img
                  src={darkLanding}
                  alt="Dark Dashboard"
                  className="
                    absolute
                    top-4
                    left-0
                    w-[88%]
                    rotate-[-8deg]
                    rounded-[28px]
                    border
                    border-white/20
                    opacity-90
                    shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:rotate-[-4deg]
                    dark:border-[#24359E]
                  "
                />

                {/* foreground dashboard */}

                <img
                  src={landingView}
                  alt="Light Dashboard"
                  className="
                    absolute
                    right-0
                    bottom-0
                    w-[88%]
                    rotate-[5deg]
                    rounded-[28px]
                    border
                    border-white/40
                    shadow-[0_40px_80px_rgba(0,0,0,0.18)]
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:rotate-[2deg]
                    dark:border-[#24359E]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
