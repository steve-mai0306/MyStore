import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans • My Store",
  description: "Pricing Plans",
};

export default function PricingPlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}