import { Users, CheckSquare, Clock, Smile } from 'lucide-react';

const structureFeatures = [
  {
    icon: Users,
    title: "Împărțirea pe grupe",
    description: "Grupe adaptate nivelului de experiență: începător, intermediar și avansat.",
    iconBgColor: "from-blue-500 to-blue-600",
    accentColor: "text-blue-600"
  },
  {
    icon: CheckSquare,
    title: "Stiluri de dans",
    description: "9 stiluri latino, 5 stiluri societate, 200+ jocuri populare.",
    iconBgColor: "from-purple-500 to-purple-600",
    accentColor: "text-purple-600"
  },
  {
    icon: Clock,
    title: "Structura lecțiilor",
    description: "Sesiuni clare, dinamice și bine organizate pentru progres vizibil.",
    iconBgColor: "from-green-500 to-green-600",
    accentColor: "text-green-600"
  },
  {
    icon: Smile,
    title: "Conținut atractiv",
    description: "Exerciții practice, coregrafii și improvizație pentru ore unice.",
    iconBgColor: "from-orange-500 to-orange-600",
    accentColor: "text-orange-600"
  }
];

export default function StructureFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {structureFeatures.map((feature, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className={`w-12 h-12 bg-gradient-to-br ${feature.iconBgColor} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
          <p className="text-gray-600 text-center leading-relaxed">
            {feature.description.split(' ').map((word, wordIndex) => {
              // Evidențiază cuvintele cheie
              const keyWords = ['începător', 'intermediar', 'avansat', '9', '5', '200+', 'progres', 'improvizație', 'unice'];
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
  );
}
