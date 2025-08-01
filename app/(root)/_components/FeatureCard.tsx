

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export const FeatureCard = ({ icon, title, subtitle }: FeatureCardProps) => {
  return (
    <div className="flex flex-row items-center text-lg">
      <div className="icon">{icon}</div>
      <div className="content flex flex-1 pl-3 uppercase">
        {title}
        <br></br>
        {subtitle}
      </div>
    </div>
  );
};
