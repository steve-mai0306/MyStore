import { useQuery } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";

const SUB_URL = "/Product";

type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

type Status = {
  id: number;
  status: string;
}

type Category = {
  id: number;
  categoryName: string;
};

type Color = {
  id: number;
  hexValue: string;
  themeColor: string;
};

type Size = {
  id: number;
  productSize: string;
};

type Tag = {
  id: number;
  tagName: string;
};

type CreateOptionResponse = {
  statuses: Status[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  tags: Tag[];
};

export const useGetCreateOptions = () => {
  return useQuery<CreateOptionResponse>({
    queryKey: ["create-options"],
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Get(
          `${SUB_URL}/getCreateOption`,
          false
        )) as unknown as BackendEnvelope<CreateOptionResponse>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
