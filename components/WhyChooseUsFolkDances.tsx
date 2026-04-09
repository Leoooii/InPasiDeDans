'use client';

import { Users, Heart, Music, Target, Calendar } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Conectare cu tradiția',
    desc: 'Descoperi frumusețea și autenticitatea folclorului românesc și balcanic.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Users,
    title: 'Atmosferă prietenoasă',
    desc: 'Te integrezi ușor într-o comunitate caldă și veselă.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Music,
    title: 'Distracție și energie',
    desc: 'Fiecare lecție este o combinație de voie bună, ritm și mișcare.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    icon: Target,
    title: 'Beneficii pentru tine',
    desc: 'Îți îmbunătățești coordonarea, condiția fizică și încrederea în tine.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Calendar,
    title: 'Utilitate practică',
    desc: 'Ideal pentru nunți, petreceri, festivaluri și orice moment de sărbătoare.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

export default function WhyChooseUsFolkDances() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">De ce să alegi cursurile noastre?</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Pentru că îți oferă mult mai mult decât pași de dans.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, desc, color, bg }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
