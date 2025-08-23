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
      'Acces la o singură grupă'
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
      'Acces la 2 grupe'
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
      'Acces nelimitat la grupe'
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
      'O ședință la grup'
    ],
    popular: false
  }
];

export default function PricingSection() {
  return (
    <div className=" ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Tarife și abonamente pentru dansuri latino
          </h2>
         
        </div>

        {/* Group Pricing */}
        <div className="mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {groupPricing.map((plan) => (
              <Card 
                key={plan.id} 
                className={`flex flex-col border-red-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular 
                    ? 'border-red-500 scale-105' 
                    : 'border-red-600 hover:border-red-700'
                }`}
              >
                {plan.popular && (
                  <div className="bg-red-500 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                    <Star className="w-4 h-4 inline mr-2" />
                    Cel mai popular
                  </div>
                )}
                <CardHeader className={`bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg ${
                  plan.popular ? 'rounded-t-none' : ''
                }`}>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription className="text-white/90">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4 text-4xl font-bold">{plan.price} {plan.currency}</div>
                </CardHeader>
                <CardContent className="flex-1 mt-2 p-6">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check
                          className="mr-2 h-4 w-4 text-green-500"
                          aria-label="Inclus"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
