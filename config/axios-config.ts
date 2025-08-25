import axios from "axios";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
// Note: Auth is handled by Better Auth. This Axios client is for non-auth APIs.

// Type augmentation: allow a custom `showToast` flag on requests
declare module "axios" {
  interface AxiosRequestConfig {
    showToast?: boolean;
  }
  interface InternalAxiosRequestConfig {
    showToast?: boolean;
  }
}

// Base URL from .env
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ===== Axios Instance =====
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request Interceptor =====
apiClient.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();
    const token = (session as any)?.accessToken as string | undefined;
    if (token) {
      if (config.headers && (config.headers as any).set) {
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      } else if (config.headers) {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      } else {
        (config as any).headers = { Authorization: `Bearer ${token}` } as any;
      }
    }
  } catch {
    // no-op: proceed without token
  }
  return config;
});

// ===== Response Interceptor =====
apiClient.interceptors.response.use(
  (response) => {
    const { success, message } = response.data || {};
    if (success && message && response.config.showToast !== false) {
      toast.success(message);
    }
    return response.data;
  },
  async (error) => {
    const { response } = error;

    if (!response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const { status, data } = response;

    if (status === 401) {
      toast.warning("Please login to continue");
      await signOut({ redirect: true, callbackUrl: "/authen" });
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else {
      toast.error(data?.message || "An error occurred.");
    }

    return Promise.reject(data);
  }
);

// ===== Simple API Methods =====
const BaseRequest = {
  Get: (url: string, showToast = true) => apiClient.get(url, { showToast }),
  Post: (url: string, data?: unknown, showToast = true) =>
    apiClient.post(url, data, { showToast }),
  Put: (url: string, data?: unknown, showToast = true) =>
    apiClient.put(url, data, { showToast }),
  Delete: (url: string, showToast = true) =>
    apiClient.delete(url, { showToast }),
};

export default BaseRequest;
