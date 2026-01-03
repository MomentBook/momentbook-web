import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What MomentBook is, and what it is not.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          What MomentBook is
        </h1>

        <div className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            MomentBook is an app that creates space for noticing your day. It doesn't ask you to be productive, consistent, or optimized. It simply holds what you choose to remember.
          </p>

          <p>
            Some days you'll record moments. Some days you won't. The app doesn't judge either outcome.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            What it's for
          </h2>

          <p>
            You might find MomentBook useful if you notice small things that don't fit anywhere else. If you want to remember days, not tasks. If you value observation over achievement.
          </p>

          <p>
            The app is there when you need it, and quiet when you don't.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            What it's not
          </h2>

          <p>
            MomentBook is not a productivity tool. It doesn't track habits, measure consistency, or optimize your routines. It doesn't encourage sharing, publishing, or performing for others.
          </p>

          <p>
            It's not trying to change you. It's trying to see you.
          </p>
        </div>
      </div>
    </div>
  );
}
