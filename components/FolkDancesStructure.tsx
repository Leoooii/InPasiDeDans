'use client';

import { Users, Target, MapPin, Clock, BookOpen, Star } from 'lucide-react';

const structureItems = [
  {
    id: 1,
    title: "Împărțirea pe grupe",
    description: "În funcție nivel de experiență, astfel încât fiecare participant să se simtă confortabil și să progreseze natural;",
    icon: Users,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Niveluri",
    description: "De la începători, unde se învață pașii de bază, până la avansați, unde se lucrează jocuri populare complexe și suite din diferite zone ale țării;",
    icon: Target,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Stiluri și regiuni folclorice",
    description: "Dansuri tradiționale din diferite zone ale României, fiecare cu specificul și frumusețea lui;",
    icon: MapPin,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 4,
    title: "Durata lecțiilor",
    description: "Ședințe echilibrate, care îmbină partea tehnică, exercițul practic și distracția;",
    icon: Clock,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Conținutul lecțiilor",
    description: "Pași, ritm, coordonare, exerciții de grup și punerea în scenă a coregrafiilor si suitelor.",
    icon: BookOpen,
    color: "from-yellow-500 to-orange-500"
  }
];

export default function FolkDancesStructure() {
  return (
    <div className="container py-6 md:py-12 px-2 md:px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12">
        Structura dansurilor populare
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
        {structureItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="relative group">
              {/* Background card cu gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Card principal */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-3 md:p-6 shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Header cu iconița și numărul */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold flex items-center justify-center`}>
                    {item.id}
                  </div>
                </div>
                
                {/* Conținut */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Linie decorativă de jos */}
                <div className={`mt-4 w-16 h-1 bg-gradient-to-r ${item.color} rounded-full`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Concluzia */}
      <div className="bg-gradient-to-br from-orange-100 via-red-50 to-orange-50 dark:from-orange-900/30 dark:via-red-900/20 dark:to-orange-900/30 p-4 md:p-8 rounded-3xl border border-orange-200 dark:border-orange-700 shadow-lg max-w-5xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg mb-4">
            <Star className="w-8 h-8" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            În acest fel, fiecare cursant are ocazia să înțeleagă atât partea tehnică a dansului, cât și să trăiască energia și bucuria folclorului autentic.
          </p>
        </div>
      </div>
    </div>
  );
}
