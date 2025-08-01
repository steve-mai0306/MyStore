import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us • My Store",
  description: "Contact Us • My Store",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}