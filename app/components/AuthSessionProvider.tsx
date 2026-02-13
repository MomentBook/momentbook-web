"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { tokenStore } from "@/src/apis/instance.client";

function SessionTokenSync() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      tokenStore.setAccessToken(data?.accessToken ?? null);
      return;
    }

    if (status === "unauthenticated") {
      tokenStore.clear();
    }
  }, [data?.accessToken, status]);

  return null;
}

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <SessionTokenSync />
      {children}
    </SessionProvider>
  );
}
