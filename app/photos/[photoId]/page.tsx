"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ photoId: string }>;
};

export default function PhotoRedirect({ params }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const { photoId } = await params;
      const storedLang = localStorage.getItem("preferredLanguage") || "en";
      router.replace(`/${storedLang}/photos/${photoId}`);
    };

    redirect();
  }, [params, router]);

  return null;
}
