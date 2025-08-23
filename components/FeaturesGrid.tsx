import FeatureCard from './FeatureCard';
import { Smile, Users, Home, Heart } from 'lucide-react';

const features = [
  {
    icon: Smile,
    title: "Învățare prin distracție – la noi, dansul nu înseamnă doar pași și tehnică, ci voie bună, relaxare și energie pozitivă.",
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    icon: Users,
    title: "Socializare și comunitate – cursurile aduc împreună oameni pasionați, prietenoși și deschiși, care devin rapid o mică familie.",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: Home,
    title: "Săli spațioase și moderne – dansăm într-un spațiu luminos, cu parchet, oglinzi și aer condiționat, gândit pentru confortul și bucuria fiecărui pas.",
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    icon: Heart,
    title: "Un mediu prietenos și primitor pentru toți – la noi te simți ca între prieteni, indiferent dacă ești începător sau avansat. Atmosfera caldă și relaxată te ajută să dansezi cu încredere și plăcere.",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  }
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          iconBgColor={feature.iconBgColor}
          iconColor={feature.iconColor}
        />
      ))}
    </div>
  );
}
