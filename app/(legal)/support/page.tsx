import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with MomentBook.",
};

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Support
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          If you need help with MomentBook, we're here.
        </p>

        <div className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Common questions
          </h2>

          <p>
            You might find answers in our <a href="/faq" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">FAQ</a>.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Contact
          </h2>

          <p>
            For other questions or issues, you can reach us at{" "}
            <a href="mailto:support@momentbook.app" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
              support@momentbook.app
            </a>
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            We typically respond within 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
