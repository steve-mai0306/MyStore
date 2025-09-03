import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    role?: string | null;
    roleId?: number | null;
    accountId?: string | number | null;
    requiredTwoFactor?: boolean;
    error?: string;
    user: {
      id?: string;
      slug?:string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
    role?: string | null;
    roleId?: number | null;
    accountId?: string | number | null;
    requiredTwoFactor?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string | null;
    roleId?: number | null;
    accountId?: string | number | null;
    requiredTwoFactor?: boolean;
  }
}
