'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'

export default function StudioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verifică dacă utilizatorul este autentificat
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Utilizator autentificat - permite accesul
        setIsAuthenticated(true)
        setLoading(false)
      } else {
        // Utilizator neautentificat - redirect către login
        router.push('/admin/login?redirect=/admin/studio')
      }
    })

    return () => unsubscribe()
  }, [router])

  // Ecran de loading în timpul verificării
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificare autentificare...</p>
        </div>
      </div>
    )
  }

  // Dacă utilizatorul este autentificat, afișează Sanity Studio cu buton înapoi
  if (isAuthenticated) {
    return (
      <div className="relative h-screen">
        {/* Buton înapoi la Admin - fixed position */}
        <div className="absolute top-4 right-4 z-50">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
          >
            ← Înapoi la Admin
          </Link>
        </div>
        
        {/* Sanity Studio */}
        <NextStudio config={config} />
      </div>
    )
  }

  // Fallback - nu ar trebui să ajungă aici
  return null
}

