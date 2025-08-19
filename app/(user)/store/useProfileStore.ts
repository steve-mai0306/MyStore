import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Profile = {
  id: number;
  slug: string;
  avatar: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  phoneNumber: string | null;
  shopName: string | null;
  isDisable: boolean;
};

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  reset: () => void;
};

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      reset: () => set({ profile: null }),
    }),
    { name: "ProfileStore" }
  )
);