import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products • My Store Dashboard",
  description: "All Products • My Store Dashboard",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}