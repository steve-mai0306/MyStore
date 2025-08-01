import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell with us • My Store",
  description: "Sell with us",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}