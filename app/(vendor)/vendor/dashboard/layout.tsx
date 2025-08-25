import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard • My Store Dashboard",
  description: "Dashboard • My Store Dashboard",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}