import axios from "axios";
import { toast } from "sonner";

// Type augmentation: allow a custom `showToast` flag on requests
declare module "axios" {
  // Keep generics to align with Axios types
  interface AxiosRequestConfig<D = any> {
    showToast?: boolean;
  }
  interface InternalAxiosRequestConfig<D = any> {
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
apiClient.interceptors.request.use((config) => {
  // If you want to pass a token from localStorage or Zustand, do it here:
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
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
  (error) => {
    const { response } = error;

    if (!response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const { status, data } = response;

    if (status === 401) {
      toast.warning("Please login to continue");
      // Optionally redirect to login page
      window.location.href = "/authen";
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
  Post: (url: string, data?: any, showToast = true) =>
    apiClient.post(url, data, { showToast }),
  Put: (url: string, data?: any, showToast = true) =>
    apiClient.put(url, data, { showToast }),
  Delete: (url: string, showToast = true) =>
    apiClient.delete(url, { showToast }),
};

export default BaseRequest;
