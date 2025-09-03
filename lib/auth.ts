import type { NextAuthOptions, User, Session, Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import BaseRequest from "@/config/axios-config";
import type { JWT } from "next-auth/jwt";

type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

type LoginData = {
  token: string;
  roleId?: number | null;
  role?: string | null;
  fullName?: string | null;
  slug?: string | null;
  avatar?: string | null;
  requiredTwoFactor?: boolean;
};
type GoogleLoginData = string;

type ExtendedUser = User & {
  accessToken: string;
  roleId?: string | number | null;
  role?: string | null;
  accountId?: string | number | null;
  slug?: string | null;
  requiredTwoFactor?: boolean;
};

type ExtendedToken = JWT & {
  accessToken?: string;
  roleId?: string | number | null;
  role?: string | null;
  accountId?: string | number | null;
  name?: string | null;
  slug?: string | null;
  image?: string | null;
  requiredTwoFactor?: boolean;
};

type ExtendedSession = Session & {
  accessToken?: string | null;
  roleId?: string | number | null;
  role?: string | null;
  accountId?: string | number | null;
  slug? : string | null;
  requiredTwoFactor?: boolean;
  error?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/Auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Invalid email or password");
            }
            throw new Error(`Authentication failed: ${res.status}`);
          }

          const json = (await res.json()) as BackendEnvelope<LoginData>;
          const payload = json?.data ?? null;
          if (!payload?.token) {
            throw new Error("No token received from server");
          }

          const u: ExtendedUser = {
            id: "0",
            email: credentials.email,
            name: payload.fullName ?? null,
            slug: payload.slug ?? null,
            image: payload.avatar ?? null,
            accessToken: payload.token,
            roleId: payload.roleId ?? null,
            role: payload.role ?? null,
            accountId: null,
            requiredTwoFactor: payload.requiredTwoFactor ?? false,
          };
          // Return as User while keeping extra fields available at runtime
          return u as unknown as User;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      const t = token as ExtendedToken;

      if (user) {
        const u = user as unknown as ExtendedUser;
        t.accessToken = u.accessToken;
        t.roleId = u.roleId ?? null;
        t.role = u.role ?? null;
        t.accountId = u.accountId ?? null;
        t.name = u.name ?? null;
        t.slug = u.slug ?? null;
        t.image = u.image ?? null;
        t.requiredTwoFactor = u.requiredTwoFactor ?? false;
      }

      if (account?.id_token) {
        const env = (await BaseRequest.Post(`/api/Auth/google-login`, {
          idToken: account.id_token,
        })) as unknown as BackendEnvelope<GoogleLoginData>;
        if (!env?.data) throw new Error("Google login failed");
        t.accessToken = env.data;
        t.roleId = null;
        t.accountId = null;
      }

      return t;
    },

    async session({ session, token }) {
      const s = session as ExtendedSession;
      const t = token as ExtendedToken;
      s.accessToken = t.accessToken ?? null;
      if (!s.accessToken) s.error = "There is problem with our server.";
      s.roleId = t.roleId ?? null;
      s.role = t.role ?? null;
      s.requiredTwoFactor = t.requiredTwoFactor ?? false;
      if (s.user) {
        s.user.name = t.name ?? s.user.name ?? null;
        s.user.image = t.image ?? s.user.image ?? null;
        s.user.slug = t.slug ?? s.user.slug ?? null;
      }
      return s;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
