import {
  HiOutlineSparkles,
  HiOutlineCheckBadge,
  HiOutlineFire,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineFire,
    title: "Most Important Task",
    description:
      "Choose one meaningful priority every morning instead of juggling dozens of tasks.",
  },
  {
    icon: HiOutlineSparkles,
    title: "AI Motivation",
    description:
      "Receive personalized motivation and three practical steps generated specifically for your goal.",
  },
  {
    icon: HiOutlineClipboardDocument,
    title: "Motivation History",
    description:
      "Every AI session is saved so you can revisit previous plans whenever you need inspiration.",
  },
  {
    icon: HiOutlineCheckBadge,
    title: "Goal Tracking",
    description:
      "Track completed goals and build consistency through small daily wins.",
  },
  {
    icon: HiOutlineClock,
    title: "Daily Focus Limit",
    description:
      "Limit your daily goals to avoid multitasking and encourage deep work.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Weekly Reflection",
    description:
      "Generate an AI-powered report that summarizes your productivity every week.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-20 lg:grid-cols-[380px_1fr]">
        {/* Left */}

        <div className="lg:sticky lg:top-32 h-fit">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 dark:text-[#E1CB40]">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-[#574A3F] dark:text-white">
            Built for
            <br />
            deep work.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#8A8178] dark:text-gray-300">
            MorningFocus removes the clutter found in traditional task managers.
            Every feature is designed to help you stay focused on one meaningful
            goal and finish it.
          </p>
        </div>

        {/* Right */}

        <div className="relative">
          {/* Vertical Line */}

          <div className="absolute left-7 top-0 h-full w-px bg-orange-100 dark:bg-[#24359E]" />

          <div className="space-y-12">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="group relative flex gap-8">
                  {/* Icon */}

                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-orange-100 transition-all duration-300 group-hover:scale-110 dark:bg-[#07114A] dark:ring-[#24359E]">
                    <Icon
                      size={26}
                      className="text-orange-500 dark:text-[#E1CB40]"
                    />
                  </div>

                  {/* Content */}

                  <div className="pb-10">
                    <h3 className="text-2xl font-bold text-[#574A3F] transition-colors duration-300 group-hover:text-orange-500 dark:text-white dark:group-hover:text-[#E1CB40]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 max-w-xl leading-8 text-[#8A8178] dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
