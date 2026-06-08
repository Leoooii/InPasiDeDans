'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

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
  { id: 'p1', titlu: 'Pachet 4 ședințe', descriere: 'Ideal pentru cuplurile care doresc un dans simplu și elegant.', pret: 640, moneda: 'Lei', beneficii: ['4 ședințe private (60 min/sed)', 'Coregrafie simplă pe melodia aleasă', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei', 'Pachetul poate fi prelungit cu oricate ședințe la prețul/ședință din pachetul ales inițial'], popular: false, ordine: 1 },
  { id: 'p2', titlu: 'Pachet 6 ședințe', descriere: 'Pentru cuplurile care doresc un dans memorabil cu elemente speciale.', pret: 900, moneda: 'Lei', beneficii: ['6 ședințe private (60 min/sed)', 'Coregrafie cu grad de dificultate mediu pe melodia aleasă', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei', 'Pachetul poate fi prelungit cu oricate ședințe la prețul/ședință din pachetul ales inițial'], popular: true, ordine: 2 },
  { id: 'p3', titlu: 'Pachet 8 ședințe', descriere: 'Experiența completă pentru un moment cu adevărat spectaculos.', pret: 1120, moneda: 'Lei', beneficii: ['8 ședințe private (60 min/sed)', 'Coregrafie personalizată cu grad de dificultate mediu sau ridicat', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei', 'Pachetul poate fi prelungit cu oricate ședințe la prețul/ședință din pachetul ales inițial'], popular: false, ordine: 3 },
  { id: 'p4', titlu: 'Plata la ședință', descriere: '', pret: 200, moneda: 'Lei', beneficii: [], popular: false, ordine: 4 },
  { id: 'p5', titlu: 'Ședință la restaurant (în București)', descriere: '', pret: 200, moneda: 'Lei', beneficii: [], popular: false, ordine: 5 },
]

export default function DansulMirilorPricing() {
  const [tarife, setTarife] = useState<Tarif[]>(FALLBACK)

  useEffect(() => {
    const fetchTarife = async () => {
      try {
        const q = query(collection(db, 'tarife'), where('categorie', '==', 'privat'))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          const data = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() } as Tarif))
            .sort((a, b) => a.ordine - b.ordine)
          setTarife(data)
        }
      } catch {
        // fallback la datele hardcodate
      }
    }
    fetchTarife()
  }, [])

  const pachete = tarife.filter((t) => t.ordine <= 3)
  const alteOptiuni = tarife.filter((t) => t.ordine >= 4)

  return (
    <>
      {/* Pachetele noastre */}
      <div className="mt-12">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Pachetele noastre</h2>
          <p className="text-gray-500 dark:text-gray-400">Alegeți pachetul potrivit pentru voi</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pachete.map((tarif) => (
            <Card
              key={tarif.id}
              className={`relative overflow-hidden border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 ${
                tarif.popular
                  ? 'border-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20'
                  : 'border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {tarif.popular && (
                <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 text-center text-sm font-semibold tracking-wide">
                  ★ Cel mai popular
                </div>
              )}
              <CardContent className="p-7">
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{tarif.titlu}</h3>
                {tarif.descriere && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{tarif.descriere}</p>
                )}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{tarif.pret}</span>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{tarif.moneda}</span>
                </div>
                {tarif.beneficii.length > 0 && (
                  <ul className="space-y-3">
                    {tarif.beneficii.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alte opțiuni */}
      {alteOptiuni.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-5 mt-12">Alte opțiuni</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {alteOptiuni.map((tarif) => (
              <div
                key={tarif.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tarif.titlu}</h3>
                {tarif.descriere && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{tarif.descriere}</p>
                )}
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{tarif.pret}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">{tarif.moneda}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
