import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up • My Store",
  description: "Log in to your account",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
