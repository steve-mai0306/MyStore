import { useQuery } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

const SUB_URL = "/UserSetting";

type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

export type UserSetting = {
  id: number;
  slug: string;
  firstName: string | null;
  lastName: string | null;
  twoFactorEnabled: boolean;
};

export const useGetSetting = () => {
  return useQuery<UserSetting>({
    queryKey: ["user-setting"],
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Get(
          `${SUB_URL}/getSetting`,
          false
        )) as unknown as BackendEnvelope<UserSetting>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
