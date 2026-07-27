import {
  HiOutlineCursorArrowRays,
  HiOutlineSparkles,
  HiOutlineCheckBadge,
  HiOutlineArrowRight,
} from "react-icons/hi2";

// define the three onboarding steps displayed on the landing page
const steps = [
  {
    icon: HiOutlineCursorArrowRays,
    title: "Choose Your Focus",
    description:
      "Start your day by selecting one meaningful goal. Fewer priorities mean deeper focus and better results.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Let AI Guide You",
    description:
      "MorningFocus generates personalized motivation and transforms your goal into three simple action steps.",
  },
  {
    icon: HiOutlineCheckBadge,
    title: "Reflect & Improve",
    description:
      "Complete your task, review your progress, and receive weekly AI insights that help you stay consistent.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-32">
      {/* section heading */}

      <div className="mx-auto mb-24 max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-[#E1CB40]">
          How It Works
        </span>

        <h2 className="mt-6 text-5xl font-black leading-tight text-[#574A3F] dark:text-white md:text-6xl">
          Productivity
          <br />
          without complexity.
        </h2>

        <p className="mt-8 text-lg leading-8 text-[#8A8178] dark:text-gray-300">
          Three simple actions every day are enough to build momentum and
          achieve meaningful progress.
        </p>
      </div>

      {/* workflow steps */}

      <div className="grid gap-10 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="relative">
              {/* connector between cards */}

              {index < steps.length - 1 && (
                <div className="absolute left-[calc(100%-20px)] top-8 hidden w-20 items-center lg:flex">
                  <div className="h-px flex-1 bg-orange-100 dark:bg-[#24359E]" />

                  <HiOutlineArrowRight
                    size={18}
                    className="mx-2 text-orange-400 dark:text-[#E1CB40]"
                  />

                  <div className="h-px flex-1 bg-orange-100 dark:bg-[#24359E]" />
                </div>
              )}

              {/* step card */}

              <div
                className="
                  h-full
                  rounded-[32px]
                  border
                  border-orange-100
                  bg-white/70
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border-[#24359E]
                  dark:bg-[#07114A]/60
                "
              >
                {/* step icon and number */}

                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 dark:bg-[#16206B]">
                    <Icon
                      size={30}
                      className="text-orange-500 dark:text-[#E1CB40]"
                    />
                  </div>

                  <span className="text-5xl font-black text-orange-100 dark:text-[#24359E]">
                    0{index + 1}
                  </span>
                </div>

                {/* step content */}

                <h3 className="text-2xl font-bold text-[#574A3F] dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-5 leading-8 text-[#8A8178] dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
