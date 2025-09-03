import { create } from "zustand";
import { devtools } from "zustand/middleware";

type User = {
  id: number;
  slug: string;
  avatar: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: boolean | null;
  phoneNumber: string | null;
  shopName: string | null;
  isDisable: boolean;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      reset: () => set({ user: null }),
    }),
    { name: "UserStore" }
  )
);
