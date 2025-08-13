import { create } from "zustand";

type AuthRegistrationState = {
  customerRegistered: boolean;
  vendorRegistered: boolean;
  setCustomerRegistered: (value: boolean) => void;
  setVendorRegistered: (value: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthRegistrationState>((set) => ({
  customerRegistered: false,
  vendorRegistered: false,
  setCustomerRegistered: (value) => set({ customerRegistered: value }),
  setVendorRegistered: (value) => set({ vendorRegistered: value }),
  reset: () => set({ customerRegistered: false, vendorRegistered: false }),
}));


