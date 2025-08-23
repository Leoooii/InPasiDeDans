import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  iconBgColor: string;
  iconColor: string;
}

export default function FeatureCard({ icon: Icon, title, iconBgColor, iconColor }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Iconița circulară colorată */}
      <div className={`w-16 h-16 rounded-full ${iconBgColor} flex items-center justify-center mb-4 mx-auto`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      
      {/* Textul */}
      <p className="text-gray-800 font-medium text-center text-sm leading-tight">
        {title}
      </p>
    </div>
  );
}
