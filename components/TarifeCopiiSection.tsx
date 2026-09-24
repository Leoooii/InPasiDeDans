'use client'

import { TarifTile, useTarife } from '@/components/tarif-card'

export default function TarifeCopiiSection() {
  const tarife = useTarife('copii')

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
      {tarife.map((tarif) => (
        <TarifTile key={tarif.id} tarif={tarif} />
      ))}
    </div>
  )
}
