"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ journeyId: string }>;
};

export default function JourneyRedirect({ params }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const { journeyId } = await params;
      const storedLang = localStorage.getItem("preferredLanguage") || "en";
      router.replace(`/${storedLang}/journeys/${journeyId}`);
    };

    redirect();
  }, [params, router]);

  return null;
}
