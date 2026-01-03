"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuthToken } from "../lib/utils/fetch";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/auth/signin");
    }
  }, []);

  return <>{children}</>;
}
