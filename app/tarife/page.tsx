'use client'

import Head from 'next/head';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import PricingSection from '@/components/PricingSection';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Tarif = {
  id: string
  titlu: string
  descriere: string
  pret: number
  moneda: string
  categorie: 'grup' | 'privat' | 'copii'
  beneficii: string[]
  popular: boolean
  ordine: number
}

const FALLBACK_PRIVAT: Tarif[] = [
  { id: 'p1', titlu: 'Pachet 4 ședințe', descriere: '', pret: 640, moneda: 'Lei', categorie: 'privat', beneficii: ['4 ședințe private', 'Instructor dedicat'], popular: false, ordine: 1 },
  { id: 'p2', titlu: 'Pachet 6 ședințe', descriere: '', pret: 900, moneda: 'Lei', categorie: 'privat', beneficii: ['6 ședințe private', 'Instructor dedicat'], popular: false, ordine: 2 },
  { id: 'p3', titlu: 'Pachet 8 ședințe', descriere: '', pret: 1120, moneda: 'Lei', categorie: 'privat', beneficii: ['8 ședințe private', 'Instructor dedicat'], popular: false, ordine: 3 },
  { id: 'p4', titlu: 'Plata la ședință', descriere: '', pret: 180, moneda: 'Lei', categorie: 'privat', beneficii: ['O ședință privată', 'Instructor dedicat'], popular: false, ordine: 4 },
]

const FALLBACK_COPII: Tarif[] = [
  { id: 'c1', titlu: 'Abonament 4', descriere: 'Valabil o lună (4 ședințe)', pret: 110, moneda: 'Lei', categorie: 'copii', beneficii: ['4 ședințe pe lună', 'O ședință pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 1 },
  { id: 'c2', titlu: 'Abonament 8', descriere: 'Valabil o lună (8 ședințe)', pret: 200, moneda: 'Lei', categorie: 'copii', beneficii: ['8 ședințe pe lună', '2 ședințe pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 2 },
  { id: 'c3', titlu: 'Abonament 12', descriere: 'Valabil o lună (12 ședințe)', pret: 250, moneda: 'Lei', categorie: 'copii', beneficii: ['12 ședințe pe lună', '3 ședințe pe săptămână', 'Acces la grupe pentru copii'], popular: false, ordine: 3 },
  { id: 'c4', titlu: 'Plata la ședință', descriere: 'Ședință de grup', pret: 35, moneda: 'Lei', categorie: 'copii', beneficii: ['O ședință la grup', 'Acces la grupe pentru copii'], popular: false, ordine: 4 },
]

function TarifCards({ tarife }: { tarife: Tarif[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
      {tarife.map((tarif) => (
        <Card key={tarif.id} className="flex flex-col border-red-600 shadow-lg">
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
                  <Check className="mr-2 h-4 w-4 text-green-500" aria-label="Inclus" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Tarife() {
  const [tarifPrivat, setTarifPrivat] = useState<Tarif[]>(FALLBACK_PRIVAT)
  const [tarifCopii, setTarifCopii] = useState<Tarif[]>(FALLBACK_COPII)

  useEffect(() => {
    const fetch = async (categorie: 'privat' | 'copii', setter: (t: Tarif[]) => void, fallback: Tarif[]) => {
      try {
        const q = query(collection(db, 'tarife'), where('categorie', '==', categorie))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          const data = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() } as Tarif))
            .sort((a, b) => a.ordine - b.ordine)
          setter(data)
        }
      } catch {
        setter(fallback)
      }
    }
    fetch('privat', setTarifPrivat, FALLBACK_PRIVAT)
    fetch('copii', setTarifCopii, FALLBACK_COPII)
  }, [])

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Tarife' },
  ]

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Cursuri de Dans - Tarife',
              description:
                'Tarife pentru cursurile de dans pentru adulti, copii si lectii private la In Pasi de Dans, Bucuresti, Sector 5.',
              url: 'https://inpasidedans.ro/tarife',
              brand: { '@type': 'Brand', name: 'In Pasi de Dans' },
              offers: [
                { '@type': 'Offer', name: 'Abonament 8', price: '250', priceCurrency: 'RON', availability: 'https://schema.org/InStock', url: 'https://inpasidedans.ro/tarife' },
                { '@type': 'Offer', name: 'Abonament 16', price: '350', priceCurrency: 'RON', availability: 'https://schema.org/InStock', url: 'https://inpasidedans.ro/tarife' },
                { '@type': 'Offer', name: 'Abonament Full Pass', price: '420', priceCurrency: 'RON', availability: 'https://schema.org/InStock', url: 'https://inpasidedans.ro/tarife' },
                { '@type': 'Offer', name: 'Abonament Copii 4 ședințe', price: '110', priceCurrency: 'RON', availability: 'https://schema.org/InStock', url: 'https://inpasidedans.ro/tarife' },
              ],
              location: {
                '@type': 'Place',
                name: 'In Pasi de Dans',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Calea Rahovei 262',
                  addressLocality: 'Bucuresti',
                  addressRegion: 'Sector 5',
                  postalCode: '050897',
                  addressCountry: 'RO',
                },
              },
            }),
          }}
        />
      </Head>
      <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/tarife" />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Tarife cursuri de dans din Bucuresti
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Alege abonamentul potrivit pentru cursurile de dans pentru adulți
              la In Pasi de Dans, Bucuresti.
            </p>
          </div>
          <PricingSection />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife lecții private
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Personalizează-ți experiența cu lecțiile private de dans.
            </p>
          </div>

          <TarifCards tarife={tarifPrivat} />

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife cursuri copii
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Tarife accesibile pentru cursurile de dans dedicate copiilor.
            </p>
          </div>

          <TarifCards tarife={tarifCopii} />

          <div className="mt-12 bg-red-50 p-4 sm:p-6 md:p-8 rounded-lg">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold dark:text-black">
                Gata să începi dansul?
              </h2>
              <p className="text-sm sm:text-base dark:text-black px-2">
                Alege un abonament și înscrie-te astăzi sau contactează-ne
                pentru detalii suplimentare.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
                <Link href="/inscriere" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                  >
                    Înscrie-te acum
                  </Button>
                </Link>
                <Link href="/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Contactează-ne
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <GrupeInFormare />
      </div>
    </>
  )
}
