import type { NextAuthOptions, User, Session, Account } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import BaseRequest from "@/config/axios-config"
import type { JWT } from "next-auth/jwt"

type BackendEnvelope<T> = {
  success: boolean
  message: string
  errors: unknown[]
  data: T
}

type LoginData = string
type GoogleLoginData = string

type ExtendedUser = User & {
  accessToken: string
  roleId?: string | number | null
  accountId?: string | number | null
}

type ExtendedToken = JWT & {
  accessToken?: string
  roleId?: string | number | null
  accountId?: string | number | null
}

type ExtendedSession = Session & {
  accessToken?: string | null
  roleId?: string | number | null
  accountId?: string | number | null
  error?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null

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
          )

          if (!res.ok) return null

          const json = (await res.json()) as BackendEnvelope<LoginData>
          const tokenFromBackend = json?.data ?? null
          if (!tokenFromBackend) return null

          const u: ExtendedUser = {
            id: "0",
            email: credentials.email,
            name: null,
            image: null,
            accessToken: tokenFromBackend,
            roleId: null,
            accountId: null,
          }
          // Return as User while keeping extra fields available at runtime
          return u as unknown as User
        } catch {
          return null
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
      const t = token as ExtendedToken

      if (user) {
        const u = user as unknown as ExtendedUser
        t.accessToken = u.accessToken
        t.roleId = u.roleId ?? null
        t.accountId = u.accountId ?? null
      }

      if (account?.id_token) {
        const env = (await BaseRequest.Post(`/api/Auth/google-login`, {
          idToken: account.id_token,
        })) as unknown as BackendEnvelope<GoogleLoginData>
        if (!env?.data) throw new Error("Google login failed")
        t.accessToken = env.data
        t.roleId = null
        t.accountId = null
      }

      return t
    },

    async session({ session, token }) {
      const s = session as ExtendedSession
      const t = token as ExtendedToken
      s.accessToken = t.accessToken ?? null
      s.roleId = t.roleId ?? null
      s.accountId = t.accountId ?? null
      if (!s.accessToken) s.error = "There is problem with our server."
      return s
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
