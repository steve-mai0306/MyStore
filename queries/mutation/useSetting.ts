import { useMutation, useQueryClient } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

const SUB_URL = "/UserSetting";

export const useToggle2fa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return BaseRequest.Put(`${SUB_URL}/toggle-2FA`);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-setting"] });
    },
    onError: (error) => {
      console.error("Error toggle 2FA:", error);
    },
  });
};
