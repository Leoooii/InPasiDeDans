'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function GrupeCountBadge() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    getDocs(query(collection(db, 'grupe'), where('publica', '==', true)))
      .then(snap => setCount(snap.size))
      .catch(() => setCount(null))
  }, [])

  if (!count) return null

  return (
    <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white">
      <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
      {count}
    </span>
  )
}
