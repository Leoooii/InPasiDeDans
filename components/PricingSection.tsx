'use client'

import { TarifCard, useTarife } from '@/components/tarif-card'

export default function PricingSection({ title }: { title?: string }) {
  const plans = useTarife('grup')

  return (
    <div>
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
            {title}
          </h2>
        </div>

        {/* Group Pricing */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <TarifCard key={plan.id} tarif={plan} />
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
  )
}
