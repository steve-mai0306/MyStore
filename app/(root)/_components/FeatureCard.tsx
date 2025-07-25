import { Globe, Shirt, Heart, CreditCard } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
}

export const FeatureCard = ({ icon, title }: FeatureCardProps) => {
  return (
    <div className="flex flex-row items-center p-4">
      <div className="icon">{icon}</div>
      <div className="content flex flex-1 pl-3">{title}</div>
    </div>
  );
};
