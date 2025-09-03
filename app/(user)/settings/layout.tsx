import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Settings • My Store",
  description: "My Settings • My Store",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}