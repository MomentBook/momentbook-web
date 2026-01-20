"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FaqRedirect() {
  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") || "en";
    router.replace(`/${storedLang}/faq`);
  }, [router]);

  return null;
}
