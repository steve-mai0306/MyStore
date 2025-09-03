import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

const SUB_URL = "/AccountProfile";

type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

export type Profile = {
  id: number;
  slug: string;
  avatar: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  phoneNumber: string | null;
  shopName: string | null;
  isDisable: boolean;
};

export const useGetProfile = (slug: string) => {
  const { user } = useUser();

  return useQuery<Profile>({
    queryKey: ["profile", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Get(
          `${SUB_URL}/getProfile?slug=${encodeURIComponent(slug)}`,
          false
        )) as unknown as BackendEnvelope<Profile>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
    // Use store data if available and slug matches
    initialData:
      user?.slug === slug
        ? ({ ...user, gender: user.gender?.toString() ?? null } as Profile)
        : undefined,
  });
};
