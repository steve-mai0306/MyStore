import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us • My Store",
  description: "Log in to your account",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
