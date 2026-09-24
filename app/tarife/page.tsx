'use client'

import CtaBanner from '@/components/cta-banner';
import type { Tarif } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import PricingSection from '@/components/PricingSection';
import { usePublicData } from '@/components/public-data-provider';


const FALLBACK_PRIVAT: Tarif[] = [
  { id: 'p1', titlu: 'Pachet 4 ședințe', descriere: '', pret: 680, moneda: 'Lei', categorie: 'privat', beneficii: ['4 ședințe private', 'Valabilitate 2 luni', 'Instructor dedicat'], popular: false, ordine: 1 },
  { id: 'p2', titlu: 'Pachet 6 ședințe', descriere: '', pret: 960, moneda: 'Lei', categorie: 'privat', beneficii: ['6 ședințe private', 'Valabilitate 3 luni', 'Instructor dedicat'], popular: false, ordine: 2 },
  { id: 'p3', titlu: 'Pachet 8 ședințe', descriere: '', pret: 1200, moneda: 'Lei', categorie: 'privat', beneficii: ['8 ședințe private', 'Valabilitate 4 luni', 'Instructor dedicat'], popular: false, ordine: 3 },
  { id: 'p4', titlu: 'Plata la ședință', descriere: '', pret: 200, moneda: 'Lei', categorie: 'privat', beneficii: ['O ședință privată', 'Instructor dedicat'], popular: false, ordine: 4 },
  { id: 'p5', titlu: 'Ședință la restaurant', descriere: 'La cerere, dacă instructorul are disponibilitate și restaurantul este în București.', pret: 300, moneda: 'Lei', categorie: 'privat', beneficii: [], popular: false, ordine: 5 },
]

const FALLBACK_COPII: Tarif[] = [
  { id: 'c1', titlu: 'Abonament 4', descriere: 'Valabil o lună (4 ședințe)', pret: 110, moneda: 'Lei', categorie: 'copii', beneficii: ['4 ședințe pe lună', 'O ședință pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 1 },
  { id: 'c2', titlu: 'Abonament 8', descriere: 'Valabil o lună (8 ședințe)', pret: 200, moneda: 'Lei', categorie: 'copii', beneficii: ['8 ședințe pe lună', '2 ședințe pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 2 },
  { id: 'c3', titlu: 'Abonament 12', descriere: 'Valabil o lună (12 ședințe)', pret: 250, moneda: 'Lei', categorie: 'copii', beneficii: ['12 ședințe pe lună', '3 ședințe pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 3 },
  { id: 'c4', titlu: 'Plata la ședință', descriere: 'Ședință de grup', pret: 35, moneda: 'Lei', categorie: 'copii', beneficii: ['O ședință la grup', 'Acces la grupe pentru copii'], popular: false, ordine: 4 },
]

function TarifCards({ tarife }: { tarife: Tarif[] }) {
  const cuBeneficii = tarife.filter((t) => t.beneficii.length > 0)
  const doarPret = tarife.filter((t) => t.beneficii.length === 0)

  return (
    <div className="mt-8 space-y-6">
      {cuBeneficii.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cuBeneficii.map((tarif) => (
            <Card key={tarif.id} className="flex flex-col border-red-600 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>{tarif.titlu}</CardTitle>
                {tarif.descriere && (
                  <CardDescription className="text-white/90">{tarif.descriere}</CardDescription>
                )}
                <div className="mt-4 text-4xl font-bold">{tarif.pret} {tarif.moneda}</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  {tarif.beneficii.map((b, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-orange-500" aria-label="Inclus" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tarifele doar cu preț — benzi orizontale compacte */}
      {doarPret.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {doarPret.map((tarif) => (
            <div
              key={tarif.id}
              className="rounded-lg border border-red-600 shadow-lg bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-5 flex items-center justify-between gap-6"
            >
              <div className="min-w-0">
                <p className="text-lg font-semibold">{tarif.titlu}</p>
                {tarif.descriere && (
                  <p className="text-sm text-white/90 mt-0.5">{tarif.descriere}</p>
                )}
              </div>
              <div className="text-3xl font-bold shrink-0">{tarif.pret} {tarif.moneda}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Tarife() {
  const { tarife } = usePublicData()
  const tarifPrivat: Tarif[] = tarife?.privat.length ? tarife.privat : FALLBACK_PRIVAT
  const tarifCopii: Tarif[] = tarife?.copii.length ? tarife.copii : FALLBACK_COPII

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
        <GrupeInFormare />
      </div>
    </>
  )
}
