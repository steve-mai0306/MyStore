import { useMutation, useQueryClient } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

const SUB_URL = "/Product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return BaseRequest.FormDataPost(`${SUB_URL}/createProduct`, formData);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductByVendor"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return BaseRequest.Delete(`${SUB_URL}/deleteProduct/${id}`);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductByVendor"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};


