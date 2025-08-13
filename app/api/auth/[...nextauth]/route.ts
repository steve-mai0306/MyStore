import NextAuth, {
  type NextAuthOptions,
  type User,
  type Session,
  type Account,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import BaseRequest from "@/config/axios-config";
import type { JWT } from "next-auth/jwt";

// Backend envelopes are consistently: { success, message, errors, data }
type BackendEnvelope<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

// For login, data is a JWT string
type LoginData = string;
// For Google login, backend may also return a plain token string
type GoogleLoginData = string;

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
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            console.error("Login failed:", res.status, await res.text());
            return null;
          }

          const json = (await res.json()) as BackendEnvelope<LoginData>;
          console.log("Backend login response:", json);

          const tokenFromBackend = json?.data ?? null;
          if (!tokenFromBackend) return null;

          const user: User & {
            accessToken: string;
            roleId?: string | number | null;
            accountId?: string | number | null;
          } = {
            id: "0",
            email: credentials.email,
            name: null,
            image: null,
            accessToken: tokenFromBackend,
            roleId: null,
            accountId: null,
          };

          return user;
        } catch (e) {
          console.error("Authorize error:", e);
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
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User | null;
    }): Promise<JWT> {
      type Extra = {
        accessToken?: string;
        roleId?: string | number | null;
        accountId?: string | number | null;
      };
      const t = token as JWT & Extra;
      try {
        if (user) {
          const u = user as User & Extra;
          t.accessToken = u.accessToken;
          t.roleId = u.roleId ?? null;
          t.accountId = u.accountId ?? null;
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
      } catch (e: unknown) {
        console.error("JWT Callback Error:", e);
      }
      return t;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      type Extra = {
        accessToken?: string | null;
        roleId?: string | number | null;
        accountId?: string | number | null;
        error?: string;
      };
      const t = token as JWT & {
        accessToken?: string;
        roleId?: string | number | null;
        accountId?: string | number | null;
      };
      const s = session as Session & Extra;
      s.accessToken = t.accessToken ?? null;
      s.roleId = t.roleId ?? null;
      s.accountId = t.accountId ?? null;
      if (!s.accessToken) {
        s.error = "There is problem with our server.";
      }
      return s;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
