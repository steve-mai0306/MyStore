import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account • My Store Dashboard",
  description: "Account • My Store Dashboard",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}