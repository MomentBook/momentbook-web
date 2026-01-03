import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of use for MomentBook.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>

        <div className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg">
            By using MomentBook, you agree to these terms.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Your content
          </h2>

          <p>
            Everything you record in MomentBook belongs to you. We don't claim ownership, and we don't have access to it.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            How you can use the app
          </h2>

          <p>
            MomentBook is for personal, non-commercial use. You're welcome to use it however makes sense for you, as long as you're not harming others or violating laws.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            No guarantees
          </h2>

          <p>
            We work to keep MomentBook reliable and secure, but we can't guarantee it will always be available or error-free. Use the app at your own discretion.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Changes
          </h2>

          <p>
            We may update these terms from time to time. If we make significant changes, we'll let you know through the app.
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-8">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
