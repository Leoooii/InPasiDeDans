'use client'

import CtaBanner from '@/components/cta-banner';
import type { Tarif } from '@/lib/types'
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import PricingSection from '@/components/PricingSection';
import { TarifBanda, TarifCard, useTarife } from '@/components/tarif-card';


function TarifCards({ tarife }: { tarife: Tarif[] }) {
  const cuBeneficii = tarife.filter((t) => t.beneficii.length > 0)
  const doarPret = tarife.filter((t) => t.beneficii.length === 0)

  return (
    <div className="mt-8 space-y-6">
      {cuBeneficii.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cuBeneficii.map((tarif) => (
            <TarifCard key={tarif.id} tarif={tarif} />
          ))}
        </div>
      )}

      {/* Tarifele doar cu preț — benzi orizontale compacte */}
      {doarPret.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {doarPret.map((tarif) => (
            <TarifBanda key={tarif.id} tarif={tarif} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Tarife() {
  const tarifPrivat = useTarife('privat')
  const tarifCopii = useTarife('copii')

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Tarife' },
  ]

  return (
    <>
      <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/tarife" />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tarife cursuri de dans din Bucuresti
            </h1>
            <p className="text-slate-500 ">
              Alege abonamentul potrivit pentru cursurile de dans pentru adulți
              la In Pasi de Dans, Bucuresti.
            </p>
          </div>
          <PricingSection />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife lecții private
            </h2>
            <p className="text-slate-500 ">
              Personalizează-ți experiența cu lecțiile private de dans.
            </p>
          </div>

          <TarifCards tarife={tarifPrivat} />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife cursuri copii
            </h2>
            <p className="text-slate-500 ">
              Tarife accesibile pentru cursurile de dans dedicate copiilor.
            </p>
          </div>

          <TarifCards tarife={tarifCopii} />

          <CtaBanner
            titlu="Gata să începi dansul?"
            text="Alege un abonament și înscrie-te astăzi sau contactează-ne pentru detalii suplimentare."
          />
        </div>
      </div>
    </>
  )
}
