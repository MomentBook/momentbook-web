import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MomentBook handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <div className="flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg">
            Your moments are yours. MomentBook doesn't share, sell, or analyze your data.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            What we collect
          </h2>

          <p>
            MomentBook stores the moments you choose to record. This data lives on your device and in your personal cloud storage (if you enable sync).
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            What we don't do
          </h2>

          <ul className="list-disc list-inside space-y-2">
            <li>We don't read your moments</li>
            <li>We don't share your data with third parties</li>
            <li>We don't use your content for training or analytics</li>
            <li>We don't track your behavior across apps or websites</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8">
            Your control
          </h2>

          <p>
            You can export or delete your data at any time. Nothing is permanent unless you choose it to be.
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-8">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
