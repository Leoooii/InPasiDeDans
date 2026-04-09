'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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
  const [tarife, setTarife] = useState<Tarif[]>(FALLBACK)

  useEffect(() => {
    const fetchTarife = async () => {
      try {
        const q = query(collection(db, 'tarife'), where('categorie', '==', 'copii'))
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

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
      {tarife.map((tarif) => (
        <div
          key={tarif.id}
          className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tarif.titlu}</h3>
          {tarif.descriere && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{tarif.descriere}</p>
          )}
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{tarif.pret}</span>
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">{tarif.moneda}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
