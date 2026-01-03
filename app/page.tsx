import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MomentBook",
  description: "An app that quietly remembers your day.",
};

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            An app that quietly remembers your day.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            MomentBook creates space for noticing. It doesn't ask you to be productive or optimized. It simply holds what you choose to remember.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">You might find this useful if...</h2>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <li>You notice small moments that don't fit anywhere else</li>
            <li>You want to remember days, not tasks</li>
            <li>You prefer observation over optimization</li>
            <li>You value quietness over performance</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/journeys/a-quiet-morning"
              className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <h3 className="font-semibold mb-2">A Quiet Morning</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                The stillness before the day begins.
              </p>
            </Link>
            <Link
              href="/places/familiar-spaces"
              className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <h3 className="font-semibold mb-2">Familiar Spaces</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                The rooms and corners you return to.
              </p>
            </Link>
          </div>
        </section>

        <section className="pt-8">
          <Link
            href="/download"
            className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Download MomentBook
          </Link>
        </section>
      </div>
    </div>
  );
}
