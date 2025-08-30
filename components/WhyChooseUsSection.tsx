import { Star, Users, Heart, Award, Clock, Zap } from 'lucide-react';

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Instructori pasionați și experimentați",
      description: "Îți explicăm pas cu pas, într-un mod prietenos și accesibil."
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Atmosferă relaxată și prietenoasă",
      description: "Te simți ca între prieteni, indiferent dacă vii singur(ă) sau cu partener."
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Diversitate de stiluri",
      description: "De la vals și tango, până la quickstep sau foxtrot, descoperi eleganța fiecărui dans."
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Socializare și comunitate",
      description: "Faci parte dintr-un grup de oameni cu aceleași pasiuni și creezi amintiri frumoase."
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Flexibilitate",
      description: "Cursuri adaptate pentru începători și avansați, pe grupe sau în privat."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Beneficii pentru corp și minte",
      description: "Mișcare, grație, încredere și bună dispoziție la fiecare lecție."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          De ce să înveți dansuri de societate cu noi în București?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto mb-4">
              {reason.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
              {reason.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
