import { useMutation, useQueryClient } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

interface ProfileAvatarData {
  file: File;
}

interface ProfileUpdateData {
  [key: string]: any;
}


const SUB_URL = "/AccountProfile";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileAvatarData) => {
      const formData = new FormData();
      formData.append("file", data.file);

      return BaseRequest.FormDataPut(`${SUB_URL}/updateAvatar`, formData);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      console.log("Avatar updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update avatar:", error);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      return BaseRequest.Put(`${SUB_URL}/updateProfile`, cleanData);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      console.log("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });
};
