'use client'

import { usePublicData } from '@/components/public-data-provider'

type Tarif = {
  id: string
  titlu: string
  descriere: string
  pret: number
  moneda: string
  beneficii: string[]
  popular: boolean
  ordine: number
}

const FALLBACK: Tarif[] = [
  { id: 'c1', titlu: 'Abonament 4', descriere: 'Valabil 4 săptămâni (4 ședințe)', pret: 110, moneda: 'Lei', beneficii: [], popular: false, ordine: 1 },
  { id: 'c2', titlu: 'Abonament 8', descriere: 'Valabil 4 săptămâni (8 ședințe)', pret: 200, moneda: 'Lei', beneficii: [], popular: false, ordine: 2 },
  { id: 'c3', titlu: 'Abonament 12', descriere: 'Valabil 4 săptămâni (12 ședințe)', pret: 250, moneda: 'Lei', beneficii: [], popular: false, ordine: 3 },
  { id: 'c4', titlu: 'Plata la ședință', descriere: 'Ședință de grup', pret: 35, moneda: 'Lei', beneficii: [], popular: false, ordine: 4 },
]

export default function TarifeCopiiSection() {
  const { tarife: dinServer } = usePublicData()
  const tarife: Tarif[] = dinServer?.copii.length ? dinServer.copii : FALLBACK

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
      {tarife.map((tarif) => (
        <div
          key={tarif.id}
          className="bg-white border-2 border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <h3 className="font-bold text-gray-900 mb-1">{tarif.titlu}</h3>
          {tarif.descriere && (
            <p className="text-gray-500 text-sm mb-4">{tarif.descriere}</p>
          )}
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-4xl font-extrabold text-gray-900 ">{tarif.pret}</span>
            <span className="text-base font-medium text-gray-500 ">{tarif.moneda}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
