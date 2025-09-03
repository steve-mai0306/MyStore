import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

export const useUser = () => {
  const {
    user,
    setUser,
    clearUser,
    reset: resetUser,
  } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  return {
    user,
    setUser,
    clearUser,
    resetUser,
    isLoading,
    avatar: user?.avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    slug: user?.slug,
    phoneNumber: user?.phoneNumber,
    dateOfBirth: user?.dateOfBirth,
    gender: user?.gender,
    shopName: user?.shopName,
  };
};
