'use client'

import { usePublicData } from '@/components/public-data-provider'

export default function GrupeCountBadge() {
  const count = usePublicData().grupe?.length

  if (!count) return null
  return (
    <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white">
      <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
      {count}
    </span>
  )
}
