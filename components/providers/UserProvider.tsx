"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";
import { useGetProfile } from "@/queries/query/useGetProfile";

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { data: session, status } = useSession();
  const { setUser, clearUser } = useUserStore();

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfile(session?.user?.slug || "");

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      clearUser();
      return;
    }

    if (status === "authenticated" && session?.user?.slug) {
      // User is logged in, profile will be fetched by useGetProfile
      // and automatically set to store via the hook
    }
  }, [status, session?.user?.slug, clearUser]);

  useEffect(() => {
    if (profile && !isLoading) {
      // Map gender from string|null to boolean|null
      const mappedProfile = {
        ...profile,
        gender:
          profile.gender === null
            ? null
            : profile.gender === "male"
            ? true
            : profile.gender === "female"
            ? false
            : null,
      };
      setUser(mappedProfile);
    }
  }, [profile, isLoading, setUser]);

  if (status === "loading") {
    return <>{children}</>;
  }

  return <>{children}</>;
}
