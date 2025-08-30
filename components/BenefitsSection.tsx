import { CheckCircle } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Eleganță și grație",
      description: "Înveți pași care îți îmbunătățesc postura și mișcarea."
    },
    {
      title: "Socializare",
      description: "Cunoști oameni noi și faci parte dintr-o comunitate prietenoasă."
    },
    {
      title: "Relaxare și destresare",
      description: "Dansul îți aduce bucurie și îți eliberează mintea."
    },
    {
      title: "Condiție fizică",
      description: "Îți dezvolți coordonarea, echilibrul și rezistența."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Beneficiile acestor lecții de dans pentru tine
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
              {benefit.title}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
