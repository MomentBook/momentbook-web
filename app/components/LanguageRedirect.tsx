"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type LanguageRedirectProps = {
  targetPath: string;
};

export default function LanguageRedirect({ targetPath }: LanguageRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    // Get language from localStorage, default to 'en'
    const storedLang = localStorage.getItem("preferredLanguage") || "en";

    // Redirect to the language-prefixed URL
    router.replace(`/${storedLang}${targetPath}`);
  }, [targetPath, router]);

  // Show minimal loading state while redirecting
  return null;
}
