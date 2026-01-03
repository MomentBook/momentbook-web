import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A conceptual overview of how MomentBook creates space for noticing.",
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          How it works
        </h1>

        <div className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            MomentBook doesn't prescribe a process. It creates space for whatever you notice.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Noticing
          </h2>

          <p>
            When something in your day feels worth remembering—a moment, a thought, a recognition—you can open the app and record it. Or not. Nothing is required.
          </p>

          <p>
            The app doesn't prompt you, remind you, or ask for consistency. It simply waits, quietly, until you need it.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Remembering
          </h2>

          <p>
            What you record stays with you. It's not shared, published, or made visible to others. It's not optimized for search or performance.
          </p>

          <p>
            You can revisit what you've noticed, or you can let it rest. The choice is yours.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            No expectations
          </h2>

          <p>
            MomentBook doesn't ask you to use it every day, or in any particular way. There are no streaks, no goals, no metrics.
          </p>

          <p>
            The app meets you where you are, when you are, without judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
