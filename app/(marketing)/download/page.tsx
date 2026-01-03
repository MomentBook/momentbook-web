import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description: "Get MomentBook for iOS and Android.",
};

export default function DownloadPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Download MomentBook
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          MomentBook is available for iOS and Android.
        </p>

        <div className="flex flex-col gap-4 mt-8">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Download on the App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Get it on Google Play
          </a>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-8">
          Links will be available when the app launches.
        </p>
      </div>
    </div>
  );
}
