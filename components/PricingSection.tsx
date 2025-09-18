import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

const groupPricing = [
  {
    id: 1,
    title: 'Abonament 8',
    description: 'Valabil 4 săptămâni',
    price: '250',
    currency: 'Lei',
    features: [
      '8 ședințe pe lună',
      'Acces la o singură grupă',
      'Valabil pentru orice grupa (dans popular, dansuri latino & de societate, bachata & salsa)'
    ],
    popular: false
  },
  {
    id: 2,
    title: 'Abonament 16',
    description: 'Valabil 4 săptămâni',
    price: '350',
    currency: 'Lei',
    features: [
      '16 ședințe pe lună',
      'Acces la 2 grupe',
      'Valabil pentru orice grupa (dans popular, dansuri latino & de societate, bachata & salsa)'
    ],
    popular: true
  },
  {
    id: 3,
    title: 'Abonament Full Pass',
    description: 'Valabil 4 săptămâni',
    price: '420',
    currency: 'Lei',
    features: [
      'Acces nelimitat la grupe',
      'Valabil începând cu prima ședință efectuată',
      'Permite acces la toate grupele în desfășurare la momentul achiziționării'
    ],
    popular: false
  },
  {
    id: 4,
    title: 'Plata la ședință',
    description: 'Orice stil de dans',
    price: '45',
    currency: 'Lei',
    features: [
      'O ședință la grup',
      'Tarif valabil pentru orice grupa (dans popular, dansuri latino & de societate, bachata & salsa)'
    ],
    popular: false
  }
];

export default function PricingSection({ title }: { title?: string }) {
  return (
    <div className=" ">
      <div className="container mx-0 ">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
         
        </div>

        {/* Group Pricing */}
        <div className="mb-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl ">
            {groupPricing.map((plan) => (
              <Card 
                key={plan.id} 
                className={`flex flex-col border-red-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full ${
                  plan.popular 
                    ? 'border-red-500 ' 
                    : 'border-red-600 hover:border-red-700'
                }`}
              >
               
                <CardHeader className={`bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg ${
                  plan.popular ? 'rounded-t-none' : ''
                }`}>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription className="text-white/90">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4 text-4xl font-bold">{plan.price} {plan.currency}</div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between mt-2 p-6">
                  <ul className="space-y-2 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check
                          className="mr-2 h-4 w-4 text-green-500 flex-shrink-0 mt-0.5"
                          aria-label="Inclus"
                        />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warning Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border-l-2 sm:border-l-4 border-amber-400 p-0 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-amber-800 mb-3">
                  Informații importante despre abonamente
                </div>
                <div className="text-sm text-amber-700 space-y-3">
                  <p>
                    <strong>Valabilitatea abonamentelor este de 4 săptămâni</strong> și acestea se achită la prima ședință. Ședințele pierdute se pot recupera la alte grupe (dacă doriți), în aceeași lună și <strong>NU se reportează pentru lunile viitoare</strong>.
                  </p>
                  <p>
                    În cazul în care doriți să achiziționați un <strong>abonament full pass</strong>, vă rugăm să verificați dacă grupele la care doriți să participați în baza acestui abonament se potrivesc nivelului dvs. (începător/intermediar/avansat). 
                  </p>
                  <p className="bg-amber-100 p-3 rounded border-l-2 border-amber-300">
                    <strong>Exemplu:</strong> dacă sunteți începător, nu puteți participa la grupe de nivel intermediar sau avansat; dacă sunteți avansat puteți participa la orice grupă, indiferent de nivelul acesteia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
