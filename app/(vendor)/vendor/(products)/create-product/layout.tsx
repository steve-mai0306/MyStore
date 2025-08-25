import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Products • My Store Dashboard",
  description: "Create Products • My Store Dashboard",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}