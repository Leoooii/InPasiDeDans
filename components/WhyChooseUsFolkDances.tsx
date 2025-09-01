'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Music, Target, Calendar } from 'lucide-react';

const benefits = [
  {
    id: 1,
    title: "Conectare cu tradiția",
    description: "Descoperi frumusețea și autenticitatea folclorului românesc și balcanic.",
    icon: Heart,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Atmosferă prietenoasă",
    description: "Te integrezi ușor într-o comunitate caldă și veselă.",
    icon: Users,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Distracție și energie",
    description: "Fiecare lecție este o combinație de voie bună, ritm și mișcare.",
    icon: Music,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Beneficii pentru tine",
    description: "Îți îmbunătățești coordonarea, condiția fizică și încrederea în tine.",
    icon: Target,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Utilitate practică",
    description: "Dansurile populare sunt ideale pentru nunți, petreceri, festivaluri și orice moment de sărbătoare.",
    icon: Calendar,
    color: "from-yellow-500 to-orange-500"
  }
];

export default function WhyChooseUsFolkDances() {
  return (
    <div className="container py-6 md:py-12 px-2 md:px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12">
        De ce să alegi cursurile noastre
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6 md:mb-12 max-w-4xl mx-auto">
        Pentru că îți oferă mult mai mult decât pași de dans:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={benefit.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${benefit.color} text-white shadow-lg`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {benefit.id}. {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
