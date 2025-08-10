import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Password • My Store",
  description: "Log in to your account",
};

export default function SetupPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
