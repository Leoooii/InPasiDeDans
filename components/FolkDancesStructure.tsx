'use client';

import { Users, Target, MapPin, Clock, BookOpen } from 'lucide-react';

const structureItems = [
  {
    icon: Users,
    title: 'Împărțirea pe grupe',
    desc: 'Se face în funcție de nivel, astfel încât fiecare cursant să progreseze în ritmul propriu.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Target,
    title: 'Niveluri',
    desc: 'De la începători (pași de bază) până la avansați (jocuri complexe și suite din diferite zone).',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    icon: MapPin,
    title: 'Stiluri și regiuni folclorice',
    desc: 'Dansuri tradiționale din diferite zone ale României, fiecare cu specificul și frumusețea lui.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Clock,
    title: 'Durata lecțiilor',
    desc: 'Ședințe de o oră care îmbină partea tehnică, exercițiul practic și distracția.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: BookOpen,
    title: 'Conținutul lecțiilor',
    desc: 'Pași, ritm, coordonare, exerciții de grup și punerea în scenă a coregrafiilor și suitelor.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

export default function FolkDancesStructure() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Structura cursurilor</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Organizăm cursurile astfel încât fiecare cursant să înțeleagă tehnica și să trăiască
          bucuria folclorului autentic.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {structureItems.map(({ icon: Icon, title, desc, color, bg }, index) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                    0{index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
