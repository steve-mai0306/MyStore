import { useQuery } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";
import { Product } from "@/types";

const SUB_URL = "/Product";

type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

type GetProductByVendorRequest = {
  slug?: string;
  productName?: string;
  minPrice?: number;
  maxPrice?: number;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  descending?: boolean;
};

type GetProductByVendorResponse = {
  data: Product[];
  totalCount: number;
};

export const useGetProductByVendor = (
  params: GetProductByVendorRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery<GetProductByVendorResponse>({
    queryKey: ["getProductByVendor", params],
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Post(
          `${SUB_URL}/getProductByVendor`,
          params,
          false
        )) as unknown as BackendEnvelope<GetProductByVendorResponse>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true,
  });
};

type GetProductListRequest = {
  productName?: string;
  minPrice?: number;
  maxPrice?: number;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  descending?: boolean;
};

type GetProductListResponse = {
  data: Product[];
  totalCount: number;
};

export const useGetProductList = (params: GetProductListRequest) => {
  return useQuery<GetProductListResponse>({
    queryKey: ["getProductList", params],
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Post(
          `${SUB_URL}/getProductList`,
          params,
          false
        )) as unknown as BackendEnvelope<GetProductListResponse>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};

export const useGetProductById = (id: number) => {
  return useQuery<Product>({
    queryKey: ["getProductById", id],
    queryFn: async () => {
      BProgress.start();
      try {
        const res = (await BaseRequest.Get(
          `${SUB_URL}/getProductById/${id}`,
          false
        )) as unknown as BackendEnvelope<Product>;
        return res.data;
      } finally {
        BProgress.done();
      }
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
