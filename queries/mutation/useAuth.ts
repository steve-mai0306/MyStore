import { useMutation } from "@tanstack/react-query";
import BaseRequest, { BASE_URL } from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";
import { useRouter } from "next/navigation";

interface RegisterCustomerPayload {
  email: string;
}

interface RegisterVendorPayload extends RegisterCustomerPayload {
  firstName: string;
  lastName: string;
  shopName: string;
  phoneNumber: string;
}

interface PasswordConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken?: string;
  access_token?: string;
  token?: string;
  data?: {
    accessToken?: string;
    access_token?: string;
    token?: string;
  };
}

const SUB_URL = "/Auth";

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: async (payload: RegisterCustomerPayload) => {
      return BaseRequest.Post(`${SUB_URL}/register-customer`, payload);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      console.log("Registration successfully!");
    },
    onError: (error) => {
      console.error("Error registering customer:", error);
    },
  });
};

export const useRegisterVendor = () => {
  return useMutation({
    mutationFn: async (payload: RegisterVendorPayload) => {
      return BaseRequest.Post(`${SUB_URL}/register-vendor`, payload);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      console.log("Vendor registration successfully!");
    },
    onError: (error) => {
      console.error("Error registering vendor:", error);
    },
  });
};

export const useCustomerConfirmPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: PasswordConfirm) => {
      return BaseRequest.Post(`${SUB_URL}/confirm-customer`, payload);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      console.log("Customer password confirmed successfully!");
      router.push("/authen");
    },
    onError: (error) => {
      console.error("Error confirming password:", error);
    },
  });
};

export const useVendorConfirmPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: PasswordConfirm) => {
      return BaseRequest.Post(`${SUB_URL}/confirm-vendor`, payload);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      console.log("Vendor password confirmed successfully!");
      router.push("/authen");
    },
    onError: (error) => {
      console.error("Error confirming vendor password:", error);
    },
  });
};
