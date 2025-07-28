import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in • My Store",
  description: "Log in to your account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
