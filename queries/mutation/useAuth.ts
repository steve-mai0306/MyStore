import { useMutation } from "@tanstack/react-query";
import BaseRequest from "@/config/axios-config";
import "@bprogress/core/css";
import { BProgress } from "@bprogress/core";
import { useRouter } from "next/navigation";

interface RegisterCustomerPayload {
  email: string;
  firstName: string;
  lastName: string;
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

export const useSetupPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: PasswordConfirm) => {
      return BaseRequest.Post(`${SUB_URL}/setup-password`, payload);
    },
    onMutate: () => {
      BProgress.start();
    },
    onSettled: () => {
      BProgress.done();
    },
    onSuccess: () => {
      console.log("Your password confirmed successfully!");
      router.push("/authen");
    },
    onError: (error) => {
      console.error("Error confirming password:", error);
    },
  });
};

