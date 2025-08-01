import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs • My Store",
  description: "FAQs • My Store",
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}