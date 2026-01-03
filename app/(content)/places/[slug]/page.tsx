import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlace, places } from "@/lib/content";

export const revalidate = 86400;

export async function generateStaticParams() {
  return places.map((place) => ({
    slug: place.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);

  if (!place) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: place.title,
    description: place.description,
    openGraph: {
      title: place.title,
      description: place.description,
      type: "article",
    },
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = getPlace(slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ← Back
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight mt-4">
            {place.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {place.description}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {place.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">
            If this resonates, MomentBook might be for you.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Download the app
          </Link>
        </div>
      </div>
    </div>
  );
}
