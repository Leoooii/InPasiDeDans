'use client'

import { TarifCard, TarifTile, useTarife } from '@/components/tarif-card'

export default function DansulMirilorPricing() {
  const tarife = useTarife('privat')

  const pachete = tarife.filter((t) => t.ordine <= 3)
  const alteOptiuni = tarife.filter((t) => t.ordine >= 4)

  return (
    <>
      {/* Pachetele noastre */}
      <div className="mt-12">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Pachetele noastre</h2>
          <p className="text-slate-500 ">Alegeți pachetul potrivit pentru voi</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pachete.map((tarif) => (
            <TarifCard key={tarif.id} tarif={tarif} varianta="alb" />
          ))}
        </div>
      </div>

      {/* Alte opțiuni */}
      {alteOptiuni.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-5 mt-12">Alte opțiuni</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {alteOptiuni.map((tarif) => (
              <TarifTile key={tarif.id} tarif={tarif} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
