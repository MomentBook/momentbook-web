"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserRedirect({ params }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const { userId } = await params;
      const storedLang = localStorage.getItem("preferredLanguage") || "en";
      router.replace(`/${storedLang}/users/${userId}`);
    };

    redirect();
  }, [params, router]);

  return null;
}
