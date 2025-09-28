import { Users, CheckSquare, Clock, Smile } from 'lucide-react';

const structureFeatures = [
  {
    icon: Users,
    title: "Grupe pe nivel de experiență",
    description: "Dansăm împreună, dar în ritmul potrivit pentru tine: începători, intermediari sau avansați.",
    iconBgColor: "from-blue-500 to-blue-600",
    accentColor: "text-blue-600"
  },
  {
    icon: CheckSquare,
    title: "9 Stiluri diferite de Dansuri Latino",
    description: "Explorează 9 stiluri de dans: salsa, bachata, rueda, cha cha, samba, rumba, jive, lindy hop și paso doble.",
    iconBgColor: "from-purple-500 to-purple-600",
    accentColor: "text-purple-600"
  },
  {
    icon: Clock,
    title: "Lecții de dans structurate pentru progres",
    description: "Ore gândite să fie dinamice și clare, astfel încât să vezi rapid evoluția ta pe ringul de dans.",
    iconBgColor: "from-green-500 to-green-600",
    accentColor: "text-green-600"
  },
  {
    icon: Smile,
    title: "Exerciții, coregrafii, improvizații",
    description: "Îmbinare între exerciții practice, coregrafii și momente de improvizație care fac fiecare oră unică.",
    iconBgColor: "from-orange-500 to-orange-600",
    accentColor: "text-orange-600"
  }
];

export default function StructureFeatures() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
        De ce să alegi cursurile noastre de dans latino?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {structureFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.iconBgColor} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 mb-3 text-center block">{feature.title}</span>
            <p className="text-gray-600 text-center leading-relaxed">
              {feature.description.split(' ').map((word, wordIndex) => {
                // Evidențiază cuvintele cheie
                const keyWords = ['începător', 'intermediar', 'avansat', '9', '5', '200+', 'progres', 'improvizație', 'unice','dinamice','clare'];
                const isKeyWord = keyWords.some(key => word.toLowerCase().includes(key.toLowerCase()));
                
                return (
                  <span key={wordIndex} className={isKeyWord ? `font-semibold ${feature.accentColor}` : ''}>
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
